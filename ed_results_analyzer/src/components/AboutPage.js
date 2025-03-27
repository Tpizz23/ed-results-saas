import React from 'react';
import { FaUserMd, FaHospital, FaStethoscope } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold font-display">About Us</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            We're a team of emergency physicians, data scientists, and healthcare technologists 
            dedicated to improving patient care through innovative AI solutions.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-display">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                ED Results Analyzer was founded by a team of emergency physicians who experienced firsthand 
                the challenges of managing pending results for discharged patients. After a critical lab result 
                was missed due to the overwhelming volume of pending results, our founder decided there had to be a better way.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We partnered with leading AI researchers and healthcare IT specialists to develop a solution 
                that could automatically analyze pending results, identify critical findings, and ensure timely 
                patient follow-up—all while reducing the burden on busy ED physicians and staff.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, our AI-powered platform is used by emergency departments across the country, helping to 
                improve patient outcomes and reduce physician workload.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://via.placeholder.com/500x400?text=Our+Story" 
                alt="Our Story" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 font-display">Our Mission</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            To transform emergency department follow-up care through AI-powered solutions that ensure 
            no critical result goes unnoticed and every patient receives timely, appropriate care.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center">
                <FaUserMd className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Physician-Led</h3>
              <p className="mt-2 text-gray-700">
                Developed by emergency physicians who understand the unique challenges of ED workflow and patient care.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <FaStethoscope className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">AI-Powered</h3>
              <p className="mt-2 text-gray-700">
                Leveraging cutting-edge artificial intelligence to analyze results with accuracy that exceeds human review.
              </p>
            </div>

            <div className="card text-center">
              <div className="flex justify-center">
                <FaHospital className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Patient-Centered</h3>
              <p className="mt-2 text-gray-700">
                Focused on improving patient outcomes through timely follow-up and clear communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Our Leadership Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experts behind ED Results Analyzer
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <img 
                src="https://via.placeholder.com/200x200?text=Dr.+Smith" 
                alt="Dr. Smith" 
                className="rounded-full h-40 w-40 mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Dr. Sarah Smith, MD</h3>
              <p className="text-primary font-medium">Founder & CEO</p>
              <p className="mt-2 text-gray-600">
                Board-certified emergency physician with 15 years of experience in academic and community settings.
              </p>
            </div>

            <div className="card text-center">
              <img 
                src="https://via.placeholder.com/200x200?text=Dr.+Johnson" 
                alt="Dr. Johnson" 
                className="rounded-full h-40 w-40 mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Dr. Michael Johnson, MD</h3>
              <p className="text-primary font-medium">Chief Medical Officer</p>
              <p className="mt-2 text-gray-600">
                Emergency medicine specialist with expertise in healthcare quality improvement and patient safety.
              </p>
            </div>

            <div className="card text-center">
              <img 
                src="https://via.placeholder.com/200x200?text=Dr.+Chen" 
                alt="Dr. Chen" 
                className="rounded-full h-40 w-40 mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Dr. David Chen, PhD</h3>
              <p className="text-primary font-medium">Chief Technology Officer</p>
              <p className="mt-2 text-gray-600">
                AI researcher with a background in clinical decision support systems and healthcare informatics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Our Partners</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with leading healthcare institutions and technology providers
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex justify-center items-center">
              <img 
                src="https://via.placeholder.com/200x100?text=Hospital+Partner" 
                alt="Hospital Partner" 
                className="h-16"
              />
            </div>
            <div className="flex justify-center items-center">
              <img 
                src="https://via.placeholder.com/200x100?text=Tech+Partner" 
                alt="Tech Partner" 
                className="h-16"
              />
            </div>
            <div className="flex justify-center items-center">
              <img 
                src="https://via.placeholder.com/200x100?text=Research+Partner" 
                alt="Research Partner" 
                className="h-16"
              />
            </div>
            <div className="flex justify-center items-center">
              <img 
                src="https://via.placeholder.com/200x100?text=Healthcare+Partner" 
                alt="Healthcare Partner" 
                className="h-16"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 