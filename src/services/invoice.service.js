const InvoiceRepo = require("../repositories/invoice.repository");
const StatusHistoryRepo = require("../repositories/status_history.repository");
// module.exports.getRequestDetail = async (user_id) => {

//     let requestData = await RequestRepo.getRequestDetail(user_id);
//     //.then().catch(err => console.log(err))
//     return requestData;
// }

module.exports.insertInvoiceDetail = async (request_id, payment_method_id, status, cost_incurred, total_price) => {

    // lay ra request cuoi theo id nguoi dung
    let request = await InvoiceRepo.createInvoice(request_id, payment_method_id, status, cost_incurred, total_price);
    await StatusHistoryRepo.updateStatus(request_id, 4);
    return request;
}