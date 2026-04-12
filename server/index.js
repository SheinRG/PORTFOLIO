import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import dns from 'dns';

// Fix for MongoDB Atlas ECONNREFUSED on some systems
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api', apiRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Comic Portfolio API is running! KAPOW!' });
});

// Start server first
app.listen(PORT, () => {
  console.log(`Server is blasting off on port ${PORT}!`);
});

// Database Connection (non-blocking)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('VROOM! Connected to MongoDB successfully.');
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    console.log('Server continues running without DB connection.');
  });
