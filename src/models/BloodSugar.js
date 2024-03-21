// models/BloodSugar.js
const mongoose = require('mongoose');

const bloodSugarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const BloodSugar = mongoose.model('BloodSugar', bloodSugarSchema);

module.exports = BloodSugar;