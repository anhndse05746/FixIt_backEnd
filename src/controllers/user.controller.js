const constants = require('../utils/constants');
const registerService = require('../services/register.service');
const userService = require('../services/user.service');
const notify = require('../services/pushNotify.service');
const { successResponse, errorResponse } = require('../utils/responseModel');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/

module.exports.register = async (req, res) => {
    try {
        let result = await registerService.register(req.body.phone_number, req.body.password,
            req.body.name, req.body.role_id, req.body.email, req.body.identity_card, req.body.major_id,
            req.body.district, req.body.city);
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

module.exports.checkRegisteredPhoneNumber = async (req, res) => {
    try {
        let result = await userService.checkRegisteredPhoneNumber(req.body.phone_number, req.body.role_id);
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

module.exports.updateUser = async (req, res) => {
    try {
        let result = await userService.updateUser(req.body.phone_number, req.body.role_id, req.body.name,
            req.body.dob, req.body.email, req.body.image);
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

module.exports.resetPassword = async (req, res) => {
    try {
        let result = await userService.resetPassword(req.body.phone_number, req.body.role_id, req.body.new_password);
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

module.exports.changePassword = async (req, res) => {
    try {
        let result = await userService.changePassword(req.body.phone_number, req.body.role_id,
            req.body.old_password, req.body.new_password);
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

module.exports.pushMessage = async (req, res) => {
    try {
        let sendNotify = await notify.send()
        let result = await notify.getRepairerDeviceTokenByCity('Ha Noi')
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