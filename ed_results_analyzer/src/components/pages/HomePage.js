import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUserMd, FaHospital, FaLock } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-primary-700 text-white">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                AI-Powered ED Patient Results Management
              </h1>
              <p className="text-xl mb-8">
                Automatically analyze lab and imaging results for discharged ED patients, ensuring timely follow-up and improved patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/demo" className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg inline-flex items-center justify-center">
                  Request Demo
                </Link>
                <Link to="/learn" className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-bold py-3 px-6 rounded-lg text-lg inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center pl-8">
              <img
                src="/images/doctor-patient.png"
                alt="Doctor reviewing results with patient"
                className="rounded-lg shadow-2xl w-full h-auto max-h-[500px] object-contain"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaChartLine className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Automatically identify abnormal results requiring follow-up
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaUserMd className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streamlined Workflow</h3>
              <p className="text-gray-600">
                Reduce administrative burden with automated patient tracking
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaHospital className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">EHR Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect with major healthcare systems
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <FaLock className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Enterprise-grade security with full compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to improve patient follow-up?</h2>
          <p className="text-xl mb-8">
            Join leading emergency departments in providing better care with ED Results Analyzer
          </p>
          <Link to="/contact" className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg">
            Request a Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">ED Results Analyzer</h3>
              <p className="text-gray-400 max-w-md">
                A comprehensive solution for emergency departments to manage patient follow-up and improve outcomes.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                  <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                  <li><Link to="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                  <li><Link to="/hipaa" className="text-gray-400 hover:text-white">HIPAA Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ED Results Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 