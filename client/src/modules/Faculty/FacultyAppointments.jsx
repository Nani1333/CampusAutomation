import React from 'react';
import { toast } from 'react-hot-toast';
import useFacultyStore from '../../store/facultyStore';
import TimeTableUpload from './TimeTableUpload';
import QueueManagement from './QueueManagement';
import AvailabilityToggle from './AvailabilityToggle';
import AppointmentHistory from './AppointmentHistory';
import StudentList from './StudentList';
import Stats from './Stats';

const FacultyAppointments = () => {
  const { currentFaculty, toggleAvailability } = useFacultyStore();

  const handleAvailabilityToggle = () => {
    toggleAvailability();
    toast.success(
      `Status updated to ${currentFaculty.availability === 'available' ? 'busy' : 'available'}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appointments Dashboard</h1>
        <div className="flex items-center space-x-4">
          <AvailabilityToggle 
            isAvailable={currentFaculty.availability === 'available'} 
            onToggle={handleAvailabilityToggle} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TimeTableUpload />
          <QueueManagement 
            queue={currentFaculty.queue || []}
            queueLength={currentFaculty.queueLength}
          />
        </div>
        <div className="space-y-6">
          <Stats faculty={currentFaculty} />
          <AppointmentHistory />
        </div>
      </div>
    </div>
  );
};

export default FacultyAppointments;
