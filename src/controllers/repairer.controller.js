const repairerService = require('../services/repairer.service');
const { successResponse, errorResponse } = require('../utils/responseModel');
const constants = require('../utils/constants');

module.exports.getAllRepairerController = async (req, res, next) => {
    try {
        let result = await repairerService.getAllRepairer();
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