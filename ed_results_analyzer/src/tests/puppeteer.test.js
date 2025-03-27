import { updatePatientFollowUpStatusWithPuppeteer } from '../services/puppeteerService';

// Example usage of the Puppeteer automation
const testPuppeteerAutomation = async () => {
  try {
    // Example patient data
    const patientId = 'PATIENT123';
    const newStatus = 'in-progress';
    const notes = 'Follow-up status updated via Puppeteer automation';

    // Update the patient's follow-up status
    await updatePatientFollowUpStatusWithPuppeteer(patientId, newStatus, notes);
    console.log('Successfully updated patient follow-up status');
  } catch (error) {
    console.error('Failed to update patient follow-up status:', error);
  }
};

// Run the test
testPuppeteerAutomation(); 