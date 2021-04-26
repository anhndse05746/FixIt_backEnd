const constants = require('../utils/constants');
const invoiceService = require('../services/invoice.service');
const { successResponse, errorResponse } = require('../utils/responseModel')
const pushNotifyService = require('../services/pushNotify.service')
const notification = require('../services/notification.service')

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
    let other_cost = req.body.other_cost;
    let cost_of_supplies = req.body.cost_of_supplies;
    let actual_proceeds = req.body.actual_proceeds;
    let total_price = req.body.total_price;
    let request_issues = req.body.request_issues;
    let payload = await invoiceService.insertInvoiceDetail(request_id, payment_method_id, status, other_cost, cost_of_supplies, total_price, actual_proceeds, request_issues);

    const customer_id = payload.Customer.id
    const repairer_id = payload.Repairer.id

    //send notification to customer
    let token = await pushNotifyService.getUserDeviceToken(customer_id)
    await pushNotifyService.send(token, `Yêu cầu ${payload.service.name} đã được tạo hoá đơn`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([customer_id], `Yêu cầu ${payload.service.name} đã được tạo hoá đơn`, 1, request_id)

    //send notification to repairer
    let rpr_token = await pushNotifyService.getUserDeviceToken(repairer_id)
    await pushNotifyService.send(rpr_token, `Bạn đã tạo hoá đơn cho yêu cầu ${payload.service.name}`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([repairer_id], `Bạn đã tạo hoá đơn cho yêu cầu ${payload.service.name}`, 1, request_id)


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

module.exports.confirmInvoice = async (req, res) => {
  try {
    const request_id = req.body.request_id
    let payload = await invoiceService.confirmInvoice(request_id);

    const customer_id = payload.Customer.id
    const repairer_id = payload.Repairer.id

    //send notification to customer
    let token = await pushNotifyService.getUserDeviceToken(customer_id)
    await pushNotifyService.send(token, `Yêu cầu ${payload.service.name} đã hoàn thành`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([customer_id], `Yêu cầu ${payload.service.name} đã hoàn thành`, 1, request_id)

    //send notification to repairer
    let rpr_token = await pushNotifyService.getUserDeviceToken(repairer_id)
    await pushNotifyService.send(rpr_token, `Yêu cầu ${payload.service.name} đã hoàn thành`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([repairer_id], `Yêu cầu ${payload.service.name} đã hoàn thành`, 1, request_id)

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