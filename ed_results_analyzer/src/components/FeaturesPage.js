import React from 'react';
import { FaRobot, FaBell, FaChartLine, FaMobileAlt, FaShieldAlt, FaDatabase, FaUserMd, FaClipboardCheck } from 'react-icons/fa';

const FeaturesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold font-display">Features</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Our comprehensive AI-powered solution streamlines ED result management and patient follow-up
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Core Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a complete solution for managing pending ED results
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

            <div className="card">
              <div className="flex items-center mb-4">
                <FaMobileAlt className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Patient Communication</h3>
              </div>
              <p className="text-gray-600">
                Automated, HIPAA-compliant messaging system to notify patients of results and necessary follow-up actions.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Multi-channel communication (SMS, email, voice)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Secure patient portal for viewing results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Customizable message templates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Automated follow-up for unresponsive patients</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <FaChartLine className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-xl font-semibold text-gray-900">Analytics Dashboard</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive analytics to track follow-up rates, patient outcomes, and system performance.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Real-time tracking of pending results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Follow-up completion rates and trends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Patient response metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Customizable reports for quality improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Advanced Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Going beyond basic result management to provide a comprehensive solution
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
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Integration with major EHR systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Customizable physician notification rules</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaShieldAlt className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Security & Compliance</h3>
                <p className="mt-2 text-gray-600">
                  Enterprise-grade security with full HIPAA compliance and comprehensive audit trails.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Role-based access controls</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaDatabase className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Data Integration</h3>
                <p className="mt-2 text-gray-600">
                  Connects with your existing healthcare IT infrastructure to access and analyze results in real-time.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>HL7/FHIR compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>API-based integration options</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <FaClipboardCheck className="h-10 w-10 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900">Documentation & Compliance</h3>
                <p className="mt-2 text-gray-600">
                  Automated documentation of all follow-up activities to ensure regulatory compliance and reduce liability.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Comprehensive audit trails</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Automated documentation in EHR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Feature Comparison</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how our solution compares to traditional ED result management approaches
            </p>
          </div>
          
          <div className="mt-16 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ED Results Analyzer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Traditional Approach
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Result Analysis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-blue-600">✓</span> AI-powered automated analysis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-red-500">✗</span> Manual physician review
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Patient Communication
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-blue-600">✓</span> Automated multi-channel
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-red-500">✗</span> Manual phone calls
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Follow-up Tracking
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-blue-600">✓</span> Real-time dashboard
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-red-500">✗</span> Manual spreadsheets
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Documentation
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-blue-600">✓</span> Automated with audit trail
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-red-500">✗</span> Manual EHR documentation
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Physician Time Required
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-blue-600">✓</span> Minimal (critical results only)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="text-red-500">✗</span> Extensive (all results)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-display">
            Ready to see our platform in action?
          </h2>
          <p className="mt-4 text-xl text-gray-100 max-w-3xl mx-auto">
            Schedule a personalized demo to see how ED Results Analyzer can transform your ED's result management process.
          </p>
          <div className="mt-10">
            <a href="/demo" className="btn-secondary">
              Request a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage; 