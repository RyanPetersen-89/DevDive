const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// This loads the environment variables from .env file into process.env
dotenv.config();

// This uses the 'development' configuration from config.json
const config = require('./config.json')[env];

// This will initialize Sequelize with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false
  }
);

module.exports = sequelize;