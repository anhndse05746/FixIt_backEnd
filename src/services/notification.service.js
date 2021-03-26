const notificationRepo = require('../repositories/notification.repository');
const constants = require('../utils/constants');

module.exports.getNotificationByUserID = async (user_id, page) => {
    return await notificationRepo.getNotificationByUser(user_id, (page - 1) * 10);
}

module.exports.insertNotification = async (user_id, title, type, request_id) => {
    // let title = 'Notification 1';
    // let type = 1;
    // let request_id = 34;
    // let user_id = [43];
    // let page = 1;

    //truyền vào mảng user_id
    for (const item of user_id) {
        await notificationRepo.insertNotification(item, title, type, request_id, constants.STATUS_UNREAD);
    }

    return await notificationRepo.getNotificationByUser(user_id, 0);
}