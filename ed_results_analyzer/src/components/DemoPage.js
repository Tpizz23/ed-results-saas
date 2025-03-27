import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const DemoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    size: 'small',
    date: '',
    time: '',
    comments: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log('Demo requested:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        size: 'small',
        date: '',
        time: '',
        comments: ''
      });
    }, 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold font-display">Request a Demo</h1>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            See how our AI-powered solution can transform your ED's result management process
          </p>
        </div>
      </section>

      {/* Demo Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-display">What to Expect in Your Demo</h2>
              <p className="mt-4 text-lg text-gray-600">
                Our personalized demo will show you how ED Results Analyzer can work in your specific environment. 
                You'll see firsthand how our AI technology analyzes results, automates patient communication, 
                and integrates with your existing systems.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white">
                      <span>1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Product Overview</h3>
                    <p className="mt-1 text-gray-600">
                      A comprehensive walkthrough of our platform's features and capabilities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white">
                      <span>2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Customized Demonstration</h3>
                    <p className="mt-1 text-gray-600">
                      See how our solution would work with your specific ED workflow and systems.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white">
                      <span>3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Q&A Session</h3>
                    <p className="mt-1 text-gray-600">
                      Get answers to your specific questions from our product specialists.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white">
                      <span>4</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Implementation Discussion</h3>
                    <p className="mt-1 text-gray-600">
                      Learn about the implementation process, timeline, and support options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 font-display">Schedule Your Demo</h2>
              
              {isSubmitted ? (
                <div className="mt-8 bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FaCheck className="text-blue-600 mr-2" />
                    <h3 className="ml-3 text-lg font-medium text-green-800">Demo Request Received!</h3>
                  </div>
                  <p className="mt-2 text-green-700">
                    Thank you for your interest in ED Results Analyzer. One of our product specialists will contact you shortly to confirm your demo appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                      Organization/Hospital *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      required
                      placeholder="e.g. ED Physician, Department Director"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                      ED Size
                    </label>
                    <select
                      name="size"
                      id="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="small">Small (&lt; 20,000 annual visits)</option>
                      <option value="medium">Medium (20,000 - 50,000 annual visits)</option>
                      <option value="large">Large (&gt; 50,000 annual visits)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        id="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                      Additional Comments
                    </label>
                    <textarea
                      name="comments"
                      id="comments"
                      rows="3"
                      value={formData.comments}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Let us know if you have any specific questions or areas of interest"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaCheck className="mr-2" />
                      Schedule Demo
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from healthcare providers who have transformed their ED result management process
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://via.placeholder.com/60x60?text=Dr.+J" 
                  alt="Dr. Johnson" 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Dr. Robert Johnson</h3>
                  <p className="text-gray-600">ED Medical Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "ED Results Analyzer has completely transformed how we manage pending results. Our physicians save hours each week, and we've seen a 40% improvement in follow-up completion rates."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://via.placeholder.com/60x60?text=Dr.+P" 
                  alt="Dr. Patel" 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Dr. Anita Patel</h3>
                  <p className="text-gray-600">Emergency Physician</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI analysis is incredibly accurate. It catches abnormal results that might have been overlooked in our busy ED, and the automated patient communication ensures nothing falls through the cracks."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://via.placeholder.com/60x60?text=Ms.+T" 
                  alt="Ms. Thompson" 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Ms. Sarah Thompson</h3>
                  <p className="text-gray-600">ED Nursing Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Implementation was seamless, and the support team has been exceptional. The analytics dashboard gives us valuable insights into our follow-up process that we never had before."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our demo process and platform
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">How long does the demo typically last?</h3>
              <p className="mt-2 text-gray-600">
                Our demos typically last 45-60 minutes, including time for questions and discussion about your specific needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Who should attend the demo from our organization?</h3>
              <p className="mt-2 text-gray-600">
                We recommend including ED physicians, nursing leadership, IT representatives, and any quality/safety officers who would be involved in the implementation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">How quickly can we implement after the demo?</h3>
              <p className="mt-2 text-gray-600">
                Typical implementation takes 4-8 weeks, depending on your IT infrastructure and integration requirements. We'll provide a detailed timeline during the demo.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Does your system integrate with our EHR?</h3>
              <p className="mt-2 text-gray-600">
                We integrate with all major EHR systems including Epic, Cerner, Meditech, and Allscripts. We'll discuss your specific EHR during the demo.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is the demo a live demonstration or a pre-recorded video?</h3>
              <p className="mt-2 text-gray-600">
                All our demos are live and interactive, allowing us to customize the presentation to your specific needs and answer questions in real-time.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">What happens after the demo?</h3>
              <p className="mt-2 text-gray-600">
                After the demo, we'll provide a detailed proposal including pricing, implementation timeline, and next steps. We're also happy to arrange follow-up discussions with technical teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage; 