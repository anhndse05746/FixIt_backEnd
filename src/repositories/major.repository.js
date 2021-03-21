const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');

// lay ra data cua major (service, issues)
module.exports.getMajorDetail = async () => {
    const major = await Major.findAll({
        include: [
            {
                model: Service,
                attributes: ['id', 'name'],
                order: [
                    ['id', 'ASC'],
                ],
                include: {
                    model: Issues,
                    attributes: ['id', 'name', 'estimate_fix_duration', 'estimate_price'],
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
        name: name
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

module.exports.deleteMajor = async (id) => {
    return await Major.destroy({
        where: {
            id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}