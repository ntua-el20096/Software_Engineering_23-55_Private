const express = require('express');
const multer = require('multer');
const { pool } = require('./db');  // Import the pool from db.js

const router = express.Router();
const upload = multer();  // If you're using multer for file uploads

// Middleware for JSON parsing
router.use(express.json());

// Endpoint for getting user data
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.promise().query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add other CRUD endpoints here (POST, PUT, DELETE) similar to the example

// Example endpoint using Multer for file uploads (if needed)
router.post('/upload', upload.single('file'), (req, res) => {
  // Handle the file from req.file
  res.json({ message: 'File uploaded successfully' });
});

module.exports = router;
