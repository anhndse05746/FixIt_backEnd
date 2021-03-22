const InvoiceRepo = require("../repositories/invoice.repository");
const StatusHistoryRepo = require("../repositories/status_history.repository");
const IssuesListRepo = require("../repositories/issues_list.repository");
// module.exports.getRequestDetail = async (user_id) => {

//     let requestData = await RequestRepo.getRequestDetail(user_id);
//     //.then().catch(err => console.log(err))
//     return requestData;
// }

module.exports.insertInvoiceDetail = async (request_id, payment_method_id, status, cost_incurred, total_price, request_issues) => {

    let request = await InvoiceRepo.createInvoice(request_id, payment_method_id, status, cost_incurred, total_price);
    let list_issues = await IssuesListRepo.getListIssuseByRequestID(request_id);
    for (let i = 0, l = request_issues.length; i < l; i++) {
        if (!request_issues[i].issues_id == list_issues.issues_id) {
            await IssuesListRepo.insertListIssues(request_issues);
        }
    }
    await StatusHistoryRepo.updateStatus(request_id, 4);
    return request;
}