// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  profilePicture: {
    type: String
  },
  contactInformation: {
    phone: {
      type: String
    },
    address: {
      type: String
    }
  },
  activityLevel: {
    type: String
  },
  healthConditions: {
    type: String
  },
  goals: {
    weightLoss: {
      type: Number
    }
  },
  preferences: {
    dietary: {
      type: String
    }
  },
  lastLogin: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;