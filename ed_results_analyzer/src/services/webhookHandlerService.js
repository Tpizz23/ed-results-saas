const { updatePatientFollowUpStatusWithPuppeteer } = require('./puppeteerService');

/**
 * Handles incoming webhook requests from n8n
 * @param {Object} webhookData - The data received from n8n
 * @returns {Promise<boolean>} - Returns true if automation was successful
 */
const handleN8nWebhook = async (webhookData) => {
  try {
    const {
      patientId,
      followUpNotes,
      automationAction
    } = webhookData;

    console.log('Processing webhook data:', {
      patientId,
      followUpNotes,
      automationAction
    });

    // Validate required fields
    if (!patientId || !automationAction) {
      throw new Error('Missing required fields: patientId and automationAction are required');
    }

    // Handle different automation actions
    switch (automationAction) {
      case 'completeFollowUp':
        await updatePatientFollowUpStatusWithPuppeteer(
          patientId,
          'completed',
          followUpNotes || 'Follow-up completed via n8n automation'
        );
        break;

      case 'updateStatus':
        const { newStatus } = webhookData;
        if (!newStatus) {
          throw new Error('newStatus is required for updateStatus action');
        }
        await updatePatientFollowUpStatusWithPuppeteer(
          patientId,
          newStatus,
          followUpNotes || `Follow-up status updated to ${newStatus} via n8n automation`
        );
        break;

      default:
        throw new Error(`Unknown automation action: ${automationAction}`);
    }

    return true;
  } catch (error) {
    console.error('Error handling n8n webhook:', error);
    throw error;
  }
};

module.exports = { handleN8nWebhook }; 