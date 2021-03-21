const constants = require('../utils/constants');
const { successResponse, errorResponse } = require('../utils/responseModel')
const user_addressService = require('../services/user_address.service');

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.createAddress = async (req, res) => {
  try {
    let create = await user_addressService.createAddress(req.body.user_id, req.body.address,
      req.body.district, req.body.city);

    if (create !== "New address is duplicated") {
      let payload = await user_addressService.getAddressByUser(req.body.user_id)
      successResponse(
        res,
        constants.STATUS_SUCCESS,
        payload
      )
    }
    else {
      successResponse(
        res,
        constants.STATUS_SUCCESS,
        create
      )
    }

  } catch (error) {
    errorResponse(
      res,
      error.message
    )
  }
}