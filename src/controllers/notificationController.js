const notificationService = require('../services/notification.service');
const { successResponse, errorResponse } = require('../utils/responseModel');
const constants = require('../utils/constants');

module.exports.getNotificationByUser = async (req, res, next) => {
    try {
        let result = await notificationService.getNotificationByUserID(req.body.user_id, req.body.page);
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
// module.exports.insertNotification = async (req, res, next) => {
//     try {
//         let user_id = req.body.user_id;
//         let title = req.body.title;
//         let type = req.body.type;
//         let request_id = req.body.request_id;
//         let result = await notificationService.insertNotification(user_id, title, type, request_id);
//         successResponse(
//             res,
//             constants.STATUS_SUCCESS,
//             result
//         );
//     } catch (error) {
//         res.status(400);
//         errorResponse(
//             res,
//             error.message
//         );
//     }
// }