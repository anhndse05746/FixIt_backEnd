const admin = require('../config/firebaseAdmin')
const user = require('../models/user');
const repairer = require('../models/repairer')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports.send = async (tokens, title, body, screen, requestId) => {

    await admin.messaging().sendMulticast({
        tokens: tokens,
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
                    city: city,
                }
            }
        ],
        where: {
            device_token: {
                [Op.not]: null,
                [Op.notLike]: ''
            }
        }
    }).then().catch(err => { console.log(err.message) })

    let tokens = []
    for (let i = 0; i < tokenList.length; i++) {
        tokens.push(tokenList[i].device_token)
    }

    return tokens
}

module.exports.getUserDeviceToken = async (userId) => {
    const token = await user.findOne({
        attributes: [
            'device_token'
        ],
        where: {
            id: userId
        }
    }).then().catch(err => { console.log(err.message) })
    let tokens = []
    tokens.push(token.device_token)

    return tokens
}