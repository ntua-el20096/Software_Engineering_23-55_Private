//what does this code do? Connecting to the server which listens 
//on the "https://localhost:8765/" and it connects to the database and 
//executes the endpoints 1-9, populating the db
//3,5,6 endpoints don't work because of the foreign keys? or not idk
//3. title_akas, 5. title_crew, 6. title_episode

const mysql = require('mysql2');
const express = require('express');
const https = require('https');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
 
const httpsOptions = {
  key: fs.readFileSync('server.key', 'utf8'),
  cert: fs.readFileSync('server.crt', 'utf8'),
  passphrase: '2372002'
};

const app = express();

const port = 8765;
const baseURL = '/energy/api';

// Simulated database connection string
const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntuaflix',
    port: 3307

};
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  const frontendData = req.body;
  // Process the data on the server as needed
  console.log('Received data from front-end:', frontendData);

  // Send a response back to the front-end
  res.json({ message: 'Data received on the server!' });
});
const databaseConnectionString = JSON.stringify(databaseConfig);

const upload = multer();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  // Assuming you want to serve the index.html file
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
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
app.get(`${baseURL}/admin/healthcheck`, (req, res) => {
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
// Define an endpoint handler for /admin/upload/titlebasics
app.post(`${baseURL}/admin/upload/titlebasics`, upload.single('truncated_title.basics'), (req, res) => {
  const fileData = req.file;

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    return res.status(400).json(response); // Bad Request: No file uploaded
  }

  const filePath = fileData.path;
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  const connection = mysql.createConnection(databaseConfig);

  connection.query('INSERT INTO title_basics (title_id, title_type, title_primaryTitle, title_originalTitle, title_isAdult, title_startYear, title_endYear, title_runtimeMinutes, title_genre, title_posterURL) VALUES ? ON DUPLICATE KEY UPDATE title_id = VALUES(title_id), title_type = VALUES(title_type), title_primaryTitle = VALUES(title_primaryTitle), title_originalTitle = VALUES(title_originalTitle), title_isAdult = VALUES(title_isAdult), title_startYear = VALUES(title_startYear), title_endYear = VALUES(title_endYear), title_runtimeMinutes = VALUES(title_runtimeMinutes), title_genre = VALUES(title_genre), title_posterURL = VALUES(title_posterURL)', [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      res.status(500).json(response); // Internal Server Error: Database insertion failed
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      res.status(200).json(response); // Success: Data uploaded and inserted into the database successfully
    }

    connection.end();
  });
});



// Define an endpoint handler for /admin/upload/titleakas
app.post(`${baseURL}/admin/upload/titleakas`, upload.single('truncated_title.akas'), (req, res) => {
  const fileData = req.file;

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    return res.status(400).json(response); // Bad Request: No file uploaded
  }

  const filePath = fileData.path;
  const rawData = fileData.buffer.toString('utf-8');
  const rows = rawData.split('\n').map(row => row.split('\t'));

  const connection = mysql.createConnection(databaseConfig);

  connection.query('INSERT INTO title_AKAs (title_title_id, AKA_ordering, AKA_title, AKA_region, AKA_language, AKA_types, AKA_attributes, AKA_isOriginal) VALUES ? ON DUPLICATE KEY UPDATE title_title_id = VALUES(title_title_id), AKA_ordering = VALUES(AKA_ordering), AKA_title = VALUES(AKA_title), AKA_region = VALUES(AKA_region), AKA_language = VALUES(AKA_language), AKA_types = VALUES(AKA_types), AKA_attributes = VALUES(AKA_attributes), AKA_isOriginal = VALUES(AKA_isOriginal)', [rows], (error, results) => {
    if (error) {
      const response = {
        status: 'failed',
        message: 'Database insertion failed',
        error: error.message
      };
      res.status(500).json(response); // Internal Server Error: Database insertion failed
    } else {
      const response = {
        status: 'success',
        message: 'Data uploaded and inserted into the database successfully'
      };
      res.status(200).json(response); // Success: Data uploaded and inserted into the database successfully
    }

    connection.end();
  });
});


// Define an endpoint handler for /admin/upload/namebasics
app.post(`${baseURL}/admin/upload/namebasics`, upload.single('truncated_name.basics'), (req, res) => {
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
app.post(`${baseURL}/admin/upload/titlecrew`, upload.single('truncated_title.crew'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    res.status(400).json(response); // Bad Request: No file uploaded
  return;
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
      res.status(200).json(response); // Success: Data uploaded successfully
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleepisode
app.post(`${baseURL}/admin/upload/titleepisode`, upload.single('truncated_title.episode'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    res.status(400).json(response); // Bad Request: No file uploaded
    return;  } //checks that it has a file in the body


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
      res.status(200).json(response); // Success: Data uploaded successfully
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleprincipals
app.post(`${baseURL}/admin/upload/titleprincipals`, upload.single('truncated_title.principals'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    res.status(400).json(response); // Bad Request: No file uploaded
    return;
  }//checks that it has a file in the body


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
      res.status(200).json(response); // Success: Data uploaded successfully
    }


    // Close the database connection after the insertion
    connection.end();
  });
});

// Define an endpoint handler for /admin/upload/titleratings
app.post(`${baseURL}/admin/upload/titleratings`, upload.single('truncated_title.ratings'), (req, res) => {
  const fileData = req.file; // Assuming the uploaded file is in req.file

  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    res.status(400).json(response); // Bad Request: No file uploaded
    return;
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
      res.status(200).json(response); // Success: Data uploaded successfully
    }


    // Close the database connection after the insertion
    connection.end();
  });
});


// Define an endpoint handler for /title/:titleID
app.get(`${baseURL}/title/:titleID`, async (req, res) => {
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
      res.status(200).json({ titleObject });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
      // Close the database connection
      connection.end();
  }
});

