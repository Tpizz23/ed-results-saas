// Mock patient database
// In a real application, this would be retrieved from an EHR system like Epic
// through a secure API integration

const patients = [
  {
    id: 'P1001',
    name: 'John Smith',
    dob: '1975-05-15',
    gender: 'Male',
    mrn: 'MRN12345',
    contactPhone: '555-123-4567',
    contactEmail: 'jsmith@example.com',
    lastEDVisit: '2023-03-10T14:30:00Z',
    dischargeDiagnosis: 'Chest pain, rule out myocardial infarction',
    attendingPhysician: 'Dr. Sarah Johnson',
    labResults: [
      {
        id: 'L1001',
        name: 'Complete Blood Count (CBC)',
        collectedAt: '2023-03-10T15:45:00Z',
        resultedAt: '2023-03-10T16:30:00Z',
        status: 'Final',
        components: [
          {
            name: 'WBC',
            value: '12.5',
            unit: 'K/uL',
            referenceRange: '4.5-11.0',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'RBC',
            value: '4.8',
            unit: 'M/uL',
            referenceRange: '4.5-5.9',
            isAbnormal: false
          },
          {
            name: 'Hemoglobin',
            value: '14.2',
            unit: 'g/dL',
            referenceRange: '13.5-17.5',
            isAbnormal: false
          },
          {
            name: 'Hematocrit',
            value: '42',
            unit: '%',
            referenceRange: '41-50',
            isAbnormal: false
          },
          {
            name: 'Platelets',
            value: '145',
            unit: 'K/uL',
            referenceRange: '150-450',
            isAbnormal: true,
            severity: 'mild'
          }
        ]
      },
      {
        id: 'L1002',
        name: 'Basic Metabolic Panel (BMP)',
        collectedAt: '2023-03-10T15:45:00Z',
        resultedAt: '2023-03-10T16:45:00Z',
        status: 'Final',
        components: [
          {
            name: 'Sodium',
            value: '138',
            unit: 'mmol/L',
            referenceRange: '135-145',
            isAbnormal: false
          },
          {
            name: 'Potassium',
            value: '3.4',
            unit: 'mmol/L',
            referenceRange: '3.5-5.0',
            isAbnormal: true,
            severity: 'mild'
          },
          {
            name: 'Chloride',
            value: '102',
            unit: 'mmol/L',
            referenceRange: '98-107',
            isAbnormal: false
          },
          {
            name: 'CO2',
            value: '24',
            unit: 'mmol/L',
            referenceRange: '22-29',
            isAbnormal: false
          },
          {
            name: 'BUN',
            value: '18',
            unit: 'mg/dL',
            referenceRange: '7-20',
            isAbnormal: false
          },
          {
            name: 'Creatinine',
            value: '0.9',
            unit: 'mg/dL',
            referenceRange: '0.6-1.2',
            isAbnormal: false
          },
          {
            name: 'Glucose',
            value: '110',
            unit: 'mg/dL',
            referenceRange: '70-99',
            isAbnormal: true,
            severity: 'mild'
          }
        ]
      },
      {
        id: 'L1003',
        name: 'Troponin I',
        collectedAt: '2023-03-10T15:45:00Z',
        resultedAt: '2023-03-10T16:30:00Z',
        status: 'Final',
        components: [
          {
            name: 'Troponin I',
            value: '0.02',
            unit: 'ng/mL',
            referenceRange: '0.00-0.04',
            isAbnormal: false
          }
        ]
      }
    ],
    imagingResults: [
      {
        id: 'I1001',
        name: 'Chest X-Ray',
        performedAt: '2023-03-10T16:00:00Z',
        resultedAt: '2023-03-10T16:45:00Z',
        status: 'Final',
        findings: 'No acute cardiopulmonary process. Heart size normal. Lungs are clear.',
        impression: 'Normal chest radiograph.',
        isAbnormal: false
      }
    ],
    pastMedicalHistory: [
      'Hypertension - diagnosed 2015',
      'Type 2 Diabetes Mellitus - diagnosed 2018',
      'Hyperlipidemia - diagnosed 2016'
    ],
    pastSurgicalHistory: [
      'Appendectomy - 2005',
      'Right knee arthroscopy - 2019'
    ],
    medications: [
      'Lisinopril 10mg daily',
      'Metformin 500mg twice daily',
      'Atorvastatin 20mg daily',
      'Aspirin 81mg daily'
    ],
    allergies: [
      'Penicillin - Hives',
      'Sulfa drugs - Rash'
    ],
    lastEDNote: 'Patient is a 48-year-old male with history of hypertension, diabetes, and hyperlipidemia who presented to the ED with chest pain that started this morning. Pain is described as pressure-like, non-radiating, 5/10 in severity. Vital signs stable. ECG shows normal sinus rhythm without acute ST changes. Initial troponin negative. Chest X-ray normal. Patient received aspirin and was observed for 4 hours with resolution of symptoms. Discharged home with instructions to follow up with primary care physician within 2-3 days and return to ED if symptoms recur.',
    followUpRequired: true,
    followUpReason: 'Abnormal lab results: Elevated WBC, Low platelets, Low potassium, Elevated glucose',
    followUpStatus: 'notstarted'
  },
  {
    id: 'P1002',
    name: 'Mary Johnson',
    dob: '1982-09-23',
    gender: 'Female',
    mrn: 'MRN67890',
    contactPhone: '555-987-6543',
    contactEmail: 'mjohnson@example.com',
    lastEDVisit: '2023-03-11T10:15:00Z',
    dischargeDiagnosis: 'Urinary tract infection',
    attendingPhysician: 'Dr. Robert Williams',
    labResults: [
      {
        id: 'L2001',
        name: 'Urinalysis',
        collectedAt: '2023-03-11T10:45:00Z',
        resultedAt: '2023-03-11T11:30:00Z',
        status: 'Final',
        components: [
          {
            name: 'Color',
            value: 'Yellow',
            referenceRange: 'Yellow',
            isAbnormal: false
          },
          {
            name: 'Clarity',
            value: 'Cloudy',
            referenceRange: 'Clear',
            isAbnormal: true,
            severity: 'mild'
          },
          {
            name: 'pH',
            value: '6.5',
            unit: '',
            referenceRange: '5.0-8.0',
            isAbnormal: false
          },
          {
            name: 'Specific Gravity',
            value: '1.020',
            unit: '',
            referenceRange: '1.005-1.030',
            isAbnormal: false
          },
          {
            name: 'Glucose',
            value: 'Negative',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: false
          },
          {
            name: 'Ketones',
            value: 'Negative',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: false
          },
          {
            name: 'Blood',
            value: 'Trace',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: true,
            severity: 'mild'
          },
          {
            name: 'Protein',
            value: 'Trace',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: true,
            severity: 'mild'
          },
          {
            name: 'Nitrite',
            value: 'Positive',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Leukocyte Esterase',
            value: 'Positive',
            unit: '',
            referenceRange: 'Negative',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'WBC',
            value: '50-100',
            unit: '/HPF',
            referenceRange: '0-5',
            isAbnormal: true,
            severity: 'severe'
          },
          {
            name: 'RBC',
            value: '5-10',
            unit: '/HPF',
            referenceRange: '0-2',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Bacteria',
            value: 'Many',
            unit: '',
            referenceRange: 'None',
            isAbnormal: true,
            severity: 'severe'
          }
        ]
      },
      {
        id: 'L2002',
        name: 'Urine Culture',
        collectedAt: '2023-03-11T10:45:00Z',
        resultedAt: '2023-03-13T14:30:00Z',
        status: 'Final',
        components: [
          {
            name: 'Culture Result',
            value: 'Escherichia coli >100,000 CFU/mL',
            referenceRange: 'No growth',
            isAbnormal: true,
            severity: 'severe'
          },
          {
            name: 'Antibiotic Sensitivity',
            value: 'Sensitive to Nitrofurantoin, Ciprofloxacin, Trimethoprim-Sulfamethoxazole',
            isAbnormal: false
          }
        ]
      }
    ],
    imagingResults: [],
    pastMedicalHistory: [
      'Recurrent urinary tract infections',
      'Migraine headaches',
      'Anxiety disorder'
    ],
    pastSurgicalHistory: [
      'Cesarean section - 2018'
    ],
    medications: [
      'Sumatriptan as needed for migraines',
      'Escitalopram 10mg daily'
    ],
    allergies: [
      'No known drug allergies'
    ],
    lastEDNote: 'Patient is a 40-year-old female with history of recurrent UTIs who presented to the ED with dysuria, frequency, and suprapubic pain for 2 days. Denies fever, chills, nausea, or vomiting. Vital signs stable. Abdominal exam reveals mild suprapubic tenderness, no CVA tenderness. Urinalysis positive for nitrites, leukocyte esterase, and microscopic hematuria. Diagnosed with uncomplicated UTI and discharged on Nitrofurantoin 100mg twice daily for 5 days. Instructed to increase fluid intake and follow up with primary care if symptoms persist or worsen.',
    followUpRequired: true,
    followUpReason: 'Urine culture results pending at discharge, now resulted with E. coli',
    followUpStatus: 'notstarted'
  },
  {
    id: 'P1003',
    name: 'Robert Davis',
    dob: '1950-03-08',
    gender: 'Male',
    mrn: 'MRN54321',
    contactPhone: '555-456-7890',
    contactEmail: 'rdavis@example.com',
    lastEDVisit: '2023-03-12T08:45:00Z',
    dischargeDiagnosis: 'Syncope, rule out cardiac arrhythmia',
    attendingPhysician: 'Dr. Sarah Johnson',
    labResults: [
      {
        id: 'L3001',
        name: 'Complete Blood Count (CBC)',
        collectedAt: '2023-03-12T09:15:00Z',
        resultedAt: '2023-03-12T10:00:00Z',
        status: 'Final',
        components: [
          {
            name: 'WBC',
            value: '7.5',
            unit: 'K/uL',
            referenceRange: '4.5-11.0',
            isAbnormal: false
          },
          {
            name: 'RBC',
            value: '3.8',
            unit: 'M/uL',
            referenceRange: '4.5-5.9',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Hemoglobin',
            value: '11.2',
            unit: 'g/dL',
            referenceRange: '13.5-17.5',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Hematocrit',
            value: '34',
            unit: '%',
            referenceRange: '41-50',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Platelets',
            value: '180',
            unit: 'K/uL',
            referenceRange: '150-450',
            isAbnormal: false
          }
        ]
      },
      {
        id: 'L3002',
        name: 'Basic Metabolic Panel (BMP)',
        collectedAt: '2023-03-12T09:15:00Z',
        resultedAt: '2023-03-12T10:15:00Z',
        status: 'Final',
        components: [
          {
            name: 'Sodium',
            value: '142',
            unit: 'mmol/L',
            referenceRange: '135-145',
            isAbnormal: false
          },
          {
            name: 'Potassium',
            value: '3.2',
            unit: 'mmol/L',
            referenceRange: '3.5-5.0',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Chloride',
            value: '104',
            unit: 'mmol/L',
            referenceRange: '98-107',
            isAbnormal: false
          },
          {
            name: 'CO2',
            value: '26',
            unit: 'mmol/L',
            referenceRange: '22-29',
            isAbnormal: false
          },
          {
            name: 'BUN',
            value: '28',
            unit: 'mg/dL',
            referenceRange: '7-20',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Creatinine',
            value: '1.4',
            unit: 'mg/dL',
            referenceRange: '0.6-1.2',
            isAbnormal: true,
            severity: 'moderate'
          },
          {
            name: 'Glucose',
            value: '95',
            unit: 'mg/dL',
            referenceRange: '70-99',
            isAbnormal: false
          }
        ]
      },
      {
        id: 'L3003',
        name: 'Troponin I',
        collectedAt: '2023-03-12T09:15:00Z',
        resultedAt: '2023-03-12T10:00:00Z',
        status: 'Final',
        components: [
          {
            name: 'Troponin I',
            value: '0.01',
            unit: 'ng/mL',
            referenceRange: '0.00-0.04',
            isAbnormal: false
          }
        ]
      }
    ],
    imagingResults: [
      {
        id: 'I3001',
        name: 'Chest X-Ray',
        performedAt: '2023-03-12T09:30:00Z',
        resultedAt: '2023-03-12T10:15:00Z',
        status: 'Final',
        findings: 'Cardiomegaly present. No acute infiltrates or effusions. No pneumothorax.',
        impression: 'Cardiomegaly without acute pulmonary process.',
        isAbnormal: true,
        severity: 'moderate'
      },
      {
        id: 'I3002',
        name: 'CT Head without Contrast',
        performedAt: '2023-03-12T10:00:00Z',
        resultedAt: '2023-03-12T11:00:00Z',
        status: 'Final',
        findings: 'No acute intracranial hemorrhage, mass effect, or midline shift. No acute infarct. Mild chronic microvascular ischemic changes consistent with age. Mild generalized volume loss also consistent with age.',
        impression: 'No acute intracranial abnormality.',
        isAbnormal: false
      }
    ],
    pastMedicalHistory: [
      'Coronary artery disease - s/p CABG 2010',
      'Hypertension',
      'Chronic kidney disease stage 3',
      'Type 2 Diabetes Mellitus',
      'Hyperlipidemia',
      'Gout'
    ],
    pastSurgicalHistory: [
      'CABG x3 - 2010',
      'Right total knee replacement - 2015',
      'Appendectomy - 1975'
    ],
    medications: [
      'Aspirin 81mg daily',
      'Atorvastatin 40mg daily',
      'Metoprolol succinate 50mg daily',
      'Lisinopril 20mg daily',
      'Metformin 1000mg twice daily',
      'Allopurinol 300mg daily',
      'Furosemide 20mg daily'
    ],
    allergies: [
      'Codeine - Nausea and vomiting',
      'Contrast dye - Hives'
    ],
    lastEDNote: 'Patient is a 73-year-old male with history of CAD s/p CABG, HTN, CKD, DM2, and HLD who presented to the ED after a syncopal episode while getting out of bed this morning. No prodromal symptoms. No chest pain, palpitations, or shortness of breath. No head trauma. Vital signs notable for BP 110/70, HR 58, RR 16, O2 sat 97% on RA. Physical exam unremarkable. ECG shows normal sinus rhythm with old LBBB, unchanged from previous. Labs notable for anemia, hypokalemia, and elevated BUN/Cr (baseline). CT head negative for acute pathology. CXR shows cardiomegaly, unchanged. Patient observed for 6 hours with no recurrent symptoms. Potassium repleted. Discharged home with instructions to follow up with cardiologist within 1 week and primary care within 3 days.',
    followUpRequired: true,
    followUpReason: 'Abnormal lab results: Anemia, Hypokalemia, Elevated BUN/Cr; Abnormal imaging: Cardiomegaly',
    followUpStatus: 'notstarted'
  }
];

