const major = require('../models/major');
const MajorRepo = require("../repositories/major.repository")
const serviceRepo = require('../repositories/service.repository');
const constants = require('../utils/constants');
const serviceSer = require('../services/service.service');

module.exports.getListMajor = async () => {
    let majorData = await major.findAll().then().catch(err => console.log(err));
    return majorData;
}
module.exports.getMajorDetail = async (role_id) => {
    let majorData = {};
    if (role_id == constants.ROLE_ADMIN) {
        majorData = await MajorRepo.getAllMajor();
    } else if (role_id == constants.ROLE_CUSTOMER || role_id == constants.ROLE_REPAIRER) {
        majorData = await MajorRepo.getMajorDetail();
    }  
    //.then().catch(err => console.log(err))
    return majorData;
}

module.exports.createMajor = async (image, name) => {
    await MajorRepo.createMajor(image, name);
    return await MajorRepo.getAllMajor();
}

module.exports.updateMajor = async (id, image, name) => {
    await MajorRepo.updateMajor(id, image, name);
    return await MajorRepo.getAllMajor();
}

module.exports.deactivateMajor = async (id) => {
    let serviceList = await serviceRepo.getAllServiceByMajorId(id);
    if (serviceList.length > 0) {
        for (const service of serviceList) {
            serviceSer.deactivateService(service.id, id);
        }
    }
    await MajorRepo.changeMajorStatus(id, constants.NOT_ACTIVE);
    return await MajorRepo.getAllMajor();
}

module.exports.activeMajor = async (id) => {
    let serviceList = await serviceRepo.getAllServiceByMajorId(id);
    if (serviceList.length > 0) {
        for (const service of serviceList) {
            serviceSer.activeService(service.id, id);
        }
    }
    await MajorRepo.changeMajorStatus(id, constants.ACTIVE);
    return await MajorRepo.getAllMajor();
}