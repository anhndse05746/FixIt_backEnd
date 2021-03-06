const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const { errorResponse } = require('../utils/responseModel');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.checkRole = (req, res, next) => {

    let token = req.get('Authorization');

    token = token.split(' ')[1];

    let payload = jwt.verifyToken(token); // Object in payload
    // Logic check object

    if (payload.role_id != constants.ROLE_ADMIN) {
        return errorResponse(
            res,
            'This account is not an admin'
        );
    }
    next();
}