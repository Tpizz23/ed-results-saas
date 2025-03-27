import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <FaHeartbeat className="h-8 w-8 text-primary-light" />
              <span className="ml-2 text-xl font-bold text-white font-display">ED Results Analyzer</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              AI-powered solution for analyzing and managing ED patient results, ensuring timely follow-up and improved patient care.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-300 hover:text-white">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-300 hover:text-white">Blog</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/features" className="text-base text-gray-300 hover:text-white">Features</Link>
              </li>
              <li>
                <Link to="/demo" className="text-base text-gray-300 hover:text-white">Demo</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-300 hover:text-white">Pricing</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-base text-gray-300 hover:text-white">Case Studies</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-300 hover:text-white">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-300 hover:text-white">Terms</Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-base text-gray-300 hover:text-white">HIPAA Compliance</Link>
              </li>
              <li>
                <Link to="/security" className="text-base text-gray-300 hover:text-white">Security</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ED Results Analyzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 