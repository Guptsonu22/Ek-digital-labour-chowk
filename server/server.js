require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/employers', require('./routes/employerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/employers', require('./routes/employerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Ek Digital Labour Chowk API is running (Demo Mode)');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`⚠️  Running in In-Memory Demo Mode (No Database)`);
});
