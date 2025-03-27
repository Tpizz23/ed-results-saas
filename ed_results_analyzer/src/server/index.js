const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { handleN8nWebhook } = require('../services/webhookHandlerService');

const app = express();
const port = process.env.PORT || 5679;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Webhook endpoint for n8n
app.post('/api/webhook/n8n', async (req, res) => {
  try {
    const webhookData = req.body;
    console.log('Received webhook data from n8n:', webhookData);
    
    await handleN8nWebhook(webhookData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 