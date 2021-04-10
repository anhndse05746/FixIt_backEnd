const Invoice = require('../models/invoice');
const constants = require('../utils/constants');


// lay ra data cua major (service, issues)
module.exports.createInvoice = async (request_id, payment_method_id, status, cost_incurred, total_price) => {

    const invoice = await Invoice.create(
        {
            request_id, payment_method_id, status, cost_incurred, total_price
        }
    ).then().catch(err => {
        console.log(err)
    });
    return invoice;
}

module.exports.confirmInvoice = async (request_id) => {
    return await Invoice.update({
        status: constants.STATUS_INVOICE_DONE
    }, {
        where: {
            request_id: request_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}
