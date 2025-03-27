import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHospital, FaChartLine, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">About ED Results Analyzer</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Transforming emergency department follow-up care with innovative technology
          </p>
        </div>
      </header>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At ED Results Analyzer, our mission is to improve patient outcomes by ensuring timely follow-up for emergency department patients with abnormal test results. We believe that no patient should fall through the cracks of our healthcare system.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform leverages artificial intelligence and automation to identify patients requiring follow-up, streamline communication, and reduce the administrative burden on emergency department staff, allowing them to focus on what matters most: patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                ED Results Analyzer was founded by a team of emergency medicine physicians who experienced firsthand the challenges of managing patient follow-up in busy emergency departments.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                After witnessing patients with critical abnormal results being lost to follow-up due to overwhelmed systems and processes, our founders decided to create a solution that would address this critical gap in emergency care.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Since our founding in 2020, we've partnered with leading healthcare institutions across the country to implement our platform and have helped ensure proper follow-up for thousands of patients with abnormal results.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="/images/team-photo.jpg" 
                alt="ED Results Analyzer Team" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Our+Team';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
                <FaUserMd className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient-Centered</h3>
              <p className="text-gray-600">
                We put patients at the center of everything we do, ensuring their safety and well-being.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
                <FaHospital className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to improve healthcare delivery and patient outcomes.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
                <FaChartLine className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in our technology, service, and support.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
                <FaUsers className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We work closely with healthcare providers to develop solutions that meet their needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/images/ceo.jpg" 
                alt="CEO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/128?text=CEO';
                }}
              />
              <h3 className="text-xl font-semibold mb-1">Dr. Sarah Johnson</h3>
              <p className="text-primary-600 mb-4">CEO & Co-Founder</p>
              <p className="text-gray-600">
                Emergency Medicine Physician with 15+ years of experience in healthcare technology.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/images/cto.jpg" 
                alt="CTO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/128?text=CTO';
                }}
              />
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-primary-600 mb-4">CTO & Co-Founder</p>
              <p className="text-gray-600">
                Former Google AI engineer with expertise in healthcare data systems and machine learning.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <img 
                src="/images/cmo.jpg" 
                alt="CMO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/128?text=CMO';
                }}
              />
              <h3 className="text-xl font-semibold mb-1">Dr. Robert Williams</h3>
              <p className="text-primary-600 mb-4">Chief Medical Officer</p>
              <p className="text-gray-600">
                Board-certified Emergency Physician and former ED Director at Memorial Hospital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join us in transforming emergency care</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn how ED Results Analyzer can help your emergency department improve patient follow-up and outcomes
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg">
              Request a Demo
            </Link>
            <Link to="/careers" className="border border-white text-white hover:bg-primary-600 font-bold py-3 px-6 rounded-lg text-lg">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 