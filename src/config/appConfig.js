require('dotenv/config')

module.exports = {
    tokenExpire: 60 * 60,
    secretKey: process.env.SECRET_KEY
}