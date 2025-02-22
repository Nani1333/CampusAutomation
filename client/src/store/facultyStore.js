import { create } from 'zustand';
import axios from 'axios';

// Dummy appointments data
const dummyAppointments = [
  {
    id: 1,
    student: {
      name: 'John Smith',
      id: 'STU001'
    },
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Tomorrow
    status: 'scheduled',
    duration: 30
  },
  {
    id: 2,
    student: {
      name: 'Alice Johnson',
      id: 'STU002'
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    status: 'completed',
    duration: 45
  },
  {
    id: 3,
    student: {
      name: 'Bob Wilson',
      id: 'STU003'
    },
    date: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // Day after tomorrow
    status: 'scheduled',
    duration: 30
  }
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const useFacultyStore = create((set, get) => ({
  // Faculty State
  currentFaculty: {
    id: 3, // Emily Rodriguez's ID
    name: 'Dr. Emily Rodriguez',
    imageUrl: 'https://ui-avatars.com/api/?name=Emily+Rodriguez',
    designation: 'Assistant Professor',
    department: 'Computer Science',
    availability: 'available',
    queueLength: 1,
    nextAvailableSlot: '2:40 PM',
    expertise: ['Software Engineering', 'Web Development'],
    rating: 4.7,
    averageWaitTime: '15 mins',
    todayAppointments: 5,
    popularTimeSlot: '2:00 PM - 4:00 PM',
    queue: [], // Initialize empty queue array
    appointments: dummyAppointments // Add appointments data
  },
  
  // Actions
  toggleAvailability: async () => {
    const { currentFaculty } = get();
    const newStatus = currentFaculty.availability === 'available' ? 'busy' : 'available';
    
    try {
      // Update backend
      const response = await axios.post(`${BACKEND_URL}/api/faculty/availability`, {
        facultyId: currentFaculty.id,
        newStatus,
        queueLength: currentFaculty.queueLength
      });

      if (response.data.success) {
        // Update local state
        set(state => ({
          currentFaculty: {
            ...state.currentFaculty,
            availability: newStatus
          }
        }));

        // Emit WebSocket event
        if (window.socket && window.socket.readyState === WebSocket.OPEN) {
          window.socket.send(JSON.stringify({
            type: 'FACULTY_STATUS_UPDATE',
            facultyId: currentFaculty.id,
            facultyName: currentFaculty.name,
            newStatus,
            queueLength: currentFaculty.queueLength,
            timestamp: new Date().toISOString()
          }));
        }
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      throw new Error('Failed to update availability');
    }
  },

  updateQueueLength: (newLength) => {
    set(state => ({
      currentFaculty: {
        ...state.currentFaculty,
        queueLength: newLength
      }
    }));

    // Send WebSocket message for queue update
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3000');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'QUEUE_UPDATE',
        facultyId: get().currentFaculty.id,
        queueLength: newLength
      }));
    };
  }
}));

export default useFacultyStore; 