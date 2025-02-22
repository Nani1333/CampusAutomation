import React from 'react';
import { Search } from 'react-feather';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder, className }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        aria-label="Search faculty"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar; 
