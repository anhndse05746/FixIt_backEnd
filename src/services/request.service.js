const RequestRepo = require("../repositories/request.repository");
const RequestStatusRepo = require("../repositories/request_status.repository")
const IssuesListRepo = require("../repositories/request_issues.repository")

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

    await IssuesListRepo.insertListIssues(request_issues);
    await RequestStatusRepo.updateStatus(request.id, 1);
    let recentlyRequest = await RequestRepo.getLastRequestByUID(customer_id);
    return recentlyRequest;

}