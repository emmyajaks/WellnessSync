// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://emmyajaks:BAxfLW2n1zonNGrq@cluster1.jcnsbqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Route to handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Weight Tracking App!');
});

// Routes
const userRoutes = require('./routes/userRoutes');
const weightRoutes = require('./routes/weightRoutes');
const bloodPressureRoutes = require('./routes/bloodPressureRoutes');
const bloodSugarRoutes = require('./routes/bloodSugarRoutes'); // Include blood sugar routes

app.use('/api/users', userRoutes);
app.use('/api/weights', weightRoutes);
app.use('/api/bloodpressure', bloodPressureRoutes);
app.use('/api/bloodsugar', bloodSugarRoutes); // Mount blood sugar routes

// Define other routes and middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

