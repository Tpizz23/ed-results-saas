import React, { useState } from 'react';
import { FaCog, FaBell, FaLock, FaUserCog, FaHospital, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    language: 'english',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailDigest: 'daily',
    newPatientAlert: true,
    abnormalResultsAlert: true,
    followUpReminders: true,
    systemUpdates: false
  });
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAttempts: '5'
  });
  
  // Admin settings state (only for admin users)
  const [adminSettings, setAdminSettings] = useState({
    userApproval: true,
    auditLogging: true,
    dataRetention: '90'
  });
  
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAdminChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminSettings({
      ...adminSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const saveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage('Settings saved successfully!');
      
      // In a real app, you would save the settings via an API call
      // saveUserSettings({ general: generalSettings, notifications: notificationSettings, ... })
      //   .then(() => {
      //     setIsSaving(false);
      //     setSuccessMessage('Settings saved successfully!');
      //   })
      //   .catch(error => {
      //     setIsSaving(false);
      //     setErrorMessage('Failed to save settings. Please try again.');
      //   });
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'general' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <FaCog className="mr-2" />
            General
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'notifications' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell className="mr-2" />
            Notifications
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'security' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock className="mr-2" />
            Security
          </button>
          {isAdmin && (
            <button
              className={`px-4 py-3 font-medium flex items-center ${
                activeTab === 'admin' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('admin')}
            >
              <FaUserCog className="mr-2" />
              Admin
            </button>
          )}
        </div>
        
        <form onSubmit={saveSettings} className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaCog className="mr-2 text-primary-600" />
                General Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label" htmlFor="language">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                    className="form-input"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label" htmlFor="timezone">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                    className="form-input"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label" htmlFor="dateFormat">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralChange}
                    className="form-input"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label" htmlFor="timeFormat">
                    Time Format
                  </label>
                  <select
                    id="timeFormat"
                    name="timeFormat"
                    value={generalSettings.timeFormat}
                    onChange={handleGeneralChange}
                    className="form-input"
                  >
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaBell className="mr-2 text-primary-600" />
                Notification Settings
              </h2>
              
              <div className="mb-6">
                <label className="form-label" htmlFor="emailDigest">
                  Email Digest Frequency
                </label>
                <select
                  id="emailDigest"
                  name="emailDigest"
                  value={notificationSettings.emailDigest}
                  onChange={handleNotificationChange}
                  className="form-input"
                >
                  <option value="realtime">Real-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newPatientAlert"
                    name="newPatientAlert"
                    checked={notificationSettings.newPatientAlert}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newPatientAlert" className="ml-2 block text-sm text-gray-700">
                    New patient requiring follow-up alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="abnormalResultsAlert"
                    name="abnormalResultsAlert"
                    checked={notificationSettings.abnormalResultsAlert}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="abnormalResultsAlert" className="ml-2 block text-sm text-gray-700">
                    Abnormal results alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="followUpReminders"
                    name="followUpReminders"
                    checked={notificationSettings.followUpReminders}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="followUpReminders" className="ml-2 block text-sm text-gray-700">
                    Follow-up reminders
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="systemUpdates"
                    name="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-700">
                    System updates and announcements
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaLock className="mr-2 text-primary-600" />
                Security Settings
              </h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>
                
                {securitySettings.twoFactorAuth && (
                  <div className="ml-6 p-4 bg-gray-50 rounded-md mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Two-factor authentication adds an extra layer of security to your account.
                    </p>
                    <button
                      type="button"
                      className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded"
                    >
                      Set Up Two-Factor Authentication
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label" htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </label>
                  <select
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    className="form-input"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label" htmlFor="loginAttempts">
                    Maximum Login Attempts
                  </label>
                  <select
                    id="loginAttempts"
                    name="loginAttempts"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecurityChange}
                    className="form-input"
                  >
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                    <option value="10">10 attempts</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 px-4 rounded"
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
          
          {/* Admin Settings (only for admin users) */}
          {activeTab === 'admin' && isAdmin && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaUserCog className="mr-2 text-primary-600" />
                Admin Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-3 flex items-center">
                    <FaUsers className="mr-2 text-primary-600" />
                    User Management
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="userApproval"
                      name="userApproval"
                      checked={adminSettings.userApproval}
                      onChange={handleAdminChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="userApproval" className="ml-2 block text-sm text-gray-700">
                      Require admin approval for new user accounts
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded"
                  >
                    Manage Users
                  </button>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-3 flex items-center">
                    <FaHospital className="mr-2 text-primary-600" />
                    System Settings
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="auditLogging"
                      name="auditLogging"
                      checked={adminSettings.auditLogging}
                      onChange={handleAdminChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auditLogging" className="ml-2 block text-sm text-gray-700">
                      Enable detailed audit logging
                    </label>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label" htmlFor="dataRetention">
                      Data Retention Period (days)
                    </label>
                    <select
                      id="dataRetention"
                      name="dataRetention"
                      value={adminSettings.dataRetention}
                      onChange={handleAdminChange}
                      className="form-input"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">365 days</option>
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded mr-3"
                  >
                    System Logs
                  </button>
                  
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-3 rounded"
                  >
                    Backup Database
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage; 