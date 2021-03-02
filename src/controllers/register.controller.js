const registerService = require('../services/register.service');
const constants = require('../utils/constants');
const { successResponse, errorResponse } = require('../utils/responseModel');

module.exports.register = async (req, res, next) => {
    try {
        let result = await registerService.regiseter(req.body.id, req.body.phone_number, req.body.password,
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