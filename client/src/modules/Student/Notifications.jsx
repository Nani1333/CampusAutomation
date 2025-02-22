import { useState } from 'react';
import { FaCheckCircle, FaComments, FaBell, FaUserFriends, FaCalendar } from 'react-icons/fa';

function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Project Review Scheduled',
      message: 'Your project review has been scheduled for 3:00 PM tomorrow. Please prepare your presentation.',
      time: '2 hours ago',
      icon: <FaCalendar className="text-green-500" size={20} />,
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Meeting with Mentor',
      message: 'Reminder: You have a meeting with your mentor in 30 minutes.',
      time: '30 minutes ago',
      icon: <FaUserFriends className="text-orange-500" size={20} />,
      read: false
    },
    {
      id: 3,
      title: 'New Discussion Post',
      message: 'Your teammate has posted a new discussion in the project forum.',
      time: '1 hour ago',
      icon: <FaComments className="text-purple-500" size={20} />,
      read: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
        
        <div className="bg-white rounded-lg shadow">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex-shrink-0 mt-1">{notification.icon}</div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h2>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              
              {!notification.read && (
                <div className="ml-4 flex-shrink-0">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
