const mysql = require('mysql2');
const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntuaflix'
};

const pool = mysql.createPool(databaseConfig);

module.exports = pool;
