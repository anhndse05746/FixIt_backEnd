require('dotenv').config();

module.exports = {
    connectionLimit: 10,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};
