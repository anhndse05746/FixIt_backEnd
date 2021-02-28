const constants = require('../utils/constants');
const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/responseModel')

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.login = async (req, res, next) => {
    try {
        let payload = await userService.userAuthentication(req.body.phoneNumber, req.body.password);
        successResponse(
            res,
            constants.STATUS_SUCCESS,
            payload
        )
    } catch (error) {
        errorResponse(
            res,
            error.message
        )
    }
}

