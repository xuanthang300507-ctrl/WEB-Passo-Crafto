const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✓ MongoDB Connected');
}).catch(err => {
    console.error('✗ MongoDB Connection Error:', err);
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/achievements', achievementRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running', timestamp: new Date() });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Documentation: http://localhost:${PORT}/api/docs\n`);
});

module.exports = app;
