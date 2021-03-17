const admin = require('../config/firebaseAdmin')

module.exports.send = async () => {
    await admin.messaging().sendMulticast({
        tokens: [
            'eRoKwiRQQLaOtt87IUTbCA:APA91bFSQ48aoeUXx8GfOtm76rPIwd9EqndpXtmOkN4fkpCcIVUyxpN6UqRV7hIXqK4VJiv7efIe2MlhSJCX7kiEwYEfv6gMvyOudVXlSuja_jWtFr_DwKVDyOS0hhNh4w86PvHdNHtG'
        ], // ['token_1', 'token_2', ...]
        notification: {
            title: 'Basic Notification',
            body: 'This is a basic notification sent from the server!',
            imageUrl: 'https://my-cdn.com/app-logo.png',
        },
    });
}
