// models/Weight.js
const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  user: {
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

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;