const admin = require('../config/firebaseAdmin')
const user = require('../models/user');
const repairer = require('../models/repairer')

module.exports.send = async (tokens, title, body, screen, requestId) => {

    await admin.messaging().sendMulticast({
        tokens: [
            'dfATwIXzSMWInIyvpEt3RX:APA91bHMtUyUbAprCO8xDj-SUzK94iiw6t4IUmyASWu2tSUfaGGOLmmkzceEfyb1diPLXFzwx22Yi0qxR5N7Te9wicARJaSpHUDK7h3YWGh3KJcgbDbys9aFCYqdXPmINs9tcxcVfkRP'
        ],
        notification: {
            title: title,
            body: body,
        },
        data: {
            screen: screen,
            requestId: requestId.toString()
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