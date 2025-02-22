import React, { useState } from 'react';
import { FaUpload, FaSearch } from 'react-icons/fa';

function FacultyProjectResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);

  const handleUpload = (event) => {
    // Handle file upload logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Project Resources</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search resources..."
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center ml-2">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Upload New Resource</h2>
        <input type="file" onChange={handleUpload} className="border border-gray-300 rounded-lg p-2" />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center mt-2">
          <FaUpload className="mr-2" /> Upload
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Resource Library</h2>
      <ul className="list-disc pl-5">
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <li key={index} className="mb-2">{resource.name}</li>
          ))
        ) : (
          <li>No resources available.</li>
        )}
      </ul>
    </div>
  );
}

export default FacultyProjectResources;
