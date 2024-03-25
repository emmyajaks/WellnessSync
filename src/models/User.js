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
    type: Number
    // height is no longer required
  },
  weight: {
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
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property to calculate BMI
userSchema.virtual('bmi').get(function() {
  if (this.height && this.weight) {
    const weightInKg = this.weight / 2.205; // Convert weight from pounds to kilograms
    const heightInM = this.height / 39.37; // Convert height from inches to meters
    return weightInKg / (heightInM * heightInM);
  }
  return null; // Return null if height or weight is not provided
});

const User = mongoose.model('User', userSchema);

module.exports = User;