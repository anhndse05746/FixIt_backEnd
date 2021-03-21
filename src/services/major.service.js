const major = require('../models/major');
const MajorRepo = require("../repositories/major.repository")
const serviceRepo = require('../repositories/service.repository');
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
    let countService = await serviceRepo.countServiceByMajorId(id);
    if(countService != 0) {
        return constants.FK_ERROR;
    } else {
        result = await MajorRepo.deleteMajor(id).then().catch();
    }
    return result;
}