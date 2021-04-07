const constants = require('../utils/constants');
const Issue = require('../models/issues');


let issues = {};

issues.createIssue = async (name, service_id, estimate_fix_duration, estimate_price) => {
    return await Issue.create({
        name: name,
        service_id: service_id,
        estimate_fix_duration: estimate_fix_duration,
        estimate_price: estimate_price,
    }).then().catch(err => {
        throw new Error(err.message);
    });

}

issues.updateIssue = async (id, name, service_id, estimate_fix_duration, estimate_price) => {

    return await Issue.update({
        name: name,
        service_id: service_id,
        estimate_fix_duration: estimate_fix_duration,
        estimate_price: estimate_price
    }, {
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

issues.deleteIssue = async (id) => {
    return await Issue.destroy({
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

issues.countIssueByServiceId = async (service_id) => {
    return await Issue.count({
        where: {
            service_id: service_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

issues.deleteIssueByServiceId = async (service_id) => {
    return await Issue.destroy({
        where: {
            service_id: service_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    })
}

module.exports = issues;