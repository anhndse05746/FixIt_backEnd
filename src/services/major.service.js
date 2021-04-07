const major = require('../models/major');
const MajorRepo = require("../repositories/major.repository")
const serviceRepo = require('../repositories/service.repository');
const issueRepo = require('../repositories/issue.repository');
const constants = require('../utils/constants');

module.exports.getListMajor = async () => {
    let majorData = await major.findAll().then().catch(err => console.log(err));
    return majorData;
}
module.exports.getMajorDetail = async () => {

    let majorData = await MajorRepo.getMajorDetail();
    //.then().catch(err => console.log(err))
    return majorData;
}

module.exports.createMajor = async (image, name) => {
    return await MajorRepo.createMajor(image, name);
}

module.exports.updateMajor = async (id, image, name) => {
    return await MajorRepo.updateMajor(id, image, name);
}

module.exports.deleteMajor = async (id) => {
    let result;
    let serviceList = await serviceRepo.getAllServiceByMajorId(id);
    if(serviceList.length > 0) {
        for(const item of serviceList) {
            await issueRepo.deleteIssueByServiceId(item.id);
        }
    }
    return result;
}