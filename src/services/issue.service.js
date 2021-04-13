const issues = require('../models/issues');
const issueRepo = require('../repositories/issue.repository');
const serviceRepo = require('../repositories/service.repository');
const constants = require('../utils/constants');

module.exports.createIssue = async (name, service_id, estimate_fix_duration, estimate_price) => {
    let result;
    let checkServiceID = await serviceRepo.getServiceById(service_id);
    if(checkServiceID) {
        await issueRepo.createIssue(name, service_id, estimate_fix_duration, estimate_price);
        result = issueRepo.getIssueByServiceId(service_id);
    } else {
        result = constants.FK_ERROR;
    }
    return result;
}

module.exports.updateIssue = async (id, name, service_id, estimate_fix_duration, estimate_price) => {
    let checkServiceID = await serviceRepo.getServiceById(service_id);
    let result;
    if(checkServiceID) {
        await issueRepo.updateIssue(id, name, service_id, estimate_fix_duration, estimate_price);
        result = issueRepo.getIssueByServiceId(service_id);
    } else {
        result = constants.FK_ERROR;
    }
    return result;
}

module.exports.deactivateIssue = async (id, service_id) => {
    await issueRepo.changeIssueStatus(id, constants.NOT_ACTIVE);
    return issueRepo.getIssueByServiceId(service_id);
}

module.exports.activeIssue = async (id, service_id) => {
    await issueRepo.changeIssueStatus(id, constants.ACTIVE);
    return issueRepo.getIssueByServiceId(service_id);
}