const issues = require('../models/issues');
const issueRepo = require('../repositories/issue.repository');
const serviceRepo = require('../repositories/service.repository');
const constants = require('../utils/constants');

module.exports.createIssue = async (name, service_id, estimate_fix_duration, estimate_price) => {
    let result;
    let checkServiceID = await serviceRepo.getServiceById(service_id);
    if(checkServiceID) {
        result = await issueRepo.createIssue(name, service_id, estimate_fix_duration, estimate_price);
    } else {
        result = constants.FK_ERROR;
    }
    return result;
}

module.exports.updateIssue = async (id, name, service_id, estimate_fix_duration, estimate_price) => {
    let checkServiceID = await serviceRepo.getServiceById(service_id);
    let result;
    if(checkServiceID) {
        result = await issueRepo.updateIssue(id, name, service_id, estimate_fix_duration, estimate_price);
    } else {
        result = constants.FK_ERROR;
    }
    return result;
}

module.exports.deleteIssue = async (id) => {
    return await issueRepo.deleteIssue(id);
}