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
        let payload = await majorService.getMajorDetail(req.body.role_id);
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

module.exports.deactivateMajor = async (req, res) => {
    try {
        let payload = await majorService.deactivateMajor(req.body.id);
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

module.exports.activeMajor = async (req, res) => {
    try {
        let payload = await majorService.activeMajor(req.body.id);
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