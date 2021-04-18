const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');
const constants = require('../utils/constants');

// lay ra data cua major (service, issues)
module.exports.getMajorDetail = async () => {
    const major = await Major.findAll({
        where: {
            is_active: constants.ACTIVE
        },
        include: [
            {
                model: Service,
                required: false,
                where: {
                    is_active: constants.ACTIVE
                },
                attributes: ['id', 'name', 'is_active'],
                order: [
                    ['id', 'ASC'],
                ],
                include: {
                    model: Issues,
                    required: false,
                    where: {
                        is_active: constants.ACTIVE
                    },
                    attributes: ['id', 'name', 'estimate_fix_duration', 'estimate_price', 'is_active'],
                    order: [
                        ['id', 'ASC'],
                    ]
                },
            }
        ],
        order: [
            ['id', 'ASC'],
        ]
    }).then().catch(err => {
        console.log(err)
    });
    return major;
}

module.exports.getAllMajor = async () => {
    const major = await Major.findAll({
        include: [
            {
                model: Service,
                required: false,
                attributes: ['id', 'name', 'is_active'],
                order: [
                    ['id', 'ASC'],
                ],
                include: {
                    model: Issues,
                    required: false,
                    attributes: ['id', 'name', 'estimate_fix_duration', 'estimate_price', 'is_active'],
                    order: [
                        ['id', 'ASC'],
                    ]
                },
            }
        ],
        order: [
            ['id', 'ASC'],
        ]
    }).then().catch(err => {
        console.log(err)
    });
    return major;
}

module.exports.getMajorById = async (id) => {
    return await Major.findOne({
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports.createMajor = async (image, name) => {
    return await Major.create({
        image: image,
        name: name,
        is_active: constants.ACTIVE
    }).then(major => {
        console.log(major);
    }).catch(err => {
        throw new Error(err.message);
    });
}

module.exports.updateMajor = async (id, image, name) => {
    return await Major.update({
        image: image,
        name: name
    }, {
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports.changeMajorStatus = async (id, status) => {
    return await Major.update({
        is_active: status
    },{
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}