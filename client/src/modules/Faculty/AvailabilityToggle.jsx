import React from 'react';
import { Sun, Moon } from 'react-feather';

const AvailabilityToggle = ({ isAvailable, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
        isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
      aria-label={isAvailable ? 'Set as unavailable' : 'Set as available'}
    >
      <span className={`mr-2 ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
        {isAvailable ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </span>
      <span className="font-medium">
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </button>
  );
};

export default AvailabilityToggle; 