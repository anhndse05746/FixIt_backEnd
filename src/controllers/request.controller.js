const constants = require('../utils/constants');
const requestService = require('../services/request.service');
const { successResponse, errorResponse } = require('../utils/responseModel')

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.getRequestDetail = async (req, res, next) => {
  try {
    let payload = await requestService.getRequestDetail();
    successResponse(
      res,
      constants.STATUS_SUCCESS,
      payload
    )
  } catch (error) {
    errorResponse(
      res,
      error.message
    )
  }
}
