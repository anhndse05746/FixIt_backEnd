const constants = require('../utils/constants');
const requestService = require('../services/request.service');
const { successResponse, errorResponse } = require('../utils/responseModel')
const pushNotifyService = require('../services/pushNotify.service')

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

module.exports.getAllRequest = async (req, res, next) => {
  try {
    let payload = await requestService.getAllRequest();
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

module.exports.createRequest = async (req, res, next) => {
  try {
    let customer_id = req.body.customer_id;
    let service_id = req.body.service_id;
    let schedule_time = req.body.schedule_time;
    let estimate_time = req.body.estimate_time;
    let estimate_price = req.body.estimate_price;
    let description = req.body.description;
    let address = req.body.address;
    let request_issues = req.body.request_issues;
    let city = req.body.city;
    let district = req.body.district;
    let result = await requestService.createRequest(customer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, request_issues, city, district);
    let tokens = await pushNotifyService.getRepairerDeviceTokenByCity(city)
    let notify = await pushNotifyService.send(tokens, `Bạn có yêu cầu ${result.service.name} mới`, description, 'RequestDetailView', result.id)
    console.log(tokens)
    successResponse(
      res,
      constants.STATUS_SUCCESS,
      result
    );
  } catch (error) {
    res.status(400);
    errorResponse(
      res,
      error.message
    );
  }
}
module.exports.getRequestByRequestID = async (req, res, next) => {
  try {
    let request_id = req.body.request_id;
    let payload = await requestService.getRequestDetail(request_id);
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

module.exports.takeRequest = async (req, res) => {
  try {
    let payload = await requestService.takeRequest(req.body.request_id, req.body.repairer_id);
    let token = await pushNotifyService.getUserDeviceToken(payload.customer_id)
    let notify = await pushNotifyService.send(token, `Yêu cầu ${payload.service.name} đã được nhận`, payload.description, 'RequestDetailView', payload.id)
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


module.exports.cancelRequest = async (req, res) => {
  try {
    let payload = await requestService.cancelRequest(req.body.request_id, req.body.cancel_by, req.body.cancel_reason);
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

module.exports.getListRequestByStatusForCustomer = async (req, res) => {
  try {
    let payload = await requestService.getListRequestByStatusForCustomer(req.body.customer_id, req.body.role, req.body.page, req.body.status_id);
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

module.exports.getInitListRequest = async (req, res) => {
  try {
    let payload = await requestService.getInitListRequest(req.body.customer_id, req.body.role);
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