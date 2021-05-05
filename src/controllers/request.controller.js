const constants = require('../utils/constants');
const requestService = require('../services/request.service');
const { successResponse, errorResponse } = require('../utils/responseModel')
const pushNotifyService = require('../services/pushNotify.service')
const notification = require('../services/notification.service')

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
    console.log(schedule_time)
    let result = await requestService.createRequest(customer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, request_issues, city, district);

    //send notification to repairer device
    let rpr_tokens = await pushNotifyService.getRepairerDeviceTokenByCity(city)
    await pushNotifyService.send(rpr_tokens, `Bạn có yêu cầu ${result.service.name} mới`, description, 'RequestDetailView', result.id)

    //send notification to customer device
    let user_token = await pushNotifyService.getUserDeviceToken(customer_id)
    await pushNotifyService.send(user_token, `Bạn đã tạo yêu cầu ${result.service.name} thành công`, description, 'RequestDetailView', result.id)
    await notification.insertNotification([customer_id], `Bạn đã tạo yêu cầu ${result.service.name} thành công`, 1, result.id)

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
    const request_id = req.body.request_id
    const repairer_id = req.body.repairer_id

    let payload = await requestService.takeRequest(request_id, repairer_id);

    //send notification to customer
    let token = await pushNotifyService.getUserDeviceToken(payload.customer_id)
    await pushNotifyService.send(token, `Yêu cầu ${payload.service.name} đã được nhận`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([payload.customer_id], `Yêu cầu ${payload.service.name} đã được nhận`, 1, request_id)

    //send notification to repairer
    let rpr_token = await pushNotifyService.getUserDeviceToken(repairer_id)
    await pushNotifyService.send(rpr_token, `Bạn đã nhận một yêu cầu ${payload.service.name}`, payload.description, 'RequestDetailView', request_id)
    await notification.insertNotification([repairer_id], `Bạn đã nhận một yêu cầu ${payload.service.name}`, 1, request_id)

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
    const request_id = req.body.request_id
    const cancel_reason = req.body.cancel_reason
    let payload = await requestService.cancelRequest(request_id, req.body.cancel_by, cancel_reason);

    const customer_id = payload.Customer.id
    const repairer_id = payload.Repairer.id
    const cancel_by = req.body.cancel_by == constants.ROLE_REPAIRER ? 'thợ' : 'khách'

    //send notification to customer
    let token = await pushNotifyService.getUserDeviceToken(customer_id)
    await pushNotifyService.send(token, `Yêu cầu ${payload.service.name} đã bị huỷ bởi ${cancel_by}`, `Lí do: ${cancel_reason}`, 'RequestDetailView', request_id)
    await notification.insertNotification([customer_id], `Yêu cầu ${payload.service.name} đã bị huỷ bởi ${cancel_by}`, 1, request_id)

    //send notification to repairer
    let rpr_token = await pushNotifyService.getUserDeviceToken(repairer_id)
    await pushNotifyService.send(rpr_token, `Yêu cầu ${payload.service.name} đã bị huỷ bởi ${cancel_by}`, `Lí do: ${cancel_reason}`, 'RequestDetailView', request_id)
    await notification.insertNotification([repairer_id], `Yêu cầu ${payload.service.name} đã bị huỷ bởi ${cancel_by}`, 1, request_id)

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
module.exports.getListRequestFindingRepairer = async (req, res) => {
  try {
    let payload = await requestService.getListRequestFindingRepairer(req.body.city, req.body.major);
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