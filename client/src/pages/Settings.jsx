import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 5,
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Settings</h3>
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                    Email Notifications
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="darkMode"
                    name="darkMode"
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
                    Dark Mode
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="autoRefresh"
                    name="autoRefresh"
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoRefresh" className="ml-2 block text-sm text-gray-900">
                    Auto Refresh
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="refreshInterval" className="block text-sm font-medium text-gray-700">
                  Refresh Interval (minutes)
                </label>
                <select
                  id="refreshInterval"
                  name="refreshInterval"
                  value={settings.refreshInterval}
                  onChange={handleSettingChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="1">1 minute</option>
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 