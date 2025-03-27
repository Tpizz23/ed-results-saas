import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHospital, FaUserMd, FaLock, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load user profile data
  useEffect(() => {
    if (currentUser) {
      // In a real app, you would fetch this from an API
      setProfileData({
        firstName: currentUser.firstName || 'John',
        lastName: currentUser.lastName || 'Doe',
        email: currentUser.email || 'john.doe@hospital.org',
        phone: currentUser.phone || '(555) 123-4567',
        department: currentUser.department || 'Emergency Medicine',
        role: currentUser.role || 'Physician',
        notificationPreferences: currentUser.notificationPreferences || {
          email: true,
          sms: false,
          inApp: true
        }
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setProfileData({
      ...profileData,
      notificationPreferences: {
        ...profileData.notificationPreferences,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      
      // In a real app, you would update the user profile via an API call
      // updateUserProfile(profileData)
      //   .then(() => {
      //     setIsSaving(false);
      //     setIsEditing(false);
      //     setSuccessMessage('Profile updated successfully!');
      //   })
      //   .catch(error => {
      //     setIsSaving(false);
      //     setErrorMessage('Failed to update profile. Please try again.');
      //   });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
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
        <div className="p-6 bg-primary-700 text-white flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <FaUser className="text-primary-700 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-primary-100">{profileData.role}</p>
            </div>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHospital className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserMd className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>
          </div>
          
          <hr className="my-8" />
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaBell className="mr-2 text-primary-600" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  name="email"
                  checked={profileData.notificationPreferences.email}
                  onChange={handleNotificationChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  name="sms"
                  checked={profileData.notificationPreferences.sms}
                  onChange={handleNotificationChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inapp-notifications"
                  name="inApp"
                  checked={profileData.notificationPreferences.inApp}
                  onChange={handleNotificationChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="inapp-notifications" className="ml-2 block text-sm text-gray-700">
                  In-App Notifications
                </label>
              </div>
            </div>
          </div>
          
          <hr className="my-8" />
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaLock className="mr-2 text-primary-600" />
              Security
            </h3>
            <button
              type="button"
              disabled={!isEditing}
              className={`px-4 py-2 rounded font-medium ${
                isEditing 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              Change Password
            </button>
          </div>
          
          {isEditing && (
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
                  'Save Changes'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 