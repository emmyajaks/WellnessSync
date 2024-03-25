// wellnessproject/src/routes/bloodPressureRoutes.js
const express = require('express');
const router = express.Router();
const BloodPressure = require('../../src/models/BloodPressure');

// Create a new blood pressure record
router.post('/', async (req, res) => {
  try {
    const { userId, systolic, diastolic } = req.body;
    const bloodPressureRecord = await BloodPressure.create({ userId, systolic, diastolic });
    res.status(201).json(bloodPressureRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blood pressure records
router.get('/', async (req, res) => {
  try {
    const bloodPressureRecords = await BloodPressure.find();
    res.json(bloodPressureRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific blood pressure record by ID
router.get('/:id', getBloodPressureRecord, (req, res) => {
  res.json(res.bloodPressureRecord);
});

// Update a specific blood pressure record by ID
router.put('/:id', getBloodPressureRecord, async (req, res) => {
  try {
    const updatedBloodPressureRecord = await res.bloodPressureRecord.set(req.body).save();
    res.json(updatedBloodPressureRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific blood pressure record by ID
router.delete('/:id', getBloodPressureRecord, async (req, res) => {
  try {
    await res.bloodPressureRecord.remove();
    res.json({ message: 'Blood pressure record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a blood pressure record by ID
async function getBloodPressureRecord(req, res, next) {
  let bloodPressureRecord;
  try {
    bloodPressureRecord = await BloodPressure.findById(req.params.id);
    if (bloodPressureRecord == null) {
      return res.status(404).json({ message: 'Cannot find blood pressure record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.bloodPressureRecord = bloodPressureRecord;
  next();
}

module.exports = router;