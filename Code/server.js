//what does this code do? Connecting to the server which listens 
//on the "http://localhost:8765/" and it connects to the database and 
//executes the endpoints 1-9, populating the db
//3,5,6 endpoints don't work because of the foreign keys? or not idk
//3. title_akas, 5. title_crew, 6. title_episode

const mysql = require('mysql2');
const express = require('express');
const https = require('https');
const multer = require('multer');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002'
};

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

// Create a MySQL pool
const pool = mysql.createPool(databaseConfig);

// Function to reset data in each table
async function resetTable(tableName) {
  const query = `DELETE FROM ${tableName}`;
  await pool.promise().query(query);
}

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
app.post('/admin/upload/titleakas', upload.single('truncated_title.akas'), (req, res) => {
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
app.post('/admin/upload/namebasics', upload.single('truncated_name.basics'), (req, res) => {
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
app.post('/admin/upload/titlecrew', upload.single('truncated_title.crew'), (req, res) => {
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
  
  connection.query('INSERT INTO title_crew (title_title_id, principal_directors_id, principal_writers_id) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), principal_directors_id = VALUES(principal_directors_id), principal_writers_id = VALUES(principal_writers_id)', [rows], (error, results) => {
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
app.post('/admin/upload/titleepisode', upload.single('truncated_title.episode'), (req, res) => {
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
  
  connection.query('INSERT INTO title_episode (title_episode_id, title_series_id, title_season_NO, title_episode_NO) VALUES ? ON DUPLICATE KEY UPDATE title_episode_id = VALUES(title_episode_id), title_series_id = VALUES(title_series_id), title_season_NO = VALUES(title_season_NO), title_episode_NO = VALUES(title_episode_NO)', [rows], (error, results) => {    
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

// Define an endpoint handler for /admin/upload/titleprincipals
app.post('/admin/upload/titleprincipals', upload.single('truncated_title.principals'), (req, res) => {
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

// Define an endpoint handler for /admin/upload/titleratings
app.post('/admin/upload/titleratings', upload.single('truncated_title.ratings'), (req, res) => {
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


// Define an endpoint handler for /title/:titleID
app.get('/title/:titleID', async (req, res) => {
  const titleID = req.params.titleID;

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
      // Query to fetch data for the titleObject
      const titleQuery = `
          SELECT 
              tb.title_id AS titleID, 
              tb.title_type AS type, 
              tb.title_originalTitle AS originalTitle, 
              tb.title_posterURL AS titlePoster, 
              tb.title_startYear AS startYear, 
              tb.title_endYear AS endYear, 
              tb.title_genre AS genres,
              tr.rating_avg AS avRating,
              tr.rating_numVotes AS nVotes
          FROM title_basics tb
          LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
          WHERE tb.title_id = ?`;

      // Execute the query
      const [titleResult] = await connection.promise().query(titleQuery, [titleID]);

      if (!titleResult.length) {
          return res.status(404).json({ message: 'Title not found' });
      }

      const titleObject = titleResult[0];

      // Fetch genres
      // Assuming the genres are stored in a comma-separated string
      titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));

      // Fetch titleAkas
      const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
      const [akasResult] = await connection.promise().query(akasQuery, [titleID]);
      titleObject.titleAkas = akasResult;

      // Fetch principals
      const principalsQuery = `
          SELECT 
              np.principal_id AS nameID, 
              np.principal_name AS name, 
              tp.principal_category AS category
          FROM title_principals tp
          JOIN principal np ON tp.principal_principal_id = np.principal_id
          WHERE tp.title_title_id = ?`;
      const [principalsResult] = await connection.promise().query(principalsQuery, [titleID]);
      titleObject.principals = principalsResult;

      // Return the titleObject
      res.json({ titleObject });
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
      // Close the database connection
      connection.end();
  }
});



// Define an endpoint handler for /searchtitle
app.get('/searchtitle', (req, res) => {
  const titlePart = req.body.titlePart; // Extract titlePart from request body

  if (!titlePart) {
    return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
  }

  const query = `SELECT * FROM title_basics WHERE title_originalTitle LIKE ?`;
  const likeTitlePart = `%${titlePart}%`; // SQL LIKE query format

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  connection.query(query, [likeTitlePart], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database query failed',
        error: error.message
      };
      res.json(response);
    } else {
      const response = {
        status: 'success',
        data: results // Send the found titles back
      };
      res.json(response);
    }

    // Close the database connection after the query
    connection.end();
  });
});



// Define an endpoint handler for /admin/resetall
app.post('/admin/resetall', async (req, res) => {
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


//app.listen(port, () => {
//  console.log(`Server running on port ${port}`);
//});
