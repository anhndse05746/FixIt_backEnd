// const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/request_status');
const Status = require('../models/status');
const RequestIssue = require('../models/request_issues');
const ReparingRequest = require('../models/repairing_request');
const { Op } = require("sequelize");

// lay ra data cua major (service, issues)
module.exports.getRequestDetail = async (user_id) => {

    const request = await ReparingRequest.findAll({
        include: [
            {
                model: Service, attributes: ['id', 'name'],
                include: [
                    {
                        model: Issues,
                        attributes: ['id', 'name'],
                    }]
            },
            {
                model: User, as: 'Customer', attributes: ['id', 'name'],
            },
            { model: User, as: 'Repairer', attributes: ['id', 'name'] },
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
                    },
                ],

            },

        ],
        where: {
            [Op.or]: [{ customer_id: user_id }, { repairer_id: user_id }]
        },
        order: [['updatedAt', 'DESC']],
    }
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.getLastRequestByUID = async (id) => {
    const request = await ReparingRequest.findOne({
        include: [
            {
                model: Service, attributes: ['id', 'name'],
            },
            {
                model: User, as: 'Customer', attributes: ['id', 'name'],
            },
            { model: User, as: 'Repairer', attributes: ['id', 'name'] },
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
            [Op.or]: [{ customer_id: id }, { repairer_id: id }]
        },
        order: [['createdAt', 'DESC']]
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}



module.exports.createRequest = async (customer_id, repairer_id, service_id, schedule_time, estimate_time, estimate_price, description, address, city, district) => {
    // console.log(estimate_time);
    const request = await ReparingRequest.create(
        {
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


