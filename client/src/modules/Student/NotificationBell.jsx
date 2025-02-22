import React, { useState } from 'react';
import { Bell } from 'react-feather';

const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggle();
    }
  };

  return (
    <div className="relative">
      <div
        className="relative cursor-pointer"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {unreadCount}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications</p>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read
                        ? 'bg-gray-50'
                        : 'bg-red-50 border-l-4 border-red-500'
                    }`}
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <span className="text-xs text-gray-500">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default NotificationBell; 