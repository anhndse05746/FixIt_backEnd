const serviceRepo = require('../repositories/service.repository');
const majorRepo = require('../repositories/major.repository');
const issueRepo = require('../repositories/issue.repository');
const constants = require('../utils/constants');

module.exports.createService = async (name, major_id, image) => {
    let checkMajor = await majorRepo.getMajorById(major_id);
    let result;
    if (checkMajor) {
        await serviceRepo.createService(name, major_id, image);
        result = await serviceRepo.getAllServiceByMajorId(major_id);
    } else {
        return constants.FK_ERROR;
    }
    return result;
}

module.exports.updateService = async (id, name, major_id, image) => {
    let checkMajor = await majorRepo.getMajorById(major_id);
    let result;
    if (checkMajor) {
        await serviceRepo.updateService(id, name, major_id, image);
        result = await serviceRepo.getAllServiceByMajorId(major_id);
    } else {
        return constants.FK_ERROR;
    }
    return result;
}

module.exports.deactivateService = async (id, major_id) => {
    let listIssue = await issueRepo.getIssueByServiceId(id);
    if (listIssue.length > 0) {
        for (const issue of listIssue) {
            await issueRepo.changeIssueStatus(issue.id, constants.NOT_ACTIVE);
        }
    }
    await serviceRepo.changeServiceStatus(id, constants.NOT_ACTIVE);
    return await serviceRepo.getAllServiceByMajorId(major_id);
}

module.exports.activeService = async (id, major_id) => {
    let listIssue = await issueRepo.getIssueByServiceId(id);
    if (listIssue.length > 0) {
        for (const issue of listIssue) {
            await issueRepo.changeIssueStatus(issue.id, constants.ACTIVE);
        }
    }
    await serviceRepo.changeServiceStatus(id, constants.ACTIVE);
    return await serviceRepo.getAllServiceByMajorId(major_id);
}