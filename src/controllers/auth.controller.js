const constants = require('../utils/constants');
const userService = require('../services/user.service');
const jwt = require('../helpers/jwt.helper');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.login = async (req, res, next) => {


    try {
        let user = await userService.getUsersByPhone(req.body.phoneNumber);

        if (user) {
            if (user.password == req.body.password) {
                let token = jwt.genreateToken(user.user_id, user.phone_number);
                res.json({
                    status: constants.STATUS_SUCCESS,
                    data: {
                        phone: user.phone_number,
                        token: `Bearer ${token}`
                    }
                })
            }
        }
        else {
            res.json({
                status: constants.STATUS_ERROR,
                data: { message: "This phone number is not registered" }
            })
        }
    } catch (error) {
        res.json({
            status: constants.STATUS_ERROR,
            message: error.message
        })
    }
}



module.exports.engineerLogin = async (req, res, next) => {
    try {
        let engineer = await userService.getEngineerByPhone(req.body.phoneNumber);

        if (engineer) {
            res.json({
                status: constants.STATUS_SUCCESS,
                data: engineer
            })
        }
        else {
            res.json({
                status: constants.STATUS_ERROR,
                data: { message: "This phone number is not registered" }
            })
        }
    } catch (error) {
        res.json({
            status: constants.STATUS_ERROR,
            message: constants.MESS_ERROR
        })
    }
}

module.exports.adminLogin = async (req, res, next) => {
    try {
        let admin = await userService.getAdminByPhone(req.body.phoneNumber);

        if (admin) {
            res.json({
                status: constants.STATUS_SUCCESS,
                data: admin
            })
        }
        else {
            res.json({
                status: constants.STATUS_ERROR,
                data: { message: "This phone number is not registered" }
            })
        }
    } catch (error) {
        res.json({
            status: constants.STATUS_ERROR,
            message: constants.MESS_ERROR
        })
    }
}