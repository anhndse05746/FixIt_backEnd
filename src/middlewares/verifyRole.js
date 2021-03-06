const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const e = require('express');

module.exports.checkRole = (req, res, next) => {

    let token = req.get('Authorization');

    token = token.split(' ')[1];

    let payload = jwt.verifyToken(token); // Object in payload
    // Logic check object

    if (payload.role_id != constants.ROLE_ADMIN) {
        return res.json({
            status: constants.STATUS_ERROR,
            message: 'This account is not an admin'
        })
    }
    next();
}