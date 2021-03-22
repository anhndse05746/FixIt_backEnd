const RequestStatus = require('../models/request_status');

let request_status = {};

request_status.updateStatus = async (request_id, status_id) => {
    return await RequestStatus.create({
        request_id: request_id,
        status_id: status_id
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

module.exports = request_status;