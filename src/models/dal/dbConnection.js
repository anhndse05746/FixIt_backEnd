
const fixit = require('../../config/mySqlConfig');
const mysql = require('mysql');
const pool = mysql.createPool(fixit)

module.exports = pool;