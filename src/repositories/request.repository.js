// const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/request_status');
const Status = require('../models/status');
const RequestIssue = require('../models/request_issues');
const ReparingRequest = require('../models/repairing_request');
<<<<<<< HEAD
const {
    Op
} = require("sequelize");
=======
const { Op } = require("sequelize");
const Invoice = require('../models/invoice');
>>>>>>> 3714582ac65be66976a8e2702654a79093b243bf

// lay ra data cua major (service, issues)
module.exports.getRequestDetail = async (request_id) => {

    const request = await ReparingRequest.findAll({
        include: [{
                model: Service,
                attributes: ['id', 'name'],
                include: [{
                    model: Issues,
                    attributes: ['id', 'name'],
                }]
            },
            {
                model: User,
                as: 'Customer',
                attributes: ['id', 'name'],
            },
            {
                model: User,
                as: 'Repairer',
                attributes: ['id', 'name']
            },
            {
                model: StatusHistory,
                limit: 1,
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: [{
                    model: Status
                }]
            }, {
                model: RequestIssue,
<<<<<<< HEAD
                include: [{
                    model: Issues,
                    attributes: ['id', 'name'],
                }]
=======
                include: [
                    {
                        model: Issues,
                        attributes: ['id', 'name'], order: [['updatedAt', 'DESC']],
                    },
                ],

            },
            {
                model: Invoice,
>>>>>>> 3714582ac65be66976a8e2702654a79093b243bf
            },

        ],
        where: {
<<<<<<< HEAD
            [Op.or]: [{
                customer_id: user_id
            }, {
                repairer_id: user_id
            }]
=======
            id: request_id
>>>>>>> 3714582ac65be66976a8e2702654a79093b243bf
        },
        order: [
            ['updatedAt', 'DESC']
        ],
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.getLastRequestByUID = async (id) => {
    const request = await ReparingRequest.findOne({
        include: [{
                model: Service,
                attributes: ['id', 'name'],
            },
            {
                model: User,
                as: 'Customer',
                attributes: ['id', 'name'],
            },
            {
                model: User,
                as: 'Repairer',
                attributes: ['id', 'name']
            },
            {
                model: StatusHistory,
                limit: 1,
<<<<<<< HEAD
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: [{
                    model: Status
                }]
            }, {
                model: RequestIssue,
                include: [{
                    model: Issues,
                    attributes: ['id', 'name'],
                }]
=======
                order: [['updatedAt', 'DESC']],
                include: [{ model: Status }]
            }, {
                model: RequestIssue,
                include: [
                    {
                        model: Issues,
                        attributes: ['id', 'name'], order: [['updatedAt', 'DESC']],
                    }]
>>>>>>> 3714582ac65be66976a8e2702654a79093b243bf
            },

        ],
        where: {
            [Op.or]: [{
                customer_id: id
            }, {
                repairer_id: id
            }]
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}
<<<<<<< HEAD
module.exports.insertRequestIssues = async (request_issues) => {

    const request = await RequestIssue.bulkCreate(
        request_issues
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}
module.exports.updateStatus = async (request_id, status_id, cancel_by, cancel_reason) => {

    const request = await StatusHistory.create({
        request_id: request_id,
        status_id: status_id,
        cancel_by: cancel_by,
        cancel_reason: cancel_reason
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}
=======

>>>>>>> 3714582ac65be66976a8e2702654a79093b243bf


module.exports.createRequest = async (customer_id, repairer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, city, district) => {

    const request = await ReparingRequest.create({
            customer_id: customer_id,
            repairer_id: repairer_id,
            service_id: service_id,
            schedule_time: schedule_time,
            estimate_time: estimate_time,
            estimate_price: estimate_price,
            description: description,
            address: address,
            city: city,
            district: district
        }

    ).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.updateRequest = async (request_id, repairer_id) => {
    return await ReparingRequest.update({
        repairer_id: repairer_id
    }, {
        where: {
            id: request_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}


module.exports.getRequestByID = async (request_id) => {
    const request = await ReparingRequest.findOne({
        include: [{
                model: Service,
                attributes: ['id', 'name'],
            },
            {
                model: User,
                as: 'Customer',
                attributes: ['id', 'name', 'phone_number'],
            },
            {
                model: User,
                as: 'Repairer',
                attributes: ['id', 'name', 'phone_number']
            },
            {
                model: StatusHistory,
                limit: 1,
                order: [
                    ['updatedAt', 'DESC']
                ],
                include: [{
                    model: Status
                }]
            }, {
                model: RequestIssue,
                include: [{
                    model: Issues,
                    attributes: ['id', 'name'],
                }]
            },

        ],
        where: {
            id: request_id
        },
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}