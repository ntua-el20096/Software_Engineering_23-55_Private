//what does this code do? Connecting to the server which listens 
//on the "http://localhost:8765/" and it connects to the database and 
//executes the healthcheck endpoint

//import express from 'express';
//import mysql from 'mysql2';

const mysql = require('mysql2');

const express = require("express");
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
