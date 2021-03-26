const Notification = require('../models/notification');

let notification = {};

notification.insertNotification = async (user_id, title, type, request_id, isRead) => {

    return await Notification.create({
        user_id: user_id,
        title: title,
        type: type, 
        request_id: request_id,
        isRead: isRead
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

notification.getNotificationByUser = async (user_id, page) => {
    return await Notification.findAll({ 
        where: {
            user_id: user_id
        },
        order: [['updatedAt', 'DESC']],
        offset: page, 
        limit: 10 
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

module.exports = notification;