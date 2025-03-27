// Simple empty service since n8n webhook functionality is being removed

import { updateFollowUpStatus } from './patientService';

class WebhookService {
  constructor() {
    this.messageListeners = new Set();
    this.patientMessages = new Map();
  }

  async sendToN8N(patient) {
    if (!patient || !patient.patientId) {
      console.error('Invalid patient data:', patient);
      throw new Error('Invalid patient data - missing patient ID');
    }

    console.log('Preparing to send patient data to N8N:', {
      patientId: patient.patientId,
      name: patient.name,
      status: patient.followUp?.status
    });

    try {
      // Prepare the complete payload for N8N
      const timestamp = new Date().toISOString();
      const payload = {
        patientId: patient.patientId,
        name: patient.name || '',
        dob: patient.dob || '',
        followUp: {
          status: patient.followUp?.status || 'pending',
          required: patient.followUp?.required || true,
          reason: patient.followUp?.reason || patient.chiefComplaint || '',
          instructions: patient.followUp?.instructions || '',
          provider: patient.followUp?.provider || '',
          date: patient.followUp?.date || timestamp
        },
        chiefComplaint: patient.chiefComplaint || '',
        labResults: patient.labResults || [],
        imagingResults: patient.imagingResults || [],
        lastEDNote: patient.lastEDNote || '',
        timestamp: timestamp
      };

      console.log('Sending webhook request with payload:', JSON.stringify(payload, null, 2));

      const response = await fetch('http://localhost:5678/webhook-test/426a960d-dab8-44b7-984d-e65bc5aa1ca3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Webhook response status:', response.status);
      const responseText = await response.text();
      console.log('Webhook raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to send data to N8N: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        // Try to parse as JSON first
        data = JSON.parse(responseText);
        // If the response contains MessageHTML, extract it properly
        if (typeof data === 'string' && data.includes('MessageHTML')) {
          try {
            data = JSON.parse(data);
          } catch (e) {
            // If nested parsing fails, use the original data
            console.log('Failed to parse nested JSON:', e);
          }
        }
      } catch (e) {
        console.log('Response was not JSON, using text response');
        data = { 
          message: responseText || `Follow-up request initiated for ${patient.name}`,
          status: 'pending'
        };
      }

      const messageData = {
        message: data.MessageHTML || data.message || responseText || `Follow-up request initiated for ${patient.name}`,
        status: data.status || patient.followUp?.status || 'pending',
        timestamp: timestamp
      };

      console.log('Successfully processed webhook response:', messageData);
      await this.handleN8NResponse(patient.patientId, messageData);
      return messageData;
    } catch (error) {
      console.error('Error in webhook flow:', error);
      const timestamp = new Date().toISOString();
      const errorData = { 
        message: `Error processing follow-up request: ${error.message}`,
        error: error.message,
        status: 'error',
        timestamp: timestamp
      };
      await this.handleN8NResponse(patient.patientId, errorData);
      throw error;
    }
  }

  async handleN8NResponse(patientId, data) {
    console.log('Handling N8N response for patient:', patientId, data);
    
    // Store the complete message data with formatted message
    const messageData = {
      message: data.error ? 
        `Error: ${data.error}` : 
        data.message || 'Follow-up request processed successfully',
      status: data.status || 'pending',
      timestamp: data.timestamp || new Date().toISOString()
    };

    // Update the patient's follow-up status to "Complete" if the webhook was successful
    if (!data.error && data.status !== 'error') {
      try {
        await updateFollowUpStatus(patientId, 'complete');
        messageData.status = 'complete';
      } catch (error) {
        console.error('Error updating patient follow-up status:', error);
      }
    }

    this.patientMessages.set(patientId, messageData);
    console.log('Stored message data:', messageData);
    
    // Notify all listeners of the new message
    this.notifyMessageListeners(patientId);
  }

  addMessageListener(listener) {
    console.log('Adding new message listener');
    this.messageListeners.add(listener);
    return () => {
      console.log('Removing message listener');
      this.messageListeners.delete(listener);
    };
  }

  notifyMessageListeners(patientId) {
    const messageData = this.patientMessages.get(patientId);
    if (!messageData) return;

    console.log('Notifying listeners for patient:', patientId, 'Message data:', messageData);
    console.log('Number of listeners:', this.messageListeners.size);
    
    this.messageListeners.forEach(listener => {
      try {
        listener(patientId, messageData.message, messageData.timestamp);
      } catch (error) {
        console.error('Error in message listener:', error);
      }
    });
  }

  getPatientMessage(patientId) {
    const messageData = this.patientMessages.get(patientId);
    console.log('Getting message for patient:', patientId, 'Message data:', messageData);
    return messageData || { message: '', timestamp: null };
  }
}

const webhookService = new WebhookService();
export default webhookService; 