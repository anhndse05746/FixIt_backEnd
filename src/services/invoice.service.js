const InvoiceRepo = require("../repositories/invoice.repository");
const RequestStatusRepo = require("../repositories/request_status.repository");
const IssuesListRepo = require("../repositories/request_issues.repository");
const constants = require("../utils/constants");
const RequestRepo = require("../repositories/request.repository");
const requestService = require("./request.service")

module.exports.insertInvoiceDetail = async (request_id, payment_method_id, status, cost_incurred, total_price, request_issues) => {

    let request = await InvoiceRepo.createInvoice(request_id, payment_method_id, status, cost_incurred, total_price);
    let list_issues = await IssuesListRepo.getListIssuseByRequestID(request_id);
    let count = 0;
    if (request_issues.length != list_issues.length) {
        count = 1;
    } else {
        for (let i = 0, l = request_issues.length; i < l; i++) {
            if (request_issues[i].issues_id != list_issues[i].issues_id) {
                count = 1;
                break;
            }
        }
    }

    if (count != 0) {
        await IssuesListRepo.deleteListIssuesByID(request_id)
        await IssuesListRepo.insertListIssues(request_issues);
    }
    await RequestStatusRepo.updateStatus(request_id, constants.STATUS_REQUEST_FIXED);
    const result = await requestService.getRequestDetail(request_id)
    return result;
}

module.exports.confirmInvoice = async (request_id) => {
    await InvoiceRepo.confirmInvoice(request_id);
    await RequestStatusRepo.updateStatus(request_id, constants.STATUS_REQUEST_COMPLETED);
    return await RequestRepo.getRequestDetail(request_id);

}