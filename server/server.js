import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import facultyRoutes from './routes/faculty.js';
import studentRoutes from './routes/student.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Store connected clients
const clients = new Map();
const studentRequests = new Map(); // Store student requests by faculty ID

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch (data.type) {
      case 'REGISTER_CLIENT':
        // Register client with their role and ID
        clients.set(ws, {
          role: data.role,
          id: data.id,
          facultyId: data.facultyId // for students waiting for faculty
        });
        break;

      case 'FACULTY_STATUS_UPDATE':
        handleFacultyStatusUpdate(ws, data);
        break;

      case 'REQUEST_APPOINTMENT':
        handleAppointmentRequest(ws, data);
        break;
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// WebSocket handlers
function handleFacultyStatusUpdate(ws, data) {
  const { facultyId, newStatus, facultyName } = data;

  // If faculty becomes available, notify waiting students
  if (newStatus === 'available') {
    const waitingStudents = Array.from(clients.entries())
      .filter(([_, client]) => 
        client.role === 'student' && 
        client.facultyId === facultyId
      );

    waitingStudents.forEach(([studentWs]) => {
      studentWs.send(JSON.stringify({
        type: 'FACULTY_AVAILABLE',
        facultyId,
        facultyName,
        message: `${facultyName} is now available for appointments!`,
        timestamp: new Date().toISOString()
      }));
    });
  }

  // Broadcast status update to all connected clients
  broadcastToAll({
    type: 'FACULTY_STATUS_UPDATE',
    facultyId,
    facultyName,
    newStatus,
    timestamp: new Date().toISOString()
  });
}

function handleAppointmentRequest(ws, data) {
  const { studentId, facultyId } = data;
  
  // Store student request
  if (!studentRequests.has(facultyId)) {
    studentRequests.set(facultyId, new Set());
  }
  studentRequests.get(facultyId).add(studentId);

  // Update client mapping with faculty ID
  const clientInfo = clients.get(ws);
  clients.set(ws, { ...clientInfo, facultyId });
}

function broadcastToAll(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Faculty availability endpoint
app.post('/api/faculty/availability', async (req, res) => {
  const { facultyId, newStatus } = req.body;
  
  try {
    // Update faculty availability in database
    const faculty = await Faculty.findByIdAndUpdate(
      facultyId,
      { availability: newStatus },
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ 
        success: false, 
        error: 'Faculty not found' 
      });
    }

    res.json({ 
      success: true, 
      faculty 
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update availability' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close();
    console.log('Server shutdown complete');
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => {
    mongoose.connection.close();
    process.exit(1);
  });
});