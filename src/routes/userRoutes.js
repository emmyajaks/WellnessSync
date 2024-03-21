// projectwellness/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../src/models/User');

// Create a new user record
router.post('/', async (req, res) => {
  try {
    const userRecord = await User.create(req.body);
    res.status(201).json(userRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all user records
router.get('/', async (req, res) => {
  try {
    const userRecords = await User.find();
    res.json(userRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific user record
router.get('/:id', getUserRecord, (req, res) => {
  res.json(res.userRecord);
});

// Update a user record
router.put('/:id', getUserRecord, async (req, res) => {
  try {
    const updatedUserRecord = await res.userRecord.set(req.body).save();
    res.json(updatedUserRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user record
router.delete('/:id', getUserRecord, async (req, res) => {
  try {
    await res.userRecord.remove();
    res.json({ message: 'User record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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