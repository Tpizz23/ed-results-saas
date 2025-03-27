// Mock patient data for development purposes
// In a real application, this would be fetched from an API connected to the EHR system

const patients = [
  {
    id: 'P001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1978-05-12',
    gender: 'Male',
    mrn: '12345678',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, CA 94321',
    insurance: 'Blue Cross Blue Shield',
    pcp: 'Dr. Sarah Johnson',
    lastEdVisit: '2023-06-15T14:30:00',
    chiefComplaint: 'Chest pain',
    diagnosis: 'Acute coronary syndrome',
    disposition: 'Discharged',
    followUpStatus: 'Pending',
    followUpNotes: '',
    pastMedicalHistory: [
      'Hypertension',
      'Type 2 Diabetes',
      'Hyperlipidemia'
    ],
    medications: [
      'Lisinopril 10mg daily',
      'Metformin 500mg twice daily',
      'Atorvastatin 20mg daily'
    ],
    allergies: [
      'Penicillin - Rash',
      'Sulfa drugs - Anaphylaxis'
    ],
    labResults: [
      {
        id: 'L001',
        name: 'Troponin I',
        value: '0.15',
        unit: 'ng/mL',
        referenceRange: '0.00-0.04',
        collectedAt: '2023-06-15T15:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Critical'
      },
      {
        id: 'L002',
        name: 'CK-MB',
        value: '12.5',
        unit: 'ng/mL',
        referenceRange: '0.0-7.0',
        collectedAt: '2023-06-15T15:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      },
      {
        id: 'L003',
        name: 'BNP',
        value: '450',
        unit: 'pg/mL',
        referenceRange: '0-100',
        collectedAt: '2023-06-15T15:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      },
      {
        id: 'L004',
        name: 'Sodium',
        value: '138',
        unit: 'mmol/L',
        referenceRange: '135-145',
        collectedAt: '2023-06-15T15:00:00',
        status: 'Final',
        isAbnormal: false,
        severity: 'Normal'
      }
    ],
    imagingResults: [
      {
        id: 'I001',
        type: 'Chest X-ray',
        findings: 'Mild cardiomegaly. No acute pulmonary process.',
        impression: 'Mild cardiomegaly, likely chronic.',
        performedAt: '2023-06-15T16:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Low'
      },
      {
        id: 'I002',
        type: 'ECG',
        findings: 'Sinus rhythm with ST-segment depression in leads V3-V6.',
        impression: 'Findings consistent with myocardial ischemia.',
        performedAt: '2023-06-15T14:45:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      }
    ],
    edNotes: 'Patient presented with substernal chest pain radiating to left arm. Pain began 2 hours prior to arrival. Given aspirin 325mg, nitroglycerin with relief. Troponin elevated. Patient counseled on diagnosis and importance of cardiology follow-up.'
  },
  {
    id: 'P002',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1985-09-23',
    gender: 'Female',
    mrn: '87654321',
    phone: '(555) 987-6543',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Somewhere, NY 10001',
    insurance: 'Aetna',
    pcp: 'Dr. Michael Chen',
    lastEdVisit: '2023-06-14T10:15:00',
    chiefComplaint: 'Abdominal pain',
    diagnosis: 'Acute appendicitis',
    disposition: 'Admitted',
    followUpStatus: 'Completed',
    followUpNotes: 'Patient admitted for appendectomy. Surgery successful. Follow-up with surgeon in 2 weeks.',
    pastMedicalHistory: [
      'Asthma',
      'Anxiety'
    ],
    medications: [
      'Albuterol inhaler PRN',
      'Sertraline 50mg daily'
    ],
    allergies: [
      'Latex - Rash'
    ],
    labResults: [
      {
        id: 'L005',
        name: 'WBC',
        value: '15.6',
        unit: 'K/uL',
        referenceRange: '4.5-11.0',
        collectedAt: '2023-06-14T10:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      },
      {
        id: 'L006',
        name: 'CRP',
        value: '45',
        unit: 'mg/L',
        referenceRange: '0.0-8.0',
        collectedAt: '2023-06-14T10:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      }
    ],
    imagingResults: [
      {
        id: 'I003',
        type: 'CT Abdomen/Pelvis',
        findings: 'Enlarged appendix measuring 12mm with surrounding inflammatory changes. No evidence of perforation.',
        impression: 'Acute appendicitis without perforation.',
        performedAt: '2023-06-14T11:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      }
    ],
    edNotes: 'Patient presented with RLQ abdominal pain, nausea, and low-grade fever. CT confirmed appendicitis. Surgery consulted and patient admitted for appendectomy.'
  },
  {
    id: 'P003',
    firstName: 'Robert',
    lastName: 'Johnson',
    dateOfBirth: '1962-03-18',
    gender: 'Male',
    mrn: '23456789',
    phone: '(555) 234-5678',
    email: 'robert.johnson@example.com',
    address: '789 Pine St, Elsewhere, TX 75001',
    insurance: 'Medicare',
    pcp: 'Dr. Lisa Wong',
    lastEdVisit: '2023-06-16T08:45:00',
    chiefComplaint: 'Shortness of breath',
    diagnosis: 'Community-acquired pneumonia',
    disposition: 'Discharged',
    followUpStatus: 'Pending',
    followUpNotes: '',
    pastMedicalHistory: [
      'COPD',
      'Coronary artery disease',
      'Hypertension'
    ],
    medications: [
      'Symbicort 160/4.5 twice daily',
      'Lisinopril 20mg daily',
      'Aspirin 81mg daily',
      'Atorvastatin 40mg daily'
    ],
    allergies: [
      'Codeine - Nausea'
    ],
    labResults: [
      {
        id: 'L007',
        name: 'WBC',
        value: '14.2',
        unit: 'K/uL',
        referenceRange: '4.5-11.0',
        collectedAt: '2023-06-16T09:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Moderate'
      },
      {
        id: 'L008',
        name: 'Procalcitonin',
        value: '0.75',
        unit: 'ng/mL',
        referenceRange: '0.00-0.25',
        collectedAt: '2023-06-16T09:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Moderate'
      }
    ],
    imagingResults: [
      {
        id: 'I004',
        type: 'Chest X-ray',
        findings: 'Right lower lobe consolidation consistent with pneumonia. No pleural effusion.',
        impression: 'Right lower lobe pneumonia.',
        performedAt: '2023-06-16T09:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Moderate'
      }
    ],
    edNotes: 'Patient presented with 3 days of cough, fever, and progressive shortness of breath. CXR showed RLL pneumonia. Started on azithromycin and amoxicillin/clavulanate. Patient stable for discharge with close follow-up.'
  },
  {
    id: 'P004',
    firstName: 'Maria',
    lastName: 'Garcia',
    dateOfBirth: '1990-11-05',
    gender: 'Female',
    mrn: '34567890',
    phone: '(555) 345-6789',
    email: 'maria.garcia@example.com',
    address: '101 Cedar Ln, Nowhere, FL 33101',
    insurance: 'United Healthcare',
    pcp: 'Dr. James Wilson',
    lastEdVisit: '2023-06-17T19:20:00',
    chiefComplaint: 'Headache',
    diagnosis: 'Migraine',
    disposition: 'Discharged',
    followUpStatus: 'Pending',
    followUpNotes: '',
    pastMedicalHistory: [
      'Migraine',
      'Depression'
    ],
    medications: [
      'Sumatriptan PRN',
      'Fluoxetine 20mg daily'
    ],
    allergies: [
      'No known allergies'
    ],
    labResults: [
      {
        id: 'L009',
        name: 'CBC',
        value: 'Within normal limits',
        unit: '',
        referenceRange: '',
        collectedAt: '2023-06-17T19:40:00',
        status: 'Final',
        isAbnormal: false,
        severity: 'Normal'
      },
      {
        id: 'L010',
        name: 'Basic Metabolic Panel',
        value: 'Within normal limits',
        unit: '',
        referenceRange: '',
        collectedAt: '2023-06-17T19:40:00',
        status: 'Final',
        isAbnormal: false,
        severity: 'Normal'
      }
    ],
    imagingResults: [
      {
        id: 'I005',
        type: 'CT Head',
        findings: 'No acute intracranial abnormality. No mass, hemorrhage, or infarct.',
        impression: 'Normal CT of the head.',
        performedAt: '2023-06-17T20:15:00',
        status: 'Final',
        isAbnormal: false,
        severity: 'Normal'
      }
    ],
    edNotes: 'Patient presented with severe headache, photophobia, and nausea. History consistent with migraine. CT head normal. Treated with IV fluids, metoclopramide, and ketorolac with good relief. Discharged with outpatient follow-up.'
  },
  {
    id: 'P005',
    firstName: 'William',
    lastName: 'Brown',
    dateOfBirth: '1955-07-30',
    gender: 'Male',
    mrn: '45678901',
    phone: '(555) 456-7890',
    email: 'william.brown@example.com',
    address: '202 Maple Dr, Someplace, IL 60601',
    insurance: 'Cigna',
    pcp: 'Dr. Emily Taylor',
    lastEdVisit: '2023-06-18T03:10:00',
    chiefComplaint: 'Fever and cough',
    diagnosis: 'COVID-19',
    disposition: 'Discharged',
    followUpStatus: 'Pending',
    followUpNotes: '',
    pastMedicalHistory: [
      'Hypertension',
      'Obesity'
    ],
    medications: [
      'Lisinopril 10mg daily'
    ],
    allergies: [
      'No known allergies'
    ],
    labResults: [
      {
        id: 'L011',
        name: 'COVID-19 PCR',
        value: 'Positive',
        unit: '',
        referenceRange: 'Negative',
        collectedAt: '2023-06-18T03:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'High'
      },
      {
        id: 'L012',
        name: 'D-dimer',
        value: '0.8',
        unit: 'mg/L FEU',
        referenceRange: '0.0-0.5',
        collectedAt: '2023-06-18T03:30:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Low'
      }
    ],
    imagingResults: [
      {
        id: 'I006',
        type: 'Chest X-ray',
        findings: 'Patchy bilateral peripheral opacities in the lower lobes.',
        impression: 'Findings consistent with viral pneumonia, including COVID-19.',
        performedAt: '2023-06-18T04:00:00',
        status: 'Final',
        isAbnormal: true,
        severity: 'Moderate'
      }
    ],
    edNotes: 'Patient presented with 5 days of fever, cough, and fatigue. COVID-19 test positive. Oxygen saturation 94% on room air. Treated with IV fluids and discharged with isolation instructions and close follow-up.'
  }
];

export default patients; 