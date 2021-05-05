// const Major = require('../models/major');
const Sequelize = require('sequelize');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/request_status');
const Status = require('../models/status');
const RequestIssue = require('../models/request_issues');
const ReparingRequest = require('../models/repairing_request');
const { Op } = require("sequelize");
const Invoice = require('../models/invoice');
const pool = require('../databases/dbConnection');
const constants = require('../utils/constants');
// lay ra data cua major (service, issues)

module.exports.getAllRequest = async () => {

    const request = await ReparingRequest.findAll({
        include: [{
            model: Service,
            attributes: ['id', 'name'],
            include: [{
                model: Issues,
                attributes: ['id', 'name', 'estimate_price'],
            }]
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
            include: [
                {
                    model: Issues,
                    attributes: ['id', 'name', 'estimate_price'], order: [['updatedAt', 'DESC']],
                },
            ],

        },
        {
            model: Invoice,
        },

        ],
        order: [
            ['updatedAt', 'DESC']
        ],
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.getRequestDetail = async (request_id) => {

    const request = await ReparingRequest.findOne({
        include: [{
            model: Service,
            attributes: ['id', 'name'],
            include: [{
                model: Issues,
                attributes: ['id', 'name', 'estimate_price'],
            }]
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
            include: [
                {
                    model: Issues,
                    attributes: ['id', 'name', 'estimate_price'], order: [['updatedAt', 'DESC']],
                },
            ],

        },
        {
            model: Invoice,
        },

        ],
        where: {
            id: request_id
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
            order: [['updatedAt', 'DESC']],
            include: [{ model: Status }]
        }, {
            model: RequestIssue,
            include: [
                {
                    model: Issues,
                    attributes: ['id', 'name'], order: [['updatedAt', 'DESC']],
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
module.exports.getListRequestFindingRepairer = async (city, major) => {

    return await pool.query('SELECT re.id, re.customer_id, re.repairer_id, re.service_id, se.`name` AS serviceName, se.major_id, re.schedule_time, re.estimate_time, '
        + 're.estimate_price, re.description, re.address, re.district, re.city, temp.currentStatus, st.`name` as statusName FROM repairing_request re JOIN '
        + '(SELECT R.request_id AS request_id, R.countStatus AS currentStatus, request_status.updatedAt as time FROM (SELECT MAX(request_status.status_id) AS countStatus, '
        + 'request_status.request_id AS request_id FROM request_status GROUP BY request_status.request_id) AS R LEFT OUTER JOIN request_status '
        + 'ON R.request_id = request_status.request_id AND R.countStatus = request_status.status_id WHERE R.countStatus = 1 ORDER BY request_status.updatedAt DESC) AS temp '
        + 'ON re.id = temp.request_id JOIN services se ON re.service_id = se.id JOIN status st ON temp.currentStatus = st.id WHERE re.city = $city AND re.service_id IN '
        + '(SELECT id FROM services WHERE major_id = $major) ORDER BY temp.time DESC ', {
        bind: {
            city: city,
            major: major,
            requestPerPage: constants.NUMBER_REQUEST_PER_PAGE
        },
        type: Sequelize.QueryTypes.SELECT
    }).then().catch(err => {
        throw new Error(err.message);
    });

}
module.exports.getListRequestByStatusForCustomer = async (customer_id, role, page, status_id) => {
    let where = '';
    if (role === constants.ROLE_CUSTOMER) {
        where = 're.customer_id = $customer_id'
    } else if (role === constants.ROLE_REPAIRER) {
        where = 're.repairer_id = $customer_id'
    }

    let status = status_id.length > 1 ? 'OR R.countStatus = $status_id_2 OR R.countStatus = $status_id_3 ' : '';

    return await pool.query('SELECT re.id, re.customer_id, re.repairer_id, re.service_id, se.`name` AS serviceName, se.major_id, re.schedule_time, re.estimate_time, re.estimate_price, re.description, re.address, re.district, re.city, temp.currentStatus, st.`name` as statusName FROM repairing_request re JOIN (SELECT R.request_id AS request_id, R.countStatus AS currentStatus, request_status.updatedAt ' +
        'as time FROM (SELECT MAX(request_status.status_id) AS countStatus, request_status.request_id AS request_id FROM request_status GROUP BY request_status.request_id) AS R LEFT OUTER JOIN request_status ON R.request_id = request_status.request_id AND R.countStatus = request_status.status_id WHERE R.countStatus = $status_id_1 ' + status +
        'ORDER BY request_status.updatedAt DESC) AS temp ON re.id = temp.request_id JOIN services se ON re.service_id = se.id JOIN `status` st ON temp.currentStatus = st.id WHERE ' + where +
        ' ORDER BY temp.time DESC', {
        bind: {
            customer_id: customer_id,
            status_id_1: status_id[0],
            status_id_2: status_id[1],
            status_id_3: status_id[2]
        },
        type: Sequelize.QueryTypes.SELECT
    }).then().catch(err => {
        throw new Error(err.message);
    });
}