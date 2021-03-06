const constants = require('../utils/constants');
const registerService = require('../services/register.service');
const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/responseModel');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/

module.exports.register = async (req, res, next) => {
    try {
        let result = await registerService.register(req.body.phone_number, req.body.password,
            req.body.name, req.body.role_id, req.body.email);
        successResponse(
            res,
            constants.STATUS_SUCCESS,
            result
        );
    } catch (error) {
        res.status(400);
        errorResponse(
            res,
            error.message
        );
    }
};


module.exports.getAllCustomerController = async (req, res, next) => {
    try {
        let result = await userService.getAllCustomer();
        successResponse(
            res,
            constants.STATUS_SUCCESS,
            result
        );
    } catch (error) {
        res.status(400);
        errorResponse(
            res,
            error.message
        );
    }
}

