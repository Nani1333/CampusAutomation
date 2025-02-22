import React from 'react';
import { ChevronDown } from 'react-feather';

const FilterDropdown = ({ value, onChange, options }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        aria-label="Filter faculty"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};

export default FilterDropdown; 