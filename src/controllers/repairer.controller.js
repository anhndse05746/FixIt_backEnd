const repairerService = require('../services/repairer.service');
const { successResponse, errorResponse } = require('../utils/responseModel');
const constants = require('../utils/constants');
const pushNotifyService = require('../services/pushNotify.service')
const notification = require('../services/notification.service')

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

module.exports.getListRequest = async (req, res, next) => {
    try {
        let result = await repairerService.getRequestList(req.body.repairer_id);
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
        let repairer_id = req.body.repairer_id
        let result = await repairerService.approveCV(repairer_id);

        let token = await pushNotifyService.getUserDeviceToken(repairer_id)
        await pushNotifyService.send(token, `CV của bạn đã được chấp nhận bởi quản trị viên`, 'Từ bây giờ bạn có thể nhận được yêu cầu của khách hàng', '', 0)
        await notification.insertNotification([repairer_id], 'CV của bạn đã được chấp nhận bởi quản trị viên', 1, 0)

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

module.exports.rejectCV = async (req, res, next) => {
    try {
        let repairer_id = req.body.repairer_id
        let result;
        let token = await pushNotifyService.getUserDeviceToken(repairer_id)
        await pushNotifyService.send(token, `CV của bạn đã bị từ chối bởi quản trị viên`, 'Bạn không thể nhận được yêu cầu của khách hàng', '', 0)
        await notification.insertNotification([repairer_id], 'CV của bạn đã bị từ chối bởi quản trị viên', 1, 0)

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
