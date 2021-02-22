const constants = require('../utils/constants');
const userService = require('../services/user.service');
const jwt = require('../helpers/jwt.helper');
const responseModel = require('../utils/responseModel')

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
                const payload = {
                    phone: user.phone_number,
                    name: user.name,
                    token: `Bearer ${token}`
                }
                responseModel(
                    res,
                    constants.STATUS_SUCCESS,
                    payload
                )
            }
            else {
                responseModel(
                    res,
                    constants.STATUS_ERROR,
                    { message: "Password incorrect" }
                )
            }
        }
        else {
            responseModel(
                res,
                constants.STATUS_ERROR,
                { message: "This phone number is not registered" }
            )
        }
    } catch (error) {
        responseModel(
            res,
            constants.STATUS_ERROR,
            error.message
        )
    }
}

