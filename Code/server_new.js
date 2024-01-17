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

const upload = multer();

app.use(express.json());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// Define an endpoint handler for /admin/upload/titlebasics
app.post('/admin/upload/titlebasics', upload.single('truncated_title.basics'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    return res.json(response);
  } //checks that it has a file in the body


  const filePath = fileData.path; 

  // const rawData = require('fs').readFileSync(filePath, 'utf-8');
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  // console.log(rows);

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);


  // connection.query('INSERT INTO `title_basics` (title_id, title_type, title_primaryTitle, title_originalTitle, title_isAdult, title_startYear, title_endYear, title_runtimeMinutes, title_genre, title_posterURL) VALUES ?', [rows], (error, results) => {    

  // Insert data into the 'titlebasics' table
  connection.query('INSERT INTO title_basics (title_id, title_type, title_primaryTitle, title_originalTitle, title_isAdult, title_startYear, title_endYear, title_runtimeMinutes, title_genre, title_posterURL) VALUES ? ON DUPLICATE KEY UPDATE title_id = VALUES(title_id), title_type = VALUES(title_type), title_primaryTitle = VALUES(title_primaryTitle), title_originalTitle = VALUES(title_originalTitle), title_isAdult = VALUES(title_isAdult), title_startYear = VALUES(title_startYear), title_endYear = VALUES(title_endYear), title_runtimeMinutes = VALUES(title_runtimeMinutes), title_genre = VALUES(title_genre), title_posterURL = VALUES(title_posterURL)', [rows], (error, results) => {    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      res.json(response);
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      res.json(response);
    }


    // Close the database connection after the insertion
    connection.end();
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

