const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const userService = require('../services/user.service');
const userRepo = require('../repositories/user.repository');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.checkAuthenticate = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        return res.json({
            status: constants.STATUS_ERROR,
            message: 'Authorize fail'
        })
    }
    token = token.split(' ')[1];

    let payload = jwt.verifyToken(token); // Object in payload
    // Logic check object
    if(payload == null) {
        return res.json({
            status: constants.STATUS_ERROR,
            message: 'Token is expired'
        })
    }
    let currentUser = userRepo.getUsersByPhone(payload.phone);
    if (!currentUser) {
        return res.json({
            status: constants.STATUS_ERROR,
            message: 'Authorize fail'
        })
    }

    next();
}