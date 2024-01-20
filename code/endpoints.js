// endpoints.js
// const router = require('./routes');
const mysql = require('mysql2');
const express = require('express');
const multer = require('multer');
const { pool, databaseConfig, databaseConnectionString } = require('./db');


const app = express();
const upload = multer();

app.use(express.json());

////////////////////////////////////

const router = express.Router();

// Define an endpoint specific to 'endpoints.js'
router.get('/users', (req, res) => {
  res.json({ message: 'This is an endpoints.js specific endpoint for users' });
});

module.exports = router;
/////////////////////////////////

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();

// Define an endpoint handler for /url
app.get('/url', (req, res) => {
    res.json({ names: ['Alice', 'Bob', 'Charlie'] });
});

module.exports = app;
