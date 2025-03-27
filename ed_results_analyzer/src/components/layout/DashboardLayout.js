import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHeartbeat,
  FaTachometerAlt,
  FaUserMd,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBell
} from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setNotificationsOpen(false);
  };

  const handleLogout = () => {
    logout();
    // Redirect will be handled by the auth context
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-50 w-64 bg-blue-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 bg-blue-900">
          <div className="flex items-center">
            <FaHeartbeat className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">ED Results</span>
          </div>
          <button
            className="md:hidden text-white hover:text-gray-200"
            onClick={toggleSidebar}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <Link to="/dashboard" className="sidebar-link-active">
              <FaTachometerAlt className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/profile" className="sidebar-link">
              <FaUserMd className="mr-3 h-5 w-5" />
              Profile
            </Link>
            {isAdmin && (
              <Link to="/settings" className="sidebar-link">
                <FaCog className="mr-3 h-5 w-5" />
                Settings
              </Link>
            )}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="flex-shrink-0 flex border-t border-blue-700 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-gray-200 w-full"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={toggleSidebar}
          >
            <FaBars className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">ED Results Analyzer</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications dropdown */}
              <div className="ml-3 relative">
                <button
                  className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
                  onClick={toggleNotifications}
                >
                  <FaBell className="h-6 w-6" />
                </button>
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 divide-y divide-gray-200">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">Notifications</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-700">No new notifications</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="ml-3 relative">
                <button
                  className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                  onClick={toggleUserMenu}
                >
                  <FaUserCircle className="h-8 w-8 text-gray-600" />
                </button>
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 divide-y divide-gray-200">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'User'}</p>
                        <p className="text-sm text-gray-600">{currentUser?.email || ''}</p>
                      </div>
                      <div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggleUserMenu}
                        >
                          Your Profile
                        </Link>
                        <button
                          onClick={() => {
                            toggleUserMenu();
                            handleLogout();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 