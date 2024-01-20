// Import necessary modules and dependencies
const express = require('express');
const mysql = require('mysql2');
const { pool } = require('../utils/database');

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON in the request body
app.use(express.json());

// Define the [GET] /searchname endpoint
app.get('/searchname', async (req, res) => {
    try {
        // Extract the namePart from the request body
        const { namePart } = req.body.nqueryObject;

        // Perform a database query to search for names based on namePart
        const query = `
            SELECT nconst, primaryName, img_url_asset, birthYear, deathYear, profession
            FROM people
            WHERE primaryName LIKE ?`;

          /*  SELECT p.nconst, p.primaryName, p.img_url_asset, p.birthYear, p.deathYear, pr.profession
    FROM people p
    JOIN profession pr ON p.nconst = pr.nconst
    WHERE p.primaryName LIKE "%?%"`+ (limit ? ' LIMIT ?' : '');
*/
        const queryParams = [`%${namePart}%`];

        // Execute the database query
        const [rows] = await pool.promise().query(query, queryParams);

        // Format the response
        const nameObjects = rows.map(row => ({
            nameID: row.nconst,
            name: row.primaryName,
            namePoster: row.img_url_asset,
            birthYr: row.birthYear,
            deathYr: row.deathYear,
            profession: row.profession,
            nameTitles: [],  // You can customize this based on your data structure
        }));

        // Send the response
        res.status(200).json(nameObjects);
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error('Error in /searchname endpoint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Define other endpoints and start the server
// ...

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
