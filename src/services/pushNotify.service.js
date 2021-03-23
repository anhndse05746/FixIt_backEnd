const admin = require('../config/firebaseAdmin')
const user = require('../models/user');
const repairer = require('../models/repairer')

module.exports.send = async (tokens, title, body, screen, requestId) => {

    await admin.messaging().sendMulticast({
        tokens: [
            'eRoKwiRQQLaOtt87IUTbCA:APA91bFSQ48aoeUXx8GfOtm76rPIwd9EqndpXtmOkN4fkpCcIVUyxpN6UqRV7hIXqK4VJiv7efIe2MlhSJCX7kiEwYEfv6gMvyOudVXlSuja_jWtFr_DwKVDyOS0hhNh4w86PvHdNHtG'
        ],
        notification: {
            title: 'Yêu cầu của bạn',
            body: 'Yêu cầu của bạn đã được tạo thành công',
        },
        data: {
            screen: 'RequestDetailView',
            requestId: 1
        }
    });
}

module.exports.getRepairerDeviceTokenByCity = async (city) => {
    const tokenList = await user.findAll({
        attributes: [
            'device_token'
        ],
        include: [
            {
                model: repairer,
                attributes: [
                ],
                where: {
                    city: city
                }
            }
        ]
    }).then().catch(err => { console.log(err.message) })

    let tokens = []
    for (let i = 0; i < tokenList.length; i++) {
        tokens.push(tokenList[i].device_token)
    }

    return tokens
}