/**
 * Get all patients
 * @returns {Array} - Array of patient objects
 */
const getAllPatients = () => {
  console.log('getAllPatients called, returning:', patients.length, 'patients');
  return patients;
};

/**
 * Get a patient by ID
 * @param {string} id - The patient ID to search for
 * @returns {Object|null} - The patient object or null if not found
 */
const getPatientById = (id) => {
  console.log('getPatientById called with id:', id);
  const patient = patients.find(patient => patient.id === id) || null;
  console.log('Found patient:', patient ? 'yes' : 'no');
  return patient;
};

/**
 * Get patients with abnormal results that require follow-up
 * @returns {Array} - Array of patient objects with abnormal results
 */
const getPatientsRequiringFollowUp = () => {
  console.log('getPatientsRequiringFollowUp called');
  const followUpPatients = patients.filter(patient => patient.followUpRequired);
  console.log('Found', followUpPatients.length, 'patients requiring follow-up');
  console.log('First patient example:', followUpPatients[0]);
  return followUpPatients;
};

/**
 * Update a patient's follow-up status
 * @param {string} id - The patient ID to update
 * @param {string} status - The new follow-up status ('pending', 'in-progress', 'completed')
 * @returns {Object|null} - The updated patient object or null if not found
 */
const updatePatientFollowUpStatus = (id, status) => {
  console.log('updatePatientFollowUpStatus called with id:', id, 'status:', status);
  const patientIndex = patients.findIndex(patient => patient.id === id);
  if (patientIndex === -1) {
    console.log('Patient not found');
    return null;
  }
  
  patients[patientIndex].followUpStatus = status;
  console.log('Patient status updated');
  return patients[patientIndex];
};

module.exports = {
  getAllPatients,
  getPatientById,
  getPatientsRequiringFollowUp,
  updatePatientFollowUpStatus
};

// Note: In a real application, you would:
// 1. Connect to a real EHR system like Epic using their API
// 2. Implement proper data transformation from the EHR format to your application format
// 3. Add caching mechanisms to improve performance
// 4. Implement error handling for API failures
// 5. Add logging for audit purposes 