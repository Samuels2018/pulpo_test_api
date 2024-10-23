const Sequelize = require("sequelize");
const dotenv = require('dotenv').config()

/**
 * Conexión e instancia de la base de datos
 */

if (process.env.NODE_ENV === 'development') {
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

}else {

  module.exports = new Sequelize({
    dialect: 'postgres',
    host: 'dpg-csck7dm8ii6s73b2i3jg-a',
    port: 5432,
    database: 'pulpo_db_test_ja6n',
    username: 'post',
    password: 'LDhYjuNAo9VP0UzW2ElzG8MypFwfV6Hm',
    timezone: 'UTC',
    multipleStatements: true,
    connectionLimit: 10,
    logging: true,
    pool: {
      max: parseInt(5),
      min: parseInt(0),
      acquire: parseInt(30000),
      idle: parseInt(10000)
    }
  });
}
