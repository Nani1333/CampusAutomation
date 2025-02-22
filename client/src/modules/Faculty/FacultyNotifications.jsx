import { useState } from 'react';
import { 
  FaCheckCircle, FaComments, FaBell, FaUserFriends, 
  FaCalendar, FaExclamationTriangle 
} from 'react-icons/fa';

function FacultyNotifications() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'verification',
      title: 'Discussion Needs Verification',
      message: 'A new discussion post requires your verification in the Algorithms forum.',
      time: '30 minutes ago',
      icon: <FaExclamationTriangle className="text-orange-500" size={20} />,
      read: false
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Student Consultation',
      message: 'Scheduled consultation with John Doe at 2:00 PM today.',
      time: '1 hour ago',
      icon: <FaUserFriends className="text-blue-500" size={20} />,
      read: false
    },
    {
      id: 3,
      type: 'discussion',
      title: 'New Student Responses',
      message: 'Three new student responses in your verified discussion thread.',
      time: '2 hours ago',
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
              className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 
                transition-colors duration-150 ${!notification.read ? 'bg-blue-50' : ''}`}
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

export default FacultyNotifications;
