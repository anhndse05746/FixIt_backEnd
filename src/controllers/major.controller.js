const constants = require('../utils/constants');
const majorService = require('../services/major.service');
const { successResponse, errorResponse } = require('../utils/responseModel')

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.getMajorDetail = async (req, res, next) => {
  try {
    let payload = await majorService.getMajorDetail();
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
