const { Pool } = require('pg');
require("dotenv").config();



const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_DATABASE;



const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});



const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB,
};
