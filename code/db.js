// db.js
const mysql = require('mysql2');

const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntuaflix',
};

const databaseConnectionString = JSON.stringify(databaseConfig);

const pool = mysql.createPool(databaseConfig);

module.exports = { pool, databaseConfig, databaseConnectionString };
