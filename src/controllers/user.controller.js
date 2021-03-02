const constants = require('../utils/constants');
const userService = require('../services/user.service');

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
