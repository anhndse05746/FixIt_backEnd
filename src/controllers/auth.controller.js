const constants = require('../utils/constants');
const userService = require('../services/user.service');
const jwt = require('../helpers/jwt.helper');
const { successResponse, errorResponse } = require('../utils/responseModel')

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
                    role: user.role_id,
                    token: `Bearer ${token}`
                }
                successResponse(
                    res,
                    constants.STATUS_SUCCESS,
                    payload
                )
            }
            else {
                res.status(401)
                errorResponse(
                    res,
                    "Password incorrect"
                )
            }
        }
        else {
            res.status(401)
            errorResponse(
                res,
                "This phone number is not registered"
            )
        }
    } catch (error) {
        errorResponse(
            res,
            error.message
        )
    }
}

