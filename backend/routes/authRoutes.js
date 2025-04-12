const express = require('express');
const { createUser, authenticateUser } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    await createUser(email, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: 'Invalid credentials', error: err.message });
  }
});

module.exports = router;
