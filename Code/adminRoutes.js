const express = require('express');
const https = require('https');
const fs = require('fs');
const multer = require('multer');
const pool = require('./database'); // Import the database connection pool

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// const port = 8765;
const baseURL = '/energy/api';

const app = express();



const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002'
};

// Function to reset data in each table
async function resetTable(tableName) {
  const query = `DELETE FROM ${tableName}`;
  await pool.promise().query(query);
}

// Health Check Endpoint
router.get('/healthcheck', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({
        status: 'failed',
        dataconnection: 'Unable to connect to database'
      });
    } else {
      res.json({
        status: 'OK',
        dataconnection: 'Successfully connected to database'
      });
      connection.release();
    }
  });
});

router.get(`${baseURL}/admin/healthcheck`, (req, res) => {
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
router.post(`${baseURL}/admin/upload/titlebasics`, upload.single('truncated_title.basics'), (req, res) => {
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
    connection.query('INSERT INTO title_basics (title_id, title_type, title_primaryTitle, title_originalTitle, title_isAdult, title_startYear, title_endYear, title_runtimeMinutes, title_genre, title_posterURL) VALUES ? ON DUPLICATE KEY UPDATE title_id = VALUES(title_id), title_type = VALUES(title_type), title_primaryTitle = VALUES(title_primaryTitle), title_originalTitle = VALUES(title_originalTitle), title_isAdult = VALUES(title_isAdult), title_startYear = VALUES(title_startYear), title_endYear = VALUES(title_endYear), title_runtimeMinutes = VALUES(title_runtimeMinutes), title_genre = VALUES(title_genre), title_posterURL = VALUES(title_posterURL)', [rows], (error, results) => {    
      if (error) {
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
  

// Define an endpoint handler for /admin/upload/titleakas
router.post(`${baseURL}/admin/upload/titleakas`, upload.single('truncated_title.akas'), (req, res) => {
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
  
    // console.log(rows);
    // Insert data into the 'titleakas' table
    connection.query('INSERT INTO title_AKAs (title_title_id, AKA_ordering, AKA_title, AKA_region, AKA_language, AKA_types, AKA_attributes, AKA_isOriginal) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), AKA_ordering = VALUES(AKA_ordering), AKA_title = VALUES(AKA_title), AKA_region = VALUES(AKA_region), AKA_language = VALUES(AKA_language), AKA_types = VALUES(AKA_types), AKA_attributes = VALUES(AKA_attributes), AKA_isOriginal = VALUES(AKA_isOriginal)', [rows], (error, results) => {    
    // connection.query('INSERT INTO title_akas (title_title_id, AKA_ordering, AKA_title, AKA_region, AKA_language, AKA_types, AKA_attributes, AKA_isOriginal) VALUES ?', [rows], (error, results) => {    
      if (error) {
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

// Define an endpoint handler for /admin/upload/namebasics
router.post(`${baseURL}/admin/upload/namebasics`, upload.single('truncated_name.basics'), (req, res) => {
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
  
    // console.log(rows);
    // Insert data into the 'principal' table
    connection.query(`
    INSERT INTO principal (
      principal_id,
      principal_name,
      principal_birthYr,
      principal_deathYr,
      principal_profession,
      titles_titles_id,
      principal_imageURL
    ) 
    VALUES ? 
    ON DUPLICATE KEY UPDATE 
      principal_id = VALUES(principal_id),
      principal_name = VALUES(principal_name),
      principal_birthYr = VALUES(principal_birthYr),
      principal_deathYr = VALUES(principal_deathYr),
      principal_profession = VALUES(principal_profession),
      titles_titles_id = VALUES(titles_titles_id),
      principal_imageURL = VALUES(principal_imageURL)
  `, [rows], (error, results) => {
      if (error) {
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
  
 // Define an endpoint handler for /admin/upload/titlecrew
router.post(`${baseURL}/admin/upload/titlecrew`, upload.single('truncated_title.crew'), (req, res) => {
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
  
    // console.log(rows);
    
    connection.query('INSERT IGNORE INTO title_crew (title_title_id, principal_directors_id, principal_writers_id) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), principal_directors_id = VALUES(principal_directors_id), principal_writers_id = VALUES(principal_writers_id)', [rows], (error, results) => {
      if (error) {
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

  // Define an endpoint handler for /admin/upload/titleepisode
router.post(`${baseURL}/admin/upload/titleepisode`, upload.single('truncated_title.episode'), (req, res) => {
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
  
    // console.log(rows);
    
    connection.query('INSERT IGNORE INTO title_episode (title_episode_id, title_series_id, title_season_NO, title_episode_NO) VALUES ? ON DUPLICATE KEY UPDATE title_episode_id = VALUES(title_episode_id), title_series_id = VALUES(title_series_id), title_season_NO = VALUES(title_season_NO), title_episode_NO = VALUES(title_episode_NO)', [rows], (error, results) => {    
      if (error) {
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
  
  // Define an endpoint handler for /admin/upload/titleprincipals
router.post(`${baseURL}/admin/upload/titleprincipals`, upload.single('truncated_title.principals'), (req, res) => {
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
  
    // console.log(rows);
    
    connection.query('INSERT INTO title_principals (title_title_id, principal_ordering, principal_principal_id, principal_category, principal_job, principal_character, principal_poster) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), principal_ordering = VALUES(principal_ordering), principal_principal_id = VALUES(principal_principal_id), principal_category = VALUES(principal_category), principal_job = VALUES(principal_job), principal_character = VALUES(principal_character), principal_poster = VALUES(principal_poster)', [rows], (error, results) => {
      if (error) {
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
      // Close the database connection after the insertion
      connection.end();
    });
  });

 // Define an endpoint handler for /admin/upload/titleratings
router.post(`${baseURL}/admin/upload/titleratings`, upload.single('truncated_title.ratings'), (req, res) => {
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
  
    // console.log(rows);
    
    connection.query('INSERT INTO title_ratings (title_title_id, rating_avg, rating_numVotes) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), rating_avg = VALUES(rating_avg), rating_numVotes = VALUES(rating_numVotes)', [rows], (error, results) => {
      if (error) {
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
   
// Reset All Data
router.post('/resetall', async (req, res) => {
  try {
    // List all tables to be reset
    const tables = ['title_episode', 'title_crew', 'title_akas', 'title_principals', 'principal', 'title_ratings', 'title_basics'];

    // Reset each table
    for (const table of tables) {
      await resetTable(table);
    }

    res.json({ status: 'OK', message: 'All tables reset successfully' });
  } catch (error) {
    res.status(500).json({ status: 'failed', message: 'Error resetting tables', error: error.message });
  }
});

// Define an endpoint handler for /admin/resetall
router.post(`${baseURL}/admin/resetall`, async (req, res) => {
    try {
      // Reset data in each table
      
      await resetTable('title_episode');
      await resetTable('title_crew');
      await resetTable('title_akas');
      await resetTable('title_principals');
      await resetTable('principal');
      await resetTable('title_ratings');
      await resetTable('title_basics');
      
  
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
  
  const httpsServer = https.createServer({
    key: httpsOptions.key,
    cert: httpsOptions.cert,
    passphrase: httpsOptions.passphrase 
  }, app);
  
  httpsServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  

module.exports = router;
