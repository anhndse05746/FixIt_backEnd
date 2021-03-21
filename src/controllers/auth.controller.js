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
        let payload = await userService.userAuthentication(req.body.phone_number, req.body.password, req.body.role_id, req.body.device_token);
        successResponse(
            res,
            constants.STATUS_SUCCESS,
            payload
        )
    } catch (error) {
        if (error.message == constants.NOT_REGISTERRED || error.message == constants.PASSWORD_INCORRECT) {
            res.status(401)
        }
        errorResponse(
            res,
            error.message
        )
    }
}

