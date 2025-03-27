import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { useAuth } from '../../contexts/AuthContext';
import { 
  fetchPatientsRequiringFollowUp, 
  hasAbnormalLabResults, 
  hasAbnormalImagingResults,
  getAbnormalLabComponents,
  formatDate,
  formatDateTime
} from '../../services/patientService';
import webhookService from '../../services/webhookService';
import { FaSort, FaSortUp, FaSortDown, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import PatientDetailModal from '../patient/PatientDetailModal';

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter || '');
  
  const onChange = (e) => {
    setValue(e.target.value);
    setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-500" />
        </div>
        <input
          value={value || ''}
          onChange={onChange}
          placeholder="Search patients..."
          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        console.log('Loading patients...');
        const patientsData = fetchPatientsRequiringFollowUp(currentUser);
        console.log('Loaded patients:', patientsData);
        setPatients(patientsData);
        
        // Send data for patients with abnormal results
        for (const patient of patientsData) {
          console.log('Processing patient:', patient);
          if (patient && (hasAbnormalLabResults(patient) || hasAbnormalImagingResults(patient))) {
            try {
              // Calculate risk level based on abnormal results
              const riskLevel = calculateRiskLevel(patient);
              console.log('Risk level:', riskLevel);
              
              // Get abnormal components for better risk assessment
              const abnormalLabComponents = getAbnormalLabComponents(patient);
              console.log('Abnormal lab components:', abnormalLabComponents);
              
              // Process imaging results to ensure complete information
              const processedImagingResults = (patient.imagingResults || []).map(imaging => {
                // Split the type into modality and body part if needed
                let modality = imaging.modality || '';
                let bodyPart = imaging.bodyPart || '';
                let type = imaging.type || '';

                // If type contains both modality and body part (e.g., "CHEST X-RAY")
                if (!modality && type.includes(' ')) {
                  const parts = type.split(' ');
                  if (parts[1] && isImagingModality(parts[1])) {
                    bodyPart = parts[0];
                    modality = parts[1];
                  } else if (parts[0] && isImagingModality(parts[0])) {
                    modality = parts[0];
                    bodyPart = parts.slice(1).join(' ');
                  }
                }

                return {
                  ...imaging,
                  modality: modality.toUpperCase(),
                  type: type || `${bodyPart} ${modality}`.trim(),
                  bodyPart: bodyPart.toUpperCase(),
                  withContrast: imaging.withContrast || false,
                  viewType: imaging.viewType || determineViewType(imaging),
                  numberOfViews: imaging.numberOfViews || '1'
                };
              });
              
              // Prepare complete patient data
              const completePatientData = {
                // Basic patient information
                patientId: patient.mrn,
                name: patient.name,
                dob: patient.dob,
                gender: patient.gender,
                age: calculateAge(patient.dob),
                contactInfo: {
                  phone: patient.contactPhone,
                  email: patient.contactEmail
                },
                
                // Visit details
                lastVisit: patient.lastEDVisit,
                chiefComplaint: patient.chiefComplaint,
                dischargeDiagnosis: patient.dischargeDiagnosis,
                attendingPhysician: patient.attendingPhysician,
                edNote: patient.lastEDNote,
                
                // Medical history
                pastMedicalHistory: patient.pastMedicalHistory || [],
                pastSurgicalHistory: patient.pastSurgicalHistory || [],
                medications: patient.medications || [],
                allergies: patient.allergies || [],
                
                // Lab results with full details
                labResults: (patient.labResults || []).map(lab => ({
                  id: lab.id,
                  name: lab.name,
                  collectedAt: lab.collectedAt,
                  resultedAt: lab.resultedAt,
                  status: lab.status || 'Pending', // Preserve original status or default to Pending
                  components: (lab.components || []).map(component => ({
                    name: component.name,
                    value: component.value,
                    unit: component.unit,
                    referenceRange: component.referenceRange,
                    isAbnormal: component.isAbnormal,
                    severity: component.severity,
                    interpretation: getComponentInterpretation(component),
                    status: component.status || lab.status || 'Pending' // Preserve component status
                  }))
                })),
                
                // Imaging results with full details
                imagingResults: processedImagingResults.map(imaging => ({
                  id: imaging.id,
                  name: imaging.name,
                  type: imaging.type,
                  modality: imaging.modality,
                  bodyPart: imaging.bodyPart,
                  performedAt: imaging.performedAt,
                  resultedAt: imaging.resultedAt,
                  status: imaging.status || 'Pending', // Preserve original status or default to Pending
                  findings: imaging.findings,
                  impression: imaging.impression,
                  isAbnormal: imaging.isAbnormal,
                  withContrast: imaging.withContrast,
                  viewType: imaging.viewType,
                  numberOfViews: imaging.numberOfViews
                })),
                
                // Vital signs
                vitalSigns: patient.vitalSigns || {
                  bloodPressure: '',
                  heartRate: '',
                  temperature: '',
                  respiratoryRate: '',
                  oxygenSaturation: ''
                },
                
                // Follow-up information
                followUp: {
                  status: 'pending', // Set to pending for initial webhook
                  required: patient.followUpRequired,
                  reason: patient.followUpReason,
                  instructions: patient.followUpInstructions || 'Follow up with primary care physician',
                  provider: patient.followUpProvider || currentUser.name,
                  date: patient.followUpDate || getDefaultFollowUpDate()
                },
                
                // Risk assessment
                risk: {
                  level: riskLevel,
                  factors: determineRiskFactors(patient, abnormalLabComponents)
                },
                
                // Metadata
                lastUpdated: new Date().toISOString()
              };
              
              await webhookService.sendToN8N(completePatientData);
            } catch (webhookError) {
              console.error('Failed to send patient data to webhook:', webhookError);
              // Continue with other patients even if one fails
            }
          }
        }
      } catch (err) {
        setError('Failed to load patients');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [currentUser]);

  // Helper functions for data preparation
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const calculateRiskLevel = (patient) => {
    let risk = 'low';
    const abnormalLabs = (patient.labResults || []).filter(lab => lab.isAbnormal).length;
    const abnormalImaging = (patient.imagingResults || []).filter(img => img.isAbnormal).length;
    
    if (abnormalLabs > 2 || abnormalImaging > 0) {
      risk = 'high';
    } else if (abnormalLabs > 0) {
      risk = 'moderate';
    }
    
    return risk;
  };

  const getComponentInterpretation = (component) => {
    if (!component.isAbnormal) return 'Normal';
    if (!component.value || !component.referenceRange) return 'Abnormal';
    
    const value = parseFloat(component.value);
    const [min, max] = component.referenceRange.split('-').map(parseFloat);
    
    if (isNaN(value) || isNaN(min) || isNaN(max)) return 'Abnormal';
    
    if (value < min) return 'Low';
    if (value > max) return 'High';
    return 'Abnormal';
  };

  const determineRiskFactors = (patient, abnormalComponents) => {
    const riskFactors = [];
    
    // Check lab components
    if (abnormalComponents.length > 0) {
      riskFactors.push('Abnormal Lab Results');
      // Add specific abnormal components
      abnormalComponents.forEach(component => {
        riskFactors.push(`Abnormal ${component.labName}: ${component.name}`);
      });
    }
    
    // Check imaging
    if ((patient.imagingResults || []).some(img => img.isAbnormal)) {
      riskFactors.push('Abnormal Imaging Results');
      // Add specific abnormal imaging types
      patient.imagingResults
        .filter(img => img.isAbnormal)
        .forEach(img => {
          riskFactors.push(`Abnormal ${img.type}`);
        });
    }
    
    // Check age
    if (patient.age && parseInt(patient.age) > 65) {
      riskFactors.push('Advanced Age');
    }
    
    return riskFactors;
  };

  const getDefaultFollowUpDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Default to 7 days follow-up
    return date.toISOString().split('T')[0];
  };

  const openPatientDetail = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closePatientDetail = () => {
    setIsModalOpen(false);
  };

  const handlePatientUpdate = (updatedPatient) => {
    console.log('Updating patient:', updatedPatient);
    // Update the patient in the patients array
    setPatients(currentPatients => 
      currentPatients.map(patient => 
        patient.mrn === updatedPatient.mrn ? updatedPatient : patient
      )
    );
    // Update the selected patient
    setSelectedPatient(updatedPatient);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Patient',
        accessor: 'name',
        width: '30%',
        Cell: ({ row }) => (
          <div className="max-w-full">
            <div className="font-medium text-gray-900">{row.original.name}</div>
            <div className="text-sm text-gray-500">DOB: {formatDate(row.original.dob)}</div>
            <div className="text-sm text-gray-500">MRN: {row.original.mrn}</div>
          </div>
        ),
      },
      {
        Header: 'Last ED Visit',
        accessor: 'lastEDVisit',
        width: '20%',
        Cell: ({ value }) => (
          <div className="max-w-full">
            {formatDateTime(value)}
          </div>
        ),
      },
      {
        Header: 'Diagnosis',
        accessor: 'dischargeDiagnosis',
        width: '30%',
        Cell: ({ value }) => (
          <div className="max-w-full break-words" title={value}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'followUpStatus',
        width: '10%',
        Cell: ({ value }) => {
          let statusClass = '';
          switch (value) {
            case 'pending':
              statusClass = 'severity-high';
              break;
            case 'in-progress':
              statusClass = 'severity-moderate';
              break;
            case 'completed':
              statusClass = 'severity-low';
              break;
            default:
              statusClass = 'bg-gray-100 text-gray-800';
          }
          
          return (
            <span className={`${statusClass} text-sm px-2 py-1 rounded-full inline-block`}>
              {value === 'notstarted' ? 'Not Started' : value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          );
        },
      },
      {
        Header: 'Actions',
        id: 'actions',
        width: '10%',
        Cell: ({ row }) => (
          <button
            onClick={() => openPatientDetail(row.original)}
            data-patient-id={row.original.id}
            className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: patients,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const isImagingModality = (text) => {
    const modalities = ['XRAY', 'X-RAY', 'CT', 'MRI', 'US', 'ULTRASOUND'];
    return modalities.includes(text.toUpperCase());
  };

  const determineViewType = (imaging) => {
    if (imaging.viewType) return imaging.viewType;
    if (imaging.type && imaging.type.toLowerCase().includes('lateral')) return 'LATERAL';
    if (imaging.type && imaging.type.toLowerCase().includes('ap')) return 'AP';
    return '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Patient Follow-Up Dashboard
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            onClick={() => {/* Export functionality */}}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col">
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                <table {...getTableProps()} className="min-w-full table-fixed border-separate" style={{ borderSpacing: 0 }}>
                  <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                          <th
                            scope="col"
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className={`sticky top-0 border-b border-gray-300 bg-gray-50 py-3.5 text-left text-sm font-semibold text-gray-900 ${
                              index === 0 ? 'pl-8' : 'px-4'
                            }`}
                            style={{ width: column.width }}
                          >
                            <div className="flex items-center space-x-1 group">
                              <span>{column.render('Header')}</span>
                              <span className="invisible group-hover:visible">
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <FaSortDown aria-hidden="true" />
                                  ) : (
                                    <FaSortUp aria-hidden="true" />
                                  )
                                ) : (
                                  column.canSort && <FaSort aria-hidden="true" />
                                )}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()} className="bg-white">
                    {rows.map(row => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell, index) => (
                            <td
                              {...cell.getCellProps()}
                              className={`border-b border-gray-200 py-4 text-sm ${
                                index === 0 ? 'pl-8' : 'px-4'
                              }`}
                              style={{ width: cell.column.width }}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={closePatientDetail}
          onPatientUpdate={handlePatientUpdate}
        />
      )}
    </div>
  );
};

export default PatientDashboard; 