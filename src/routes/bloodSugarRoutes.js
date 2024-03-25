// routes/bloodSugarRoutes.js
const express = require('express');
const router = express.Router();
const BloodSugar = require('../models/BloodSugar');

// Create a new blood sugar record
router.post('/', async (req, res) => {
  try {
    const bloodSugarRecord = await BloodSugar.create(req.body);
    res.status(201).json(bloodSugarRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blood sugar records
router.get('/', async (req, res) => {
  try {
    const bloodSugarRecords = await BloodSugar.find();
    res.json(bloodSugarRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific blood sugar record
router.get('/:id', getBloodSugarRecord, (req, res) => {
  res.json(res.bloodSugarRecord);
});

// Update a blood sugar record
router.put('/:id', getBloodSugarRecord, async (req, res) => {
  try {
    const updatedBloodSugarRecord = await res.bloodSugarRecord.set(req.body).save();
    res.json(updatedBloodSugarRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blood sugar record
router.delete('/:id', getBloodSugarRecord, async (req, res) => {
  try {
    await res.bloodSugarRecord.remove();
    res.json({ message: 'Blood sugar record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a blood sugar record by ID
async function getBloodSugarRecord(req, res, next) {
  let bloodSugarRecord;
  try {
    bloodSugarRecord = await BloodSugar.findById(req.params.id);
    if (bloodSugarRecord == null) {
      return res.status(404).json({ message: 'Cannot find blood sugar record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.bloodSugarRecord = bloodSugarRecord;
  next();
}

module.exports = router;