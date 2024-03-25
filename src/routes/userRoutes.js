// wellnessproject/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../src/models/User');
const { validateUserData } = require('../../src/middleware/validation');

// Create a new user record
router.post('/', validateUserData, async (req, res) => {
  try {
    const userData = req.body;
    const userRecord = await User.create(userData);
    res.status(201).json(userRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user record
router.put('/:id', getUserRecord, async (req, res) => {
  try {
    const userData = req.body;
    const updatedUserRecord = await res.userRecord.set(userData).save();
    res.json(updatedUserRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get a user record by ID
async function getUserRecord(req, res, next) {
  let userRecord;
  try {
    userRecord = await User.findById(req.params.id);
    if (userRecord == null) {
      return res.status(404).json({ message: 'Cannot find user record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.userRecord = userRecord;
  next();
}

module.exports = router;