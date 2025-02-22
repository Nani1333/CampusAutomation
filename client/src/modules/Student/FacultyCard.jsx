import React from 'react';
import { Clock, Users, Calendar } from 'react-feather';

const FacultyCard = ({ facultyMember, onSelect }) => {
  const {
    id,
    name,
    imageUrl,
    designation,
    department,
    availability,
    queueLength,
    nextAvailableSlot,
    cabinNumber,
  } = facultyMember;

  const handleCardClick = () => {
    onSelect(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(id);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${name}'s profile`}
    >
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{designation}</p>
          <p className="text-sm text-gray-500">{department}</p>
          <p className="text-sm text-gray-500">Cabin: {cabinNumber}</p>
        </div>
      </div>
      <div className="mt-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            availability === 'available'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {availability.charAt(0).toUpperCase() + availability.slice(1)}
        </span>
      </div>
    </div>
  );
};

const calculateWaitTime = (queueLength) => {
  // Average time per student (in minutes)
  const avgTimePerStudent = 15;
  return queueLength * avgTimePerStudent;
};

const formatNextSlot = (dateTime) => {
  if (!dateTime) return 'Not available';
  return new Date(dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default FacultyCard; 