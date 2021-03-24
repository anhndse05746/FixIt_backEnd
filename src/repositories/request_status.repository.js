const RequestStatus = require('../models/request_status');

let requestStatus = {};

requestStatus.getRequestStatus = async (request_id) => {
    return await RequestStatus.findOne({
        where: {
            request_id: request_id
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    })
}

requestStatus.updateStatus = async (request_id, status_id) => {
    return await RequestStatus.create({
        request_id: request_id,
        status_id: status_id
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

module.exports = requestStatus;