const Sequelize = require("sequelize");
const dotenv = require('dotenv').config()

/**
 * Conexión e instancia de la base de datos
 */

 console.log('process.env.DB_DIALEG',process.env.DB_DIALEG)

module.exports = new Sequelize({
  dialect: process.env.DB_DIALEG,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  timezone: process.env.DB_TIME_ZONE,
  multipleStatements: true,
  connectionLimit: 10,
  logging: process.env.DB_SHOW_LOGS == "true" ? console.log : false,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    min: parseInt(process.env.DB_POOL_MIN),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
    idle: parseInt(process.env.DB_POOL_IDLE)
  }
});
