import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHeartbeat, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <FaHeartbeat className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800 font-display">ED Results Analyzer</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
              <Link to="/features" className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </Link>
              <Link to="/demo" className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Demo
              </Link>
              <Link to="/contact" className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated() ? (
              <Link to="/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn-primary flex items-center">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/features" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium" onClick={toggleMenu}>
              Features
            </Link>
            <Link to="/demo" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium" onClick={toggleMenu}>
              Demo
            </Link>
            <Link to="/contact" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium" onClick={toggleMenu}>
              Contact
            </Link>
            <div className="mt-4 pl-3 pr-4">
              {isAuthenticated() ? (
                <Link to="/dashboard" className="btn-primary w-full block text-center" onClick={toggleMenu}>
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn-primary w-full flex items-center justify-center" onClick={toggleMenu}>
                  <FaSignInAlt className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 