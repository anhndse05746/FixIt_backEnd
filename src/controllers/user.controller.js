const constants = require('../utils/constants');
const userService = require('../services/user.service');


/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.getListUsers = async (req, res, next) => {
  try {
    let resData = await userService.getListUsers();

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

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.getUserDetail = async (req, res, next) => {
  let results = await userService.getUsersById(req.params.id);
  res.json(results);
}

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.createUser = async (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.json({
    data: req.body
  })
}
