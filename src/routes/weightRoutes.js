// projectwellness/src/routes/weightRoutes.js
const express = require('express');
const router = express.Router();
const Weight = require('../../src/models/Weight');

// Create a new weight record
router.post('/', async (req, res) => {
  try {
    const weightRecord = await Weight.create(req.body);
    res.status(201).json(weightRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all weight records
router.get('/', async (req, res) => {
  try {
    const weightRecords = await Weight.find();
    res.json(weightRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific weight record
router.get('/:id', getWeightRecord, (req, res) => {
  res.json(res.weightRecord);
});

// Update a weight record
router.put('/:id', getWeightRecord, async (req, res) => {
  try {
    const updatedWeightRecord = await res.weightRecord.set(req.body).save();
    res.json(updatedWeightRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a weight record
router.delete('/:id', getWeightRecord, async (req, res) => {
  try {
    await res.weightRecord.remove();
    res.json({ message: 'Weight record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a weight record by ID
async function getWeightRecord(req, res, next) {
  let weightRecord;
  try {
    weightRecord = await Weight.findById(req.params.id);
    if (weightRecord == null) {
      return res.status(404).json({ message: 'Cannot find weight record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.weightRecord = weightRecord;
  next();
}

module.exports = router;