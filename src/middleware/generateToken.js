const jwt = require('jsonwebtoken');

// Define payload
const payload = { userId: 'emmyajaks' };

// Define secret key
const secretKey = 'emmyajaks2016';

// Generate token
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// Output token
console.log(token);