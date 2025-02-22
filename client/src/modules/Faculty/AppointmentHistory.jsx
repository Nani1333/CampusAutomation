import React, { useState } from 'react';
import { Calendar, Clock, Download } from 'react-feather';
import useFacultyStore from '../../store/facultyStore';

const AppointmentHistory = () => {
  const [view, setView] = useState('upcoming'); // 'upcoming' or 'past'
  const { currentFaculty } = useFacultyStore();
  
  // Ensure appointments exist with a default empty array
  const appointments = currentFaculty?.appointments || [];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReport = () => {
    // Implementation for downloading appointment history report
    console.log('Downloading report...');
  };

  const filteredAppointments = appointments.filter(appointment => {
    const isUpcoming = new Date(appointment.date) > new Date();
    return view === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Appointment History</h2>
        <button
          onClick={downloadReport}
          className="flex items-center text-gray-600 hover:text-gray-900"
          aria-label="Download report"
        >
          <Download className="w-4 h-4 mr-1" />
          <span className="text-sm">Export</span>
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setView('upcoming')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            view === 'upcoming'
              ? 'bg-red-100 text-red-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setView('past')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            view === 'past'
              ? 'bg-red-100 text-red-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Past
        </button>
      </div>

      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  {appointment.student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {appointment.student.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(appointment.date)}
                    <Clock className="w-4 h-4 ml-2 mr-1" />
                    {formatTime(appointment.date)}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                appointment.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : appointment.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {appointment.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No {view} appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory; 