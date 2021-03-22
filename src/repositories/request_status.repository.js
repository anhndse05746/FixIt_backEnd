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

module.exports = requestStatus;