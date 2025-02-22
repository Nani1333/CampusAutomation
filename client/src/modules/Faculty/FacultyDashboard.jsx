import React from 'react';
import { FaUsers, FaClipboardList, FaCalendarAlt, FaBell } from 'react-icons/fa';

function FacultyDashboard() {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, [Faculty Name]</h1>
      <div className="flex items-center mb-6">
        <img src="/path/to/profile.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <p className="text-lg">Your quick links:</p>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Answer Queries</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Schedule Meeting</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
          <FaClipboardList className="text-indigo-600 text-3xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Total Student Queries</h2>
            <p className="text-lg">Pending: 5 | Resolved: 20</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
          <FaCalendarAlt className="text-green-600 text-3xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
            <p className="text-lg">3 scheduled meetings</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
          <FaUsers className="text-blue-600 text-3xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Engagement Analytics</h2>
            <p className="text-lg">Most Active Students: John, Sarah</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
          <FaBell className="text-red-600 text-3xl mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-lg">2 new notifications</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Recent Student Activities</h2>
        <ul className="list-disc pl-5">
          <li>John Smith asked a question about project deadlines.</li>
          <li>Sarah Lee requested additional resources for her research.</li>
          <li>Upcoming deadline for project submissions: 2 days left.</li>
        </ul>
      </div>
    </div>
  );
}

export default FacultyDashboard;
