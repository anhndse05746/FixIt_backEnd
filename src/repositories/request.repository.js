// const Major = require('../models/major');
const Sequelize = require('sequelize');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/request_status');
const Status = require('../models/status');
const RequestIssue = require('../models/request_issues');
const ReparingRequest = require('../models/repairing_request');
const pool = require('../databases/dbConnection');
const constants = require('../utils/constants');
const {
    Op
} = require("sequelize");

// lay ra data cua major (service, issues)
module.exports.getRequestDetail = async (user_id) => {

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
                include: [{
                    model: Issues,
                    attributes: ['id', 'name'],
                }]
            },

        ],
        where: {
            [Op.or]: [{
                customer_id: user_id
            }, {
                repairer_id: user_id
            }]
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

module.exports.getListRequestByStatusForCustomer = async (customer_id, page, status_id_1, status_id_2, status_id_3) => {
    return await pool.query('SELECT * FROM repairing_request JOIN (SELECT R.request_id AS request_id, R.countStatus AS currentStatus, request_status.updatedAt as time FROM ' +
    '(SELECT MAX(request_status.status_id) AS countStatus, request_status.request_id AS request_id FROM request_status GROUP BY request_status.request_id) AS R ' +
    'LEFT OUTER JOIN request_status ON R.request_id = request_status.request_id AND R.countStatus = request_status.status_id WHERE R.countStatus = $status_id_1 OR R.countStatus = $status_id_2 OR R.countStatus = $status_id_3 ' +
    'ORDER BY request_status.updatedAt DESC) AS temp ON repairing_request.id = temp.request_id WHERE repairing_request.customer_id = $customer_id ' +
    'ORDER BY temp.time DESC ' + 
    'LIMIT $page, $requestPerPage',{
        bind: { 
            customer_id: customer_id,
            status_id_1: status_id_1,
            status_id_2: status_id_2,
            status_id_3: status_id_3,
            page: page,
            requestPerPage: constants.NUMBER_REQUEST_PER_PAGE   
        }, 
        type: Sequelize.QueryTypes.SELECT
    }).then().catch(err => {
        throw new Error(err.message);
    });
}