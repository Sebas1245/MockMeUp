const path = require('path'),
    Sequelize = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
