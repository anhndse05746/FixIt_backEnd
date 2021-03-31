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

module.exports.getAllRepairerNotVerifiedController = async (req, res, next) => {
    try {
        let result = await repairerService.getAllRepairerNotVerified();
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

module.exports.approveCV = async (req, res, next) => {
    try {
        let result = await repairerService.approveCV(req.body.id);
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
