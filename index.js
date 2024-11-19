const express = require('express');
const bloodBankRoutes = require('./routes/bloodBankRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/bloodbank', bloodBankRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});