require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = process.env.JAWSDB_URL

  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });
module.exports = sequelize;
