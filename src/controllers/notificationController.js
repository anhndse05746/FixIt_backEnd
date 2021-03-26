const notificationService = require('../services/notification.service');
const { successResponse, errorResponse } = require('../utils/responseModel');
const constants = require('../utils/constants');

module.exports.getNotificationByUser = async (req, res, next) => {
    try {
        // let result = await notificationService.getNotificationByUserID(req.body.user_id, req.body.page);
        let result = await notificationService.insertNotification();
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