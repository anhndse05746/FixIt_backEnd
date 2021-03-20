const Invoice = require('../models/invoice');


// lay ra data cua major (service, issues)
module.exports.createInvoice = async (request_id, payment_method_id, status, cost_incurred, total_price) => {

    const invoice = await Invoice.create(
        {
            request_id, payment_method_id, status, cost_incurred, total_price
        }
    ).then().catch(err => {
        console.log(err)
    });
    return major;
}

