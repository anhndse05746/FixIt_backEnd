const constants = require('../utils/constants');
const serviceSer = require('../services/service.service');
const {
    successResponse,
    errorResponse
} = require('../utils/responseModel');

module.exports.createService = async (req, res) => {
    try {
        let payload = await serviceSer.createService(req.body.name, req.body.major_id,
            req.body.image);
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

module.exports.updateService = async (req, res) => {
    try {
        let payload = await serviceSer.updateService(req.body.id, req.body.name, req.body.major_id,
            req.body.image);
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

module.exports.deactivateService = async (req, res) => {
    try {
        let payload = await serviceSer.deactivateService(req.body.id, req.body.major_id);
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

module.exports.activeService = async (req, res) => {
    try {
        let payload = await serviceSer.activeService(req.body.id, req.body.major_id);
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