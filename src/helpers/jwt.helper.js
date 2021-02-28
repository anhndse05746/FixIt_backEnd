const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');

module.exports.genreateToken = (id, phone) => {
    return jwt.sign({ id, phone }, config.secretKey, { expiresIn: config.tokenExpire });
}

module.exports.verifyToken = (token) => {
    return jwt.verify(token, config.secretKey);
}