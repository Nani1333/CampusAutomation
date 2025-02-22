import { useState } from 'react';
import { FaLock, FaBell, FaEye, FaEnvelope } from 'react-icons/fa';

function Settings() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    mentorMessages: true,
    projectUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showProgress: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (key) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password change logic here
    console.log('Password change submitted:', passwordForm);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

        {/* Privacy & Security Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FaLock className="text-gray-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Visibility Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.showEmail}
                    onChange={() => handlePrivacyChange('showEmail')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show email to other students</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={privacySettings.showProgress}
                    onChange={() => handlePrivacyChange('showProgress')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show project progress</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FaBell className="text-gray-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-500" />
                <span>Email Notifications</span>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={notificationPreferences.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationPreferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}></label>
              </div>
            </label>

            <label className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBell className="text-gray-500" />
                <span>Push Notifications</span>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={notificationPreferences.pushNotifications}
                  onChange={() => handleNotificationChange('pushNotifications')}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationPreferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}></label>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
