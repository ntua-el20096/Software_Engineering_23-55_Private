const express = require('express');
const router = express.Router();
const pool = require('./database'); // Import the database connection pool

const baseURL = '/energy/api';

// Endpoint for fetching title details by titleID
router.get(`${baseURL}/title/:titleID`, async (req, res) => {
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
  

// Endpoint for searching titles
// Define an endpoint handler for /searchtitle
router.get(`${baseURL}/searchtitle`, (req, res) => {
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
  

// Endpoint for searching titles by genre
router.get(`${baseURL}/bygenre`, async (req, res) => {
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
        res.json(formattedResults);
  
        // Close the database connection
        connection.end();
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

// Define an endpoint handler for /name/:nameID
router.get(`${baseURL}/name/:nameID`, async (req, res) => {
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
  
        const nameObject = nameResult[0];
  
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
        res.json({ nameObject });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        // Close the database connection
        connection.end();
    }
  });

// Define an endpoint handler for /searchname
router.get(`${baseURL}/searchname`, async (req, res) => {
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
        res.json(nameObjects);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        // Close the database connection
        connection.end();
    }
  });
  

module.exports = router;
