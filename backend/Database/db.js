const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a MySQL database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // The RDS endpoint (e.g., "your-rds-endpoint.amazonaws.com")
  user: process.env.DB_USER, // The master username you set during RDS setup
  password: process.env.DB_PASSWORD, // The password you set during RDS setup
  database: process.env.DB_NAME, // The name of your database
  waitForConnections: true,
  connectionLimit: 10, // Limit on the number of simultaneous connections
  queueLimit: 0,
});

// Export the pool
module.exports = pool.promise();
