// In your other file where you need the database connection
const pool = require('./db');

// In your other file where you need the server configuration
const httpsServer = require('./server');

// In your other file where you need the endpoints
const app = require('./handler');

// In your entry file (e.g., index.js)
require('./server');