// Define an endpoint handler for /searchword
app.get(`${baseURL}/searchword/:wordID`, async (req, res) => {
  const wordID = req.params.wordID;

  if (!wordID) {
    return res.status(400).json({ status: 'failed', message: 'wordID is required' });
  }

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    let query;
    let queryParams;

    // Check if the wordID starts with "nm" (name) or "tt" (title)
    if (wordID.startsWith('nm')) {
      query = `SELECT * FROM principal WHERE principal_id = ?`;
      queryParams = [wordID];
    } else if (wordID.startsWith('tt')) {
      query = `SELECT * FROM title_basics WHERE title_id = ?`;
      queryParams = [wordID];
    } else {
      return res.status(400).json({ status: 'failed', message: 'Invalid wordID format' });
    }

    // Execute the query
    const [results] = await connection.promise().query(query, queryParams);

    // Return the results
    res.status(200).json({ status: 'success', data: results });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
  } finally {
    // Close the database connection
    connection.end();
  }
});


// Define an endpoint handler for /searchtitle
// Define an endpoint handler for /searchtitle
app.get(`${baseURL}/searchtitle`, async (req, res) => {
  const titlePart = req.query.titlePart;

  if (!titlePart) {
    return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
  }

  const decodedTitlePart = decodeURIComponent(titlePart);

  const query = `
        SELECT 
            tb.title_type,
            tb.title_primaryTitle,
            tb.title_originalTitle,
            tb.title_isAdult,
            tb.title_startYear,
            tb.title_endYear,
            tb.title_runtimeMinutes,
            tb.title_posterURL,
            tr.rating_avg AS avRating,
            tr.rating_numVotes AS nVotes
        FROM title_basics tb
        LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
        WHERE tb.title_originalTitle LIKE ?`;

  const likeTitlePart = `%${decodedTitlePart}%`;

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
        data: results
      };
      res.json(response);
    }

    // Close the database connection after the query
    connection.end();
  });
});



app.get(`${baseURL}/bygenre`, async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.query;

  // Start building the query
  let query = `
      SELECT 
          tb.title_id AS titleID, 
          tb.title_type AS type, 
          tb.title_originalTitle AS originalTitle, 
          tb.title_posterURL AS titlePoster, 
          tb.title_startYear AS startYear, 
          tb.title_endYear AS endYear, 
          tb.title_genre AS genres,
          tr.rating_avg AS avRating
      FROM title_basics tb
      LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
      WHERE tb.title_genre LIKE ? AND tr.rating_avg >= ?
  `;

  const queryParams = [`%${qgenre}%`, minrating];

  // Add year range conditions if provided
  if (yrFrom) {
      query += ` AND tb.title_startYear >= ?`;
      queryParams.push(yrFrom);
  }
  if (yrTo) {
      query += ` AND tb.title_startYear <= ?`;
      queryParams.push(yrTo);
  }

  try {
      // Establish a connection to the database
      const connection = mysql.createConnection(databaseConfig);

      // Execute the query
      const [results] = await connection.promise().query(query, queryParams);

      // Format the results
      const formattedResults = results.map(result => {
          result.genres = result.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
          return result;
      });

      // Return the results
      res.status(200).json(formattedResults);

      // Close the database connection
      connection.end();
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Define an endpoint handler for /name/:nameID
app.get(`${baseURL}/name/:nameID`, async (req, res) => {
  const nameID = req.params.nameID;

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
      // Query to fetch data for the nameObject
      const nameQuery = `
          SELECT 
              np.principal_id AS nameID, 
              np.principal_name AS name, 
              np.principal_imageURL AS namePoster, 
              np.principal_birthYr AS birthYr, 
              np.principal_deathYr AS deathYr, 
              np.principal_profession AS profession
          FROM principal np
          WHERE np.principal_id = ?`;

      // Execute the query for name details
      const [nameResult] = await connection.promise().query(nameQuery, [nameID]);

      if (!nameResult.length) {
          return res.status(404).json({ message: 'Name not found' });
      }

      const nameObject = nameResult[0];s

      // Fetch nameTitles
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameID]);
      nameObject.nameTitles = titlesResult;

      // Return the nameObject
      res.status(200).json({ nameObject });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
      // Close the database connection
      connection.end();
  }
});

// Define an endpoint handler for /searchname
app.get(`${baseURL}/searchname`, async (req, res) => {
  const namePart = req.query.namePart;

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    // Query to search for names that contain the namePart
    const query = `
      SELECT 
        principal_id AS nameID, 
        principal_name AS name, 
        principal_imageURL AS namePoster, 
        principal_birthYr AS birthYr, 
        principal_deathYr AS deathYr, 
        principal_profession AS profession
      FROM principal
      WHERE principal_name LIKE ?`;

    // Execute the query
    const [results] = await connection.promise().query(query, [`%${namePart}%`]);

    // Format the results as a list of nameObjects
    const nameObjects = results.map(result => {
      return {
        nameID: result.nameID,
        name: result.name,
        namePoster: result.namePoster,
        birthYr: result.birthYr,
        deathYr: result.deathYr,
        profession: result.profession,
        // Add any additional fields here as needed
      };
    });

    // Return the results
    res.status(200).json(nameObjects);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    // Close the database connection
    connection.end();
  }
});


// Define an endpoint handler for /admin/resetall
app.post(`${baseURL}/admin/resetall`, async (req, res) => {
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

    res.status(200).json(response); // Success: Data reset successfully
  } catch (error) {
    // If an error occurs during the reset operation
    const response = {
      status: 'failed',
      reason: error.message, // Provide the specific reason for failure
    };

    res.status(500).json(response); // Internal Server Error: Data reset failed
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


 
 



 
