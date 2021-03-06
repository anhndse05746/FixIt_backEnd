
const major = require('../models/major');
const MajorRepo = require("../repositories/major.repository")

module.exports.getListMajor = async () => {
    let majorData = await major.findAll().then().catch(err => console.log(err));
    return majorData;
}
module.exports.getMajorDetail = async () => {

    let majorData = await MajorRepo.getMajorDetail();
    //.then().catch(err => console.log(err))
    return majorData;
}
