const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sweetsRoutes = require('./routes/sweets');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Sweet Shop Management API',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;