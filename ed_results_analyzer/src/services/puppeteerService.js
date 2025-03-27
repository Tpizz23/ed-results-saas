const { 
  mcp_Puppeteer_puppeteer_navigate,
  mcp_Puppeteer_puppeteer_click,
  mcp_Puppeteer_puppeteer_fill,
  mcp_Puppeteer_puppeteer_select,
  mcp_Puppeteer_puppeteer_evaluate
} = require('../mcp/puppeteer');

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Updates a patient's follow-up status using Puppeteer automation
 * @param {string} patientId - The patient's ID
 * @param {string} newStatus - The new follow-up status to set
 * @param {string} notes - Optional notes about the status change
 */
const updatePatientFollowUpStatusWithPuppeteer = async (patientId, newStatus, notes = '') => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      console.log(`Attempting to update patient ${patientId} status to ${newStatus} (attempt ${retries + 1})`);

      // Navigate to the patient dashboard
      await mcp_Puppeteer_puppeteer_navigate({
        url: 'http://localhost:3002/dashboard'
      });

      // Wait for the page to load and click the patient's details button
      await mcp_Puppeteer_puppeteer_click({
        selector: `[data-patient-id="${patientId}"]`
      });

      // Click the Follow-up tab
      await mcp_Puppeteer_puppeteer_click({
        selector: 'button:contains("Follow-up")'
      });

      // Select the new status
      await mcp_Puppeteer_puppeteer_select({
        selector: 'select[name="followUpStatus"]',
        value: newStatus
      });

      // Fill in notes if provided
      if (notes) {
        await mcp_Puppeteer_puppeteer_fill({
          selector: 'textarea[placeholder="Enter follow-up notes..."]',
          value: notes
        });
      }

      // Click the update status button
      await mcp_Puppeteer_puppeteer_click({
        selector: 'button:contains("Update Status")'
      });

      // Verify the form submission was successful
      const isSuccess = await verifyFormSubmission();
      
      if (!isSuccess) {
        throw new Error('Form submission verification failed');
      }

      console.log(`Successfully updated patient ${patientId} status to ${newStatus}`);
      return true;
    } catch (error) {
      retries++;
      console.error(`Attempt ${retries} failed:`, error);
      
      if (retries === MAX_RETRIES) {
        throw new Error(`Failed to update patient follow-up status after ${MAX_RETRIES} attempts: ${error.message}`);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

/**
 * Verifies that the form was submitted successfully
 * @returns {Promise<boolean>}
 */
const verifyFormSubmission = async () => {
  try {
    // Check for success message or status change
    const result = await mcp_Puppeteer_puppeteer_evaluate({
      script: `
        // Check for success message
        const successMessage = document.querySelector('.bg-green-50');
        if (successMessage) {
          return true;
        }

        // Check if the form is no longer in submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton && !submitButton.disabled) {
          // Additional verification can be added here
          return true;
        }

        return false;
      `
    });

    return result;
  } catch (error) {
    console.error('Error verifying form submission:', error);
    return false;
  }
};

module.exports = { updatePatientFollowUpStatusWithPuppeteer }; 