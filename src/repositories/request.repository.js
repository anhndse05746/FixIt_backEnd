// const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/status_history');
const Status = require('../models/status');
const IssuesList = require('../models/issues_list');
const ReparingRequest = require('../models/repairing_request');
const { Op } = require("sequelize");

// lay ra data cua major (service, issues)
module.exports.getRequestDetail = async () => {
    const request = await ReparingRequest.findAll({
        include: [
            { model: Service, attributes: ['id', 'name'], },
            { model: User, as: 'Customer', attributes: ['id', 'name'] }, //, attributes: ['id', 'name'],
            { model: User, as: 'Repairer', attributes: ['id', 'name'] }, //, attributes: ['id', 'name'],
            {
                model: StatusHistory,
                limit: 1,
                order: [['updatedAt', 'DESC']],
                include: [{ model: Status }]
            }, {
                model: IssuesList,
                include: [
                    {
                        model: Issues,
                        attributes: ['id', 'name'],
                    }]
            }

        ],

    }
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.getLastRequestByUID = async (id) => {
    const request = await ReparingRequest.findOne({

        where: {
            [Op.or]: [{ customer_id: id }, { repairer_id: id }]
        },
        order: [['createdAt', 'DESC']]
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}
module.exports.insertListIssues = async (issues_list) => {

    const request = await IssuesList.bulkCreate(
        issues_list
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}
module.exports.insertStatusHistory = async (request_id, status_id) => {

    const request = await StatusHistory.create(
        {
            request_id: request_id,
            status_id: status_id,
        }
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}


module.exports.createRequest = async (customer_id, repairer_id, service_id, schedule_time, estimate_time, estimate_price, description, address) => {
    console.log(estimate_time);
    const request = await ReparingRequest.create(
        {
            customer_id: customer_id,
            repairer_id: repairer_id,
            service_id: service_id,
            schedule_time: schedule_time,
            estimate_time: estimate_time,
            estimate_price: estimate_price,
            description: description,
            address: address
        }

    ).then().catch(err => {
        console.log(err)
    });
    return request;
}


