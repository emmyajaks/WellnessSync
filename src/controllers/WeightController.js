// src/controllers/WeightController.js
const Weight = require('../models/Weight');

// GET all weights
exports.getAllWeights = async (req, res) => {
  try {
    const weights = await Weight.find();
    res.json(weights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET weight by ID
exports.getWeightById = async (req, res) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (weight) {
      res.json(weight);
    } else {
      res.status(404).json({ message: 'Weight not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new weight
exports.createWeight = async (req, res) => {
  const weight = new Weight({
    value: req.body.value,
    // Add other fields as needed...
  });

  try {
    const newWeight = await weight.save();
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update weight by ID
exports.updateWeight = async (req, res) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (weight) {
      weight.value = req.body.value || weight.value;
      // Update other fields as needed...

      const updatedWeight = await weight.save();
      res.json(updatedWeight);
    } else {
      res.status(404).json({ message: 'Weight not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE weight by ID
exports.deleteWeight = async (req, res) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (weight) {
      await weight.remove();
      res.json({ message: 'Weight deleted' });
    } else {
      res.status(404).json({ message: 'Weight not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};