import {
  getAllPatients,
  getPatientById,
  getPatientsRequiringFollowUp,
  updatePatientFollowUpStatus
} from '../api/mock/patients';

/**
 * Get all patients
 * @param {Object} user - The current user
 * @returns {Array} - Array of patient objects
 */
export const fetchAllPatients = (user) => {
  // In a real application, you would filter patients based on user role/permissions
  // For now, we'll return all patients
  return getAllPatients();
};

/**
 * Get a patient by ID
 * @param {string} id - The patient ID to fetch
 * @param {Object} user - The current user
 * @returns {Object|null} - The patient object or null if not found
 */
export const fetchPatientById = (id, user) => {
  // In a real application, you would check if the user has permission to view this patient
  return getPatientById(id);
};

/**
 * Get patients requiring follow-up
 * @param {Object} user - The current user
 * @returns {Array} - Array of patient objects requiring follow-up
 */
export const fetchPatientsRequiringFollowUp = (user) => {
  // In a real application, you would filter patients based on user role/permissions
  return getPatientsRequiringFollowUp();
};

/**
 * Update a patient's follow-up status
 * @param {string} id - The patient ID to update
 * @param {string} status - The new follow-up status
 * @param {Object} user - The current user
 * @returns {Object|null} - The updated patient object or null if not found
 */
export const updateFollowUpStatus = (id, status, user) => {
  // In a real application, you would check if the user has permission to update this patient
  return updatePatientFollowUpStatus(id, status);
};

/**
 * Check if a patient has abnormal lab results
 * @param {Object} patient - The patient object to check
 * @returns {boolean} - Whether the patient has abnormal lab results
 */
export const hasAbnormalLabResults = (patient) => {
  if (!patient || !patient.labResults) return false;
  
  return patient.labResults.some(lab => 
    lab.components && lab.components.some(component => component.isAbnormal)
  );
};

/**
 * Check if a patient has abnormal imaging results
 * @param {Object} patient - The patient object to check
 * @returns {boolean} - Whether the patient has abnormal imaging results
 */
export const hasAbnormalImagingResults = (patient) => {
  if (!patient || !patient.imagingResults) return false;
  
  return patient.imagingResults.some(imaging => imaging.isAbnormal);
};

/**
 * Get all abnormal lab components for a patient
 * @param {Object} patient - The patient object
 * @returns {Array} - Array of abnormal lab components
 */
export const getAbnormalLabComponents = (patient) => {
  if (!patient || !patient.labResults) return [];
  
  const abnormalComponents = [];
  
  patient.labResults.forEach(lab => {
    if (lab.components) {
      lab.components.forEach(component => {
        if (component.isAbnormal) {
          abnormalComponents.push({
            ...component,
            labName: lab.name,
            labId: lab.id,
            resultedAt: lab.resultedAt
          });
        }
      });
    }
  });
  
  return abnormalComponents;
};

/**
 * Get all abnormal imaging results for a patient
 * @param {Object} patient - The patient object
 * @returns {Array} - Array of abnormal imaging results
 */
export const getAbnormalImagingResults = (patient) => {
  if (!patient || !patient.imagingResults) return [];
  
  return patient.imagingResults.filter(imaging => imaging.isAbnormal);
};

/**
 * Format a date string for display
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a date and time string for display
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date and time string
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Note: In a real application, you would:
// 1. Connect to a real EHR API
// 2. Implement proper error handling
// 3. Add caching for performance
// 4. Implement pagination for large datasets
// 5. Add more sophisticated filtering and sorting 