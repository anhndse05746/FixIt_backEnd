const constants = require('../utils/constants')
const jwt = require('../helpers/jwt.helper');
const userService = require('../services/user.service');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.checkAuthenticate = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.json({
            status: constants.STATUS_ERROR,
            message: 'Authorize fail'
        })
    }
    token = token.split(' ')[1];

    let payload = jwt.verifyToken(token); // Object in payload
    // Logic check object

    let currentUser = userService.getUsersByPhone(payload.phone);
    if (!currentUser) {
        res.json({
            status: constants.STATUS_ERROR,
            message: 'Authorize fail'
        })
    }

    next();
}