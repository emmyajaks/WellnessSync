// src/controllers/BloodPressureController.js
const BloodPressure = require('../models/BloodPressure');

// GET all blood pressure records
exports.getAllBloodPressure = async (req, res) => {
  try {
    const bloodPressureRecords = await BloodPressure.find();
    res.json(bloodPressureRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET blood pressure record by ID
exports.getBloodPressureById = async (req, res) => {
  try {
    const bloodPressureRecord = await BloodPressure.findById(req.params.id);
    if (bloodPressureRecord) {
      res.json(bloodPressureRecord);
    } else {
      res.status(404).json({ message: 'Blood pressure record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new blood pressure record
exports.createBloodPressure = async (req, res) => {
  const bloodPressure = new BloodPressure({
    userId: req.body.userId,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    // Add other fields as needed...
  });

  try {
    const newBloodPressure = await bloodPressure.save();
    res.status(201).json(newBloodPressure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update blood pressure record by ID
exports.updateBloodPressure = async (req, res) => {
  try {
    const bloodPressure = await BloodPressure.findById(req.params.id);
    if (bloodPressure) {
      bloodPressure.systolic = req.body.systolic || bloodPressure.systolic;
      bloodPressure.diastolic = req.body.diastolic || bloodPressure.diastolic;
      // Update other fields as needed...

      const updatedBloodPressure = await bloodPressure.save();
      res.json(updatedBloodPressure);
    } else {
      res.status(404).json({ message: 'Blood pressure record not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE blood pressure record by ID
exports.deleteBloodPressure = async (req, res) => {
  try {
    const bloodPressure = await BloodPressure.findById(req.params.id);
    if (bloodPressure) {
      await bloodPressure.remove();
      res.json({ message: 'Blood pressure record deleted' });
    } else {
      res.status(404).json({ message: 'Blood pressure record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};