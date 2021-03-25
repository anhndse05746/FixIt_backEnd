const RequestRepo = require("../repositories/request.repository");
const constants = require('../utils/constants');
const RequestStatusRepo = require("../repositories/request_status.repository")
const RequestIssuesRepo = require("../repositories/request_issues.repository")

module.exports.getRequestDetail = async (request_id) => {

    let requestData = await RequestRepo.getRequestDetail(request_id);
    //.then().catch(err => console.log(err))
    return requestData;
}

module.exports.createRequest = async (customer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, request_issues, city, district) => {

    await RequestRepo.createRequest(customer_id, 1, service_id, schedule_time, estimate_time, estimate_price, description, address, city, district);
    let request = await RequestRepo.getLastRequestByUID(customer_id);
    for (let i = 0, l = request_issues.length; i < l; i++) {
        request_issues[i].request_id = request.id;
    }
    await RequestRepo.insertRequestIssues(request_issues);
    await RequestRepo.updateStatus(request.id, constants.STATUS_REQUEST_FINDING);
    let recentlyRequest = await RequestRepo.getLastRequestByUID(customer_id);
    return recentlyRequest;
}

module.exports.takeRequest = async (request_id, repairer_id) => {
    let request = await RequestRepo.getRequestByID(request_id);
    let status = await RequestStatusRepo.getRequestStatus(request_id);

    if (status.status_id == constants.STATUS_REQUEST_FINDING) {
        await RequestRepo.updateRequest(request_id, repairer_id);
        await RequestRepo.updateStatus(request_id, constants.STATUS_REQUEST_HASTAKEN);
    } else if (status.status_id == constants.STATUS_REQUEST_HASTAKEN || status.status_id == constants.STATUS_REQUEST_FIXING) {
        return message = 'This request is taken';
    } else if (status.status_id == constants.STATUS_REQUEST_CANCELLED) {
        return message = 'This request is canceled';
    }
    return await RequestRepo.getRequestByID(request_id);
}

module.exports.cancelRequest = async (request_id, cancel_by, cancel_reason) => {
    let status = await RequestStatusRepo.getRequestStatus(request_id);
    if (status.status_id == constants.STATUS_REQUEST_FINDING || status.status_id == constants.STATUS_REQUEST_FIXING ||
        status.status_id == constants.STATUS_REQUEST_HASTAKEN) {
        await RequestRepo.updateStatus(request_id, constants.STATUS_REQUEST_CANCELLED, cancel_by, cancel_reason);
    } else {
        return message = 'Can not cancel this request';
    }
    return await RequestRepo.getRequestByID(request_id);
}

module.exports.getListRequestByStatusForCustomer = async (customer_id, pageNo, status_id) => {
    let page = (pageNo - 1) * 5;

    return await RequestRepo.getListRequestByStatusForCustomer(customer_id, page, status_id);
}

module.exports.getInitListRequest = async (customer_id) => {
    //Finding request
    let listFindingRequest = await RequestRepo.getListRequestByStatusForCustomer(customer_id, 0, [constants.STATUS_REQUEST_FINDING]);

    //Processing request
    let listProcessingRequest = await RequestRepo.getListRequestByStatusForCustomer(customer_id, 0, [constants.STATUS_REQUEST_HASTAKEN, constants.STATUS_REQUEST_FIXING, constants.STATUS_REQUEST_FIXED]);

    //Completed request
    let listCompletedRequest = await RequestRepo.getListRequestByStatusForCustomer(customer_id, 0, [constants.STATUS_REQUEST_COMPLETED]);

    //Canceled request
    let listCancelledRequest = await RequestRepo.getListRequestByStatusForCustomer(customer_id, 0, [constants.STATUS_REQUEST_CANCELLED]);


    let listRequest = [{ listFindingRequest: listFindingRequest }, { listProcessingRequest: listProcessingRequest }, { listCompletedRequest: listCompletedRequest }, { listCancelledRequest: listCancelledRequest }];
    return listRequest
}