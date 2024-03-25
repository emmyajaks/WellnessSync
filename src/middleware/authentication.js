// middleware/authentication.js

const jwt = require('jsonwebtoken');

// Middleware to authenticate users
const authenticateUser = (req, res, next) => {
  // Check if user is logged in (e.g., by verifying JWT)
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user data to request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

module.exports = { authenticateUser };