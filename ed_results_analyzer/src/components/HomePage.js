import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChartLine, FaMobileAlt, FaShieldAlt, FaUserMd, FaHospital } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                AI-Powered ED Patient Results Management
              </h1>
              <p className="mt-6 text-xl text-white">
                Automatically analyze lab and imaging results for discharged ED patients, 
                ensuring timely follow-up and improved patient outcomes.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/demo" className="btn-secondary">
                  Request Demo
                </Link>
                <Link to="/features" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://via.placeholder.com/600x400?text=ED+Results+Analyzer" 
                alt="ED Results Analyzer Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">
              Revolutionizing ED Follow-up Care
            </h2>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
              Our AI-powered system automates the analysis of pending results for discharged ED patients, 
              ensuring critical findings are never missed.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center">
                <FaRobot className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">AI-Powered Analysis</h3>
              <p className="mt-2 text-gray-700">
                Advanced algorithms analyze lab and imaging results to identify abnormal findings requiring follow-up.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <FaMobileAlt className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Automated Patient Messaging</h3>
              <p className="mt-2 text-gray-700">
                Secure, HIPAA-compliant messaging system to notify patients of results and necessary follow-up actions.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <FaChartLine className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Real-time Analytics</h3>
              <p className="mt-2 text-gray-700">
                Comprehensive dashboards to track follow-up rates, patient outcomes, and system performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">
              Benefits for Healthcare Providers
            </h2>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
              Our solution helps emergency departments improve patient care while reducing workload on clinical staff.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaUserMd className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Reduced Physician Workload</h3>
                <p className="mt-2 text-gray-700">
                  Automate the time-consuming process of reviewing pending results, allowing physicians to focus on direct patient care.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaShieldAlt className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Improved Patient Safety</h3>
                <p className="mt-2 text-gray-700">
                  Ensure critical findings are never missed with AI-powered analysis and automated follow-up protocols.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaHospital className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Regulatory Compliance</h3>
                <p className="mt-2 text-gray-700">
                  Meet and exceed regulatory requirements for patient follow-up with comprehensive documentation and audit trails.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaChartLine className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Cost Reduction</h3>
                <p className="mt-2 text-gray-700">
                  Reduce costs associated with manual follow-up processes and potential liability from missed critical results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-display">
            Ready to transform your ED follow-up process?
          </h2>
          <p className="mt-4 text-xl text-white max-w-3xl mx-auto">
            Join leading healthcare institutions that have improved patient outcomes and reduced physician workload with our AI-powered solution.
          </p>
          <div className="mt-10">
            <Link to="/contact" className="btn-secondary">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 