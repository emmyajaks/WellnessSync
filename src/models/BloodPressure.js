// models/BloodPressure.js
const mongoose = require('mongoose');

const bloodPressureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  systolic: {
    type: Number,
    required: true
  },
  diastolic: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const BloodPressure = mongoose.model('BloodPressure', bloodPressureSchema);

module.exports = BloodPressure;