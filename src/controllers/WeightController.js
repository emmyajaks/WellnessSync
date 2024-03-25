// src/controllers/WeightController.js
const Weight = require('../models/Weight');

// Function to calculate BMI
const calculateBMI = (weight, height) => {
  // Convert height to meters
  const heightInMeters = height / 100;
  // Calculate BMI
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

// POST new weight with BMI calculation
exports.createWeight = async (req, res) => {
  const { value, userId, height } = req.body;
  const weight = new Weight({
    value,
    userId,
    date: new Date(),
  });

  try {
    const newWeight = await weight.save();
    // Calculate BMI and add it to the response
    const bmi = calculateBMI(value, height);
    newWeight.bmi = bmi;
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update weight by ID with BMI calculation
exports.updateWeight = async (req, res) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (weight) {
      const { value, height } = req.body;
      weight.value = value || weight.value;
      // Update other fields as needed...

      const updatedWeight = await weight.save();
      // Calculate BMI and add it to the response
      const bmi = calculateBMI(updatedWeight.value, height);
      updatedWeight.bmi = bmi;
      res.json(updatedWeight);
    } else {
      res.status(404).json({ message: 'Weight not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET all weights
exports.getAllWeights = async (req, res) => {
  try {
    const weights = await Weight.find();
    // Calculate BMI for each weight
    const weightsWithBMI = weights.map(weight => {
      const bmi = calculateBMI(weight.value, weight.userId.height);
      return { ...weight.toObject(), bmi };
    });
    res.json(weightsWithBMI);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET weight by ID
exports.getWeightById = async (req, res) => {
  try {
    const weight = await Weight.findById(req.params.id);
    if (weight) {
      // Calculate BMI for the weight
      const bmi = calculateBMI(weight.value, weight.userId.height);
      const weightWithBMI = { ...weight.toObject(), bmi };
      res.json(weightWithBMI);
    } else {
      res.status(404).json({ message: 'Weight not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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