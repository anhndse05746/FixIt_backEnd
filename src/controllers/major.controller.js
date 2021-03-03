const constants = require('../utils/constants');
const majorService = require('../services/major.service');


/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.getMajorDetail = async (req, res, next) => {
  try {

    let resData = await majorService.getMajorDetail();

    res.json({
      status: constants.STATUS_SUCCESS,
      results: resData
    })
  } catch (error) {
    res.json({
      status: constants.STATUS_ERROR,
      message: constants.MESS_ERROR
    })
  }
}
