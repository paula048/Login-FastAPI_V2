const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
var cors = require('cors')
// Routes
const authRoutes = require('./routes/auth');

dotenv.config();

// Init app
const app = express();

// Connect to database
connectDB();



app.use(cors({  origin: 'http://localhost:5173', 
                credentials: true, 
                methods: ['GET','POST','OPTIONS'], 
                allowedHeaders: ['Content-Type','Authorization'] }));

// Middleware
app.use(express.json());

// Test route (health check)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (opcjonalne, ale zalecane)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
