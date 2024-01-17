//what does this code do? 
//executes the endpoints 1-8
//working on endpoint 9

const mysql = require('mysql2');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

const port = 8765;

// Simulated database connection string
const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntuaflix'
};

const databaseConnectionString = JSON.stringify(databaseConfig);

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define an endpoint handler for /url
app.get('/url', (req, res) => {
  res.json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
});

// Define an endpoint handler for /admin/healthcheck
app.get('/admin/healthcheck', (req, res) => {
  // Simulate the database connectivity check
  const connection = mysql.createConnection(databaseConfig);

  connection.connect((error) => {
    if (error) {
      // Build the response JSON object for failure
      const response = {
        status: 'failed',
        dataconnection: [databaseConnectionString]
      };
      res.json(response);
    } else {
      // Build the response JSON object for success
      const response = {
        status: 'OK',
        dataconnection: [databaseConnectionString]
      };
      res.json(response);

      // Close the database connection after the check
      connection.end();
    }
  });
});

// Define an endpoint handler for /admin/upload/titlebasics
app.post('/admin/upload/titlebasics', upload.single('truncated_title.basics'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform database operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/upload/titleakas
app.post('/admin/upload/titleakas', upload.single('truncated_title.akas'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/upload/namebasics
app.post('/admin/upload/namebasics', upload.single('truncated_name.basics'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/upload/titlecrew
app.post('/admin/upload/titlecrew', upload.single('truncated_title.crew'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/upload/titleepisode
app.post('/admin/upload/titleepisode', upload.single('truncated_title.episode'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/upload/titleprincipals
app.post('/admin/upload/titleprincipals', upload.single('truncated_title.principals'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});


// Define an endpoint handler for /admin/upload/titleratings
app.post('/admin/upload/titleratings', upload.single('truncated_title.ratings'), (req, res) => {
  // Assuming 'file' is the field name for the uploaded file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Assuming the uploaded file is in TSV format
  const fileContents = file.buffer.toString('utf8');

  // Process the TSV file contents here
  // You can parse the TSV and perform any necessary operations
  
  // For demonstration purposes, let's log the file contents
  console.log(fileContents);

  // Respond with a success message
  res.json({ status: 'OK', message: 'File uploaded successfully' });
});

// Define an endpoint handler for /admin/resetall
app.post('/admin/resetall', (req, res) => {
  // Perform the logic to reset all data in ntuaflix's NW
  // You can implement the necessary operations to reset data

  try {
    // Your reset logic goes here

    // For demonstration purposes, let's assume resetting is successful
    const response = {
      status: 'OK',
    };

    res.json(response);
  } catch (error) {
    // If an error occurs during the reset operation
    const response = {
      status: 'failed',
      reason: error.message, // Provide the specific reason for failure
    };

    res.status(500).json(response);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
