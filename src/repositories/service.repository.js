const Service = require('../models/services');
const constants = require('../utils/constants');

let services = {};

services.createService = async (name, major_id, image) => {
    return await Service.create({
        name: name,
        major_id: major_id,
        image: image,
        is_active: constants.ACTIVE
    }).then().catch(err => {
        throw new Error(err.message)
    });
}

services.updateService = async (id, name, major_id, image) => {
    return await Service.update({
        name: name,
        major_id: major_id,
        image: image
    }, {
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

services.changeServiceStatus = async (id, status) => {
    return await Service.update({
        is_active: status
    },{
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

services.getServiceById = async (id) => {
    return await Service.findOne({
        where: {
            id: id,
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

services.countServiceByMajorId = async (major_id) => {
    return await Service.count({
        where: {
            major_id: major_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

services.getAllServiceByMajorId = async (major_id) => {
    return await Service.findAll({
        where: {
            major_id: major_id,
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports = services;