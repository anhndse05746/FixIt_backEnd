const RequestRepo = require("../repositories/request.repository");
// const IssuseRepo = require("../repositories/.repository")



module.exports.getRequestDetail = async (user_id) => {

    let requestData = await RequestRepo.getRequestDetail(user_id);
    //.then().catch(err => console.log(err))
    return requestData;
}

module.exports.createRequest = async (customer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, issues_lists, city, district) => {

    let requestData = await RequestRepo.createRequest(customer_id, 1, service_id, schedule_time, estimate_time, estimate_price, description, address, city, district);
    // lay ra request cuoi theo id nguoi dung
    let request = await RequestRepo.getLastRequestByUID(customer_id);

    for (let i = 0, l = issues_lists.length; i < l; i++) {
        issues_lists[i].request_id = request.id;

    }
    await RequestRepo.insertListIssues(issues_lists);
    await RequestRepo.insertStatusHistory( request.id, 1);
    return requestData;
}