const mysql = require('mysql');
const fixit = require('../config/dbConfig');

const pool = mysql.createPool(fixit);

module.exports = pool;