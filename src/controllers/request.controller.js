const constants = require('../utils/constants');
const requestService = require('../services/request.service');
const {
    successResponse,
    errorResponse
} = require('../utils/responseModel')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.getRequestDetail = async (req, res, next) => {
    try {
        let payload = await requestService.getRequestDetail();
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

module.exports.createRequest = async (req, res, next) => {
    try {
        let customer_id = req.body.customer_id;
        let service_id = req.body.service_id;
        let schedule_time = req.body.schedule_time;
        let estimate_time = req.body.estimate_time;
        let estimate_price = req.body.estimate_price;
        let description = req.body.description;
        let address = req.body.address;
        let request_issues = req.body.request_issues;
        let city = req.body.city;
        let district = req.body.district;
        let result = await requestService.createRequest(customer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, request_issues, city, district);
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

module.exports.getCreatedRequest = async (req, res, next) => {
    try {
        let user_id = req.body.user_id;
        let payload = await requestService.getRequestDetail(user_id);
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

module.exports.takeRequest = async (req, res) => {
    try {
        let payload = await requestService.takeRequest(req.body.request_id, req.body.repairer_id);
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


module.exports.cancelRequest = async (req, res) => {
    try {
        let payload = await requestService.cancelRequest(req.body.request_id, req.body.cancel_by, req.body.cancel_reason);
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