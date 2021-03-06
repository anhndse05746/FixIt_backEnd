const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');

module.exports.genreateToken = (id, phone, role_id) => {
    return jwt.sign({ id, phone, role_id }, config.secretKey, { expiresIn: config.tokenExpire });
}

module.exports.verifyToken = (token) => {
    let decoded;
    try{
        return decoded = jwt.verify(token, config.secretKey);
    } catch (err) {
        return null;
    }
    
}