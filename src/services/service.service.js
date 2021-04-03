const serviceRepo = require('../repositories/service.repository');
const majorRepo = require('../repositories/major.repository');
const issueRepo = require('../repositories/issue.repository');

module.exports.createService = async (name, major_id, image) => {
    let checkMajor = await majorRepo.getMajorById(major_id);
    let result;
    if(checkMajor) {
        result = await serviceRepo.createService(name, major_id, image);
    } else {
        return constants.FK_ERROR;
    }
    return result;
}

module.exports.updateService = async (id, name, major_id, image) => {
    let checkMajor = await majorRepo.getMajorById(major_id);
    let result;
    if(checkMajor) {
        result = await serviceRepo.updateService(id, name, major_id, image);
    } else {
        return constants.FK_ERROR;
    }
    return result;
}

module.exports.deleteService = async (id) => {
    let countIssue = await issueRepo.countIssueByServiceId(id);
    let result;
    if(countIssue != 0) {
        return constants.FK_ERROR;
    } else {
        result = await serviceRepo.deleteService(id);
    }
    return result;
}