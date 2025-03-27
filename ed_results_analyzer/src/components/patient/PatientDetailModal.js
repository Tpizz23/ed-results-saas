import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';
import webhookService from '../../services/webhookService';

// Set the app element for accessibility - move this to your App.js or index.js
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const PatientDetailModal = ({ isOpen, onClose, patient, onPatientUpdate }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [followUpStatus, setFollowUpStatus] = useState('notstarted');
  const [followUpMessage, setFollowUpMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Update status when patient changes
  useEffect(() => {
    if (patient?.followUpStatus) {
      setFollowUpStatus(patient.followUpStatus);
    } else {
      setFollowUpStatus('notstarted');
    }
  }, [patient?.followUpStatus]);

  useEffect(() => {
    // Reset message when patient changes
    setFollowUpMessage('');
    setLastUpdated(null);
    
    if (!patient?.mrn) return;

    console.log('Setting up message listener for patient:', patient.mrn);
    
    // Set up message listener
    const removeListener = webhookService.addMessageListener((patientId, message, timestamp) => {
      console.log('Message listener called:', patientId, message, timestamp);
      if (patientId === patient.patientId) {
        console.log('Setting follow-up message:', message);
        setFollowUpMessage(message);
        setLastUpdated(timestamp || new Date());
        // Automatically switch to follow-up tab when new message arrives
        setActiveTab('followup');
      }
    });

    // Load existing message if any
    const existingMessage = webhookService.getPatientMessage(patient.patientId);
    if (existingMessage) {
      console.log('Found existing message:', existingMessage);
      setFollowUpMessage(existingMessage.message);
      setLastUpdated(existingMessage.timestamp);
    }

    // Clean up listener on unmount
    return () => {
      console.log('Cleaning up message listener');
      removeListener();
    };
  }, [patient?.patientId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowUpStatusChange = (status) => {
    const oldStatus = followUpStatus;
    setFollowUpStatus(status);
    
    // Trigger webhook when changing from notstarted to pending
    if (oldStatus === 'notstarted' && status === 'pending' && patient) {
      console.log('Status changed from notstarted to pending, sending to N8N');
      const updatedPatient = {
        patientId: patient.mrn,
        name: patient.name,
        dob: patient.dob,
        followUp: {
          status: status,
          required: true,
          reason: patient.chiefComplaint || patient.followUpReason || 'Follow up required',
          instructions: 'Follow up required for abnormal results',
          provider: patient.attendingPhysician,
          date: new Date().toISOString()
        },
        chiefComplaint: patient.chiefComplaint,
        labResults: patient.labResults,
        imagingResults: patient.imagingResults,
        lastEDNote: patient.lastEDNote
      };
      
      console.log('Sending updated patient data:', updatedPatient);
      
      webhookService.sendToN8N(updatedPatient)
        .then(response => {
          console.log('N8N webhook response:', response);
          // Set the follow-up message from the response
          const message = typeof response === 'string' ? response : response.message;
          setFollowUpMessage(message);
          setLastUpdated(new Date());
          // Switch to the follow-up tab to show the message
          setActiveTab('followup');
          if (onPatientUpdate) {
            onPatientUpdate({ ...patient, followUpStatus: status });
          }
        })
        .catch(error => {
          console.error('Error sending to N8N:', error);
          setFollowUpMessage(`Error: ${error.message}`);
          setLastUpdated(new Date());
          setActiveTab('followup');
        });
    } else if (onPatientUpdate) {
      // Update patient status for other status changes
      onPatientUpdate({ ...patient, followUpStatus: status });
    }
  };

  // Format the lab results for display
  const formatLabResults = (results) => {
    return results?.map((result, index) => ({
      ...result,
      key: `lab-${index}`
    })) || [];
  };

  // Format the imaging results for display
  const formatImagingResults = (results) => {
    return results?.map((result, index) => ({
      ...result,
      key: `imaging-${index}`
    })) || [];
  };

  const labResults = formatLabResults(patient?.labResults);
  const imagingResults = formatImagingResults(patient?.imagingResults);

  if (!isOpen || !patient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto mt-10 overflow-y-auto max-h-[90vh]"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Patient info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-sm">
            <p className="text-gray-500">MRN</p>
            <p className="font-semibold">{patient.mrn}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">DOB</p>
            <p className="font-semibold">{patient.dob}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Chief Complaint</p>
            <p className="font-semibold">{patient.chiefComplaint}</p>
          </div>
        </div>

        {/* Follow-up status */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">Follow-up Status</p>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                followUpStatus === 'notstarted'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleFollowUpStatusChange('notstarted')}
            >
              Not Started
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                followUpStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'
              }`}
              onClick={() => handleFollowUpStatusChange('pending')}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
                followUpStatus === 'contacted'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              onClick={() => handleFollowUpStatusChange('contacted')}
            >
              <FaCheckCircle className="inline mr-1" /> Contacted
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
                followUpStatus === 'failed'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              onClick={() => handleFollowUpStatusChange('failed')}
            >
              <FaExclamationTriangle className="inline mr-1" /> Failed
            </button>
          </div>
        </div>

        {/* Status badge */}
        <span className={`px-2 py-1 text-sm rounded-full ${
          followUpStatus === 'notstarted' ? 'bg-gray-100 text-gray-800' :
          followUpStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          followUpStatus === 'contacted' ? 'bg-blue-100 text-blue-800' :
          followUpStatus === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {followUpStatus ? followUpStatus === 'notstarted' ? 'Not Started' : 
            followUpStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'No Status'}
        </span>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => handleTabChange('notes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ED Notes
            </button>
            <button
              onClick={() => handleTabChange('labs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'labs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Lab Results
            </button>
            <button
              onClick={() => handleTabChange('imaging')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'imaging'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Imaging Results
            </button>
            <button
              onClick={() => handleTabChange('followup')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'followup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Follow-up Message
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === 'labs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Lab Results</h3>
              {labResults.length === 0 ? (
                <p className="text-gray-500">No lab results available.</p>
              ) : (
                <div className="space-y-6">
                  {labResults.map((result) => (
                    <div key={result.key} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{result.name}</h4>
                          <p className="text-sm text-gray-500">
                            Collected: {new Date(result.collectedAt).toLocaleString()}
                          </p>
                          {result.resultedAt && (
                            <p className="text-sm text-gray-500">
                              Resulted: {new Date(result.resultedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          result.status === 'Final' ? 'bg-green-100 text-green-800' :
                          result.status === 'Preliminary' ? 'bg-yellow-100 text-yellow-800' :
                          result.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      {result.components && (
                        <div className="mt-3">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {result.components.map((component, idx) => (
                                <tr key={idx} className={component.isAbnormal ? 'bg-red-50' : ''}>
                                  <td className="px-3 py-2 text-sm text-gray-900">{component.name}</td>
                                  <td className="px-3 py-2 text-sm">
                                    <span className={component.isAbnormal ? 
                                      `font-medium ${
                                        component.severity === 'severe' ? 'text-red-700' :
                                        component.severity === 'moderate' ? 'text-orange-700' :
                                        'text-yellow-700'
                                      }` : 'text-gray-900'
                                    }>
                                      {component.value} {component.unit}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-500">{component.referenceRange}</td>
                                  <td className="px-3 py-2 text-sm">
                                    {component.isAbnormal && (
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        component.severity === 'severe' ? 'bg-red-100 text-red-800' :
                                        component.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {component.severity.charAt(0).toUpperCase() + component.severity.slice(1)}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'imaging' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Imaging Results</h3>
              {imagingResults.length === 0 ? (
                <p className="text-gray-500">No imaging results available.</p>
              ) : (
                <div className="space-y-6">
                  {imagingResults.map((result) => (
                    <div key={result.key} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{result.name}</h4>
                          <p className="text-sm text-gray-500">
                            Performed: {new Date(result.performedAt).toLocaleString()}
                          </p>
                          {result.resultedAt && (
                            <p className="text-sm text-gray-500">
                              Resulted: {new Date(result.resultedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          result.status === 'Final' ? 'bg-green-100 text-green-800' :
                          result.status === 'Preliminary' ? 'bg-yellow-100 text-yellow-800' :
                          result.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {result.findings && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Findings</h5>
                            <p className={`text-sm mt-1 ${result.isAbnormal ? 'text-red-600' : 'text-gray-600'}`}>
                              {result.findings}
                            </p>
                          </div>
                        )}
                        {result.impression && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Impression</h5>
                            <p className="text-sm mt-1 text-gray-600">{result.impression}</p>
                          </div>
                        )}
                        {result.isAbnormal && (
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.severity === 'severe' ? 'bg-red-100 text-red-800' :
                              result.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Abnormality
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">ED Notes</h3>
              {patient.lastEDNote ? (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{patient.lastEDNote}</pre>
                </div>
              ) : (
                <p className="text-gray-500">No ED notes available.</p>
              )}
            </div>
          )}

          {activeTab === 'followup' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Follow-up Message</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      followUpStatus === 'notstarted' ? 'bg-gray-100 text-gray-800' :
                      followUpStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      followUpStatus === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      followUpStatus === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {followUpStatus ? followUpStatus === 'notstarted' ? 'Not Started' : 
                        followUpStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'No Status'}
                    </span>
                  </div>
                  {lastUpdated && (
                    <span className="text-sm text-gray-500">
                      Last updated: {new Date(lastUpdated).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="bg-gray-50 rounded p-3">
                  {followUpMessage ? (
                    <div className="space-y-2">
                      <div 
                        className="text-sm text-gray-700 prose max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: (() => {
                            try {
                              if (!followUpMessage) return '';
                              
                              let message = followUpMessage;
                              
                              // Handle array-like format
                              if (message.startsWith('[{') && message.endsWith('}]')) {
                                try {
                                  const parsed = JSON.parse(message);
                                  if (Array.isArray(parsed) && parsed[0]?.MessageHTML) {
                                    message = parsed[0].MessageHTML;
                                  }
                                } catch (e) {
                                  console.error('Error parsing array format:', e);
                                }
                              }
                              
                              // Handle direct MessageHTML format
                              if (message.includes('MessageHTML')) {
                                try {
                                  const parsed = JSON.parse(message);
                                  message = parsed.MessageHTML;
                                } catch (e) {
                                  console.error('Error parsing MessageHTML format:', e);
                                }
                              }
                              
                              // Clean up the message
                              return message
                                .replace(/\["MessageHTML":"|"MessageHTML":"/g, '')  // Remove MessageHTML prefix
                                .replace(/\\n/g, '<br>')  // Convert newlines to <br>
                                .replace(/\\/g, '')  // Remove escape characters
                                .replace(/^["*]+|["*]+$/g, '')  // Remove quotes and asterisks at start/end
                                .replace(/"}]$/g, '')  // Remove trailing }]
                                .trim();  // Clean up any extra whitespace
                              
                            } catch (error) {
                              console.error('Error formatting message:', error);
                              return followUpMessage || '';
                            }
                          })()
                        }}
                      />
                      {followUpStatus === 'pending' && (
                        <div className="flex items-center mt-2 text-yellow-600">
                          <FaClock className="mr-2" />
                          <span className="text-sm">Waiting for follow-up completion...</span>
                        </div>
                      )}
                      {followUpStatus === 'complete' && (
                        <div className="flex items-center mt-2 text-green-600">
                          <FaCheckCircle className="mr-2" />
                          <span className="text-sm">Follow-up completed</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      {followUpStatus === 'notstarted' ? (
                        <p className="text-gray-500 italic">Change status to "Pending" to initiate follow-up</p>
                      ) : (
                        <p className="text-gray-500 italic">No follow-up message available</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PatientDetailModal; 