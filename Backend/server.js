// server.js - MERN backend setup

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Load .env explicitly

console.log('Loaded MONGO_URI:', process.env.MONGO_URI); // Debug: should print your Mongo URI

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // Allow frontend URL
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
