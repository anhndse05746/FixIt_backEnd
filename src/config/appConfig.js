require('dotenv/config')

module.exports = {
    tokenExpire: 60 * 60 * 24 * 30,
    secretKey: process.env.SECRET_KEY
}