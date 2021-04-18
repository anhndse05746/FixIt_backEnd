const constants = require('../utils/constants');
const issueService = require('../services/issue.service');
const {
    successResponse,
    errorResponse
} = require('../utils/responseModel');

module.exports.createIssue = async (req, res) => {
    try {
        let payload = await issueService.createIssue(req.body.name, req.body.service_id,
            req.body.estimate_fix_duration, req.body.estimate_price);
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

module.exports.updateIssue = async (req, res) => {
    try {
        let payload = await issueService.updateIssue(req.body.id, req.body.name, req.body.service_id,
            req.body.estimate_fix_duration, req.body.estimate_price);
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

module.exports.deactivateIssue = async (req, res) => {
    try {
        let payload = await issueService.deactivateIssue(req.body.id, req.body.service_id);
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

module.exports.activeIssue = async (req, res) => {
    try {
        let payload = await issueService.activeIssue(req.body.id, req.body.service_id);
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