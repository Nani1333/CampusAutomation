import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultyCard from './FacultyCard';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import NotificationBell from './NotificationBell';
import { toast } from 'react-hot-toast';
import useAppointmentStore from '../../store/appointmentStore';

const Appointments = () => {
  const navigate = useNavigate();
  const {
    faculty,
    notifications,
    loading,
    searchTerm,
    filter,
    wsConnection,
    setSearchTerm,
    setFilter,
    setWsConnection,
    addNotification,
    markNotificationAsRead,
    updateFacultyStatus,
    updateQueueLength,
    getFilteredFaculty
  } = useAppointmentStore();

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3000');
    setWsConnection(socket);
    window.socket = socket;

    socket.onopen = () => {
      // Register as student
      socket.send(JSON.stringify({
        type: 'REGISTER_CLIENT',
        role: 'student',
        id: 'STUDENT_ID' // Replace with actual student ID
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'FACULTY_STATUS_UPDATE':
        updateFacultyStatus(data.facultyId, data.newStatus);
        break;

      case 'FACULTY_AVAILABLE':
        toast.success(data.message);
        addNotification({
          type: 'status',
          message: data.message,
          timestamp: data.timestamp
        });
        break;
    }
  };

  const handleFacultySelect = (facultyId) => {
    navigate(`/faculty/${facultyId}`);
  };

  const filteredFaculty = getFilteredFaculty();

  // Utility function for ordinal numbers
  const getOrdinalSuffix = (number) => {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-red-600">Faculty Appointments</h1>
        <NotificationBell 
          notifications={notifications} 
          onNotificationRead={markNotificationAsRead}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          placeholder="Search by name or department..."
          className="flex-1"
        />
        <FilterDropdown 
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All Faculty' },
            { value: 'available', label: 'Available Now' },
            { value: 'busy', label: 'Busy' }
          ]}
        />
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No faculty members found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map(facultyMember => (
            <FacultyCard
              key={facultyMember.id}
              facultyMember={facultyMember}
              onSelect={() => handleFacultySelect(facultyMember.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
