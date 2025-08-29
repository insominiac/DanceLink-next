const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Dance Admin API is running!', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
