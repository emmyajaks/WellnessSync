// src/controllers/BloodSugarController.js
const BloodSugar = require('../models/BloodSugar');

// GET all blood sugar records
exports.getAllBloodSugar = async (req, res) => {
  try {
    const bloodSugarRecords = await BloodSugar.find();
    res.json(bloodSugarRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET blood sugar record by ID
exports.getBloodSugarById = async (req, res) => {
  try {
    const bloodSugarRecord = await BloodSugar.findById(req.params.id);
    if (bloodSugarRecord) {
      res.json(bloodSugarRecord);
    } else {
      res.status(404).json({ message: 'Blood sugar record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new blood sugar record
exports.createBloodSugar = async (req, res) => {
  const bloodSugar = new BloodSugar({
    userId: req.body.userId,
    value: req.body.value,
    // Add other fields as needed...
  });

  try {
    const newBloodSugar = await bloodSugar.save();
    res.status(201).json(newBloodSugar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update blood sugar record by ID
exports.updateBloodSugar = async (req, res) => {
  try {
    const bloodSugar = await BloodSugar.findById(req.params.id);
    if (bloodSugar) {
      bloodSugar.value = req.body.value || bloodSugar.value;
      // Update other fields as needed...

      const updatedBloodSugar = await bloodSugar.save();
      res.json(updatedBloodSugar);
    } else {
      res.status(404).json({ message: 'Blood sugar record not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE blood sugar record by ID
exports.deleteBloodSugar = async (req, res) => {
  try {
    const bloodSugar = await BloodSugar.findById(req.params.id);
    if (bloodSugar) {
      await bloodSugar.remove();
      res.json({ message: 'Blood sugar record deleted' });
    } else {
      res.status(404).json({ message: 'Blood sugar record not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};