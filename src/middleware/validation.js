// middleware/validation.js

// Function to validate user data
function validateUserData(req, res, next) {
  const { username, email, password } = req.body;
  
  // Check if required fields are present
  if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  // Add additional validation logic as needed
  
  // If validation passes, proceed to the next middleware
  next();
}

module.exports = { validateUserData };