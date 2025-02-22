import React, { useState } from 'react';
import { 
  FaSearch, FaPlus, FaBell, FaComment, FaCalendarPlus, 
  FaHistory, FaFilter, FaMoon, FaSun 
} from 'react-icons/fa';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      facultyName: "Dr. Sarah Wilson",
      subject: "Project Review",
      date: "2024-03-15",
      time: "10:30 AM",
      status: "confirmed",
      avatar: "/avatars/faculty/sarah.jpg"
    },
    {
      id: 2,
      facultyName: "Prof. James Miller",
      subject: "Thesis Discussion",
      date: "2024-03-17",
      time: "02:00 PM",
      status: "pending",
      avatar: "/avatars/faculty/james.jpg"
    }
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: "Question about Neural Networks",
      preview: "I'm having trouble understanding backpropagation...",
      faculty: "Dr. Sarah Wilson",
      responses: 3,
      timestamp: "2 hours ago",
      isAnswered: true
    },
    {
      id: 2,
      title: "Project Timeline Clarification",
      preview: "Regarding the submission deadline...",
      faculty: "Prof. James Miller",
      responses: 1,
      timestamp: "1 day ago",
      isAnswered: false
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleQuestionModal = () => {
    setIsQuestionModalOpen(!isQuestionModalOpen);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-3xl font-bold">Welcome back, Diane! 👋</h1>
              <p className="mt-2 text-indigo-100">Ready to connect with your faculty today?</p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                  <p className="text-sm text-indigo-200">Upcoming Meetings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{recentDiscussions.length}</p>
                  <p className="text-sm text-indigo-200">Active Discussions</p>
                </div>
              </div>
            </div>
            <img src="/images/interaction.svg" alt="" className="h-32 hidden md:block" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold dark:text-white">Upcoming Appointments</h2>
                <button
                  onClick={() => {}}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700
                    dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-label="Book new appointment"
                >
                  <FaCalendarPlus />
                  <span>Book New</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg
                      bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={appointment.avatar}
                        alt={appointment.facultyName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium dark:text-white">{appointment.facultyName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium dark:text-white">{appointment.time}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleQuestionModal}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg
                    bg-indigo-50 text-indigo-600 hover:bg-indigo-100
                    dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
                  aria-label="Ask a question"
                >
                  <FaComment />
                  <span>Ask a Question</span>
                </button>
                
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg
                    bg-purple-50 text-purple-600 hover:bg-purple-100
                    dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
                  aria-label="Book appointment"
                >
                  <FaCalendarPlus />
                  <span>Book Appointment</span>
                </button>
                
                <button
                  className="w-full flex items-center space-x-3 p-3 rounded-lg
                    bg-gray-50 text-gray-600 hover:bg-gray-100
                    dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  aria-label="View history"
                >
                  <FaHistory />
                  <span>View History</span>
                </button>
              </div>
            </div>

            {/* Recent Discussions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold dark:text-white">Recent Discussions</h2>
                <button
                  onClick={() => {}}
                  className="text-indigo-600 hover:text-indigo-700
                    dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer
                      hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium dark:text-white">{discussion.title}</h3>
                      {discussion.isAnswered && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100
                          text-green-600 dark:bg-green-900 dark:text-green-300">
                          Answered
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {discussion.preview}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{discussion.faculty}</span>
                      <span>{discussion.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={handleQuestionModal}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full
          shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Quick action"
      >
        <FaPlus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Dashboard;
