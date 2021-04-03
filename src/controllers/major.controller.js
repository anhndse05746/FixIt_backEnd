const constants = require('../utils/constants');
const majorService = require('../services/major.service');
const {
    successResponse,
    errorResponse
} = require('../utils/responseModel')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.getMajorDetail = async (req, res, next) => {
    try {
        let payload = await majorService.getMajorDetail();
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

module.exports.createMajor = async (req, res) => {
    try {
        let payload = await majorService.createMajor(req.body.image, req.body.name);
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

module.exports.updateMajor = async (req, res) => {
    try {
        let payload = await majorService.updateMajor(req.body.id, req.body.image, req.body.name);
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

module.exports.deleteMajor = async (req, res) => {
    try {
        let payload = await majorService.deleteMajor(req.body.id);
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