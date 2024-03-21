// src/server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://emmyajaks:dRGcSIXQLRhMeRey@wellness.vng6ost.mongodb.net/projectwellness?retryWrites=true&w=majority', {
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
const userRoutes = require('/home/emmyajaks/projectwellness/src/routes/userRoutes');
const weightRoutes = require('/home/emmyajaks/projectwellness/src/routes/weightRoutes');

app.use('/api/users', userRoutes);
app.use('/api/weights', weightRoutes);

// Define other routes and middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});