const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const userService = require('../services/user.service');
const userRepo = require('../repositories/user.repository');
const { errorResponse } = require('../utils/responseModel');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.checkAuthenticate = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        return errorResponse(
            res,
            constants.AUTHORIZE_FAIL
        );
    }
    token = token.split(' ')[1];

    let payload = jwt.verifyToken(token); // Object in payload
    // Logic check object
    if (payload == null) {
        return errorResponse(
            res,
            constants.TOKEN_EXPRIED
        );
    }
    let currentUser = userRepo.getUsersByPhone(payload.phone);
    if (!currentUser) {
        return errorResponse(
            res,
            constants.AUTHORIZE_FAIL
        );
    }

    next();
}