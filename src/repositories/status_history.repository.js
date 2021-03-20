const Status_History = require('../models/status_history');

let status_history = {};

status_history.updateStatus = async (request_id, status_id) => {
    return await Status_History.create({
        request_id: request_id,
        status_id: status_id
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

module.exports = status_history;