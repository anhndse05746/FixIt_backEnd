const constants = require('../utils/constants');
const invoiceService = require('../services/invoice.service');
const { successResponse, errorResponse } = require('../utils/responseModel')

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
* @param {import('express').NextFunction} next
*/
module.exports.createInvoice = async (req, res, next) => {
  try {
    let request_id = req.body.request_id;
    let payment_method_id = req.body.payment_method_id;
    let status = req.body.status;
    let cost_incurred = req.body.cost_incurred;
    let total_price = req.body.total_price;
    let request_issues = req.body.request_issues;
    let payload = await invoiceService.insertInvoiceDetail(request_id, payment_method_id, status, cost_incurred, total_price, request_issues);
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
