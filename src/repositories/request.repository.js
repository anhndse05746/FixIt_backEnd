// const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');
const User = require('../models/user');
const StatusHistory = require('../models/status_history');
const Status = require('../models/status');
const IssuesList = require('../models/issues_list');

const ReparingRequest = require('../models/repairing_request');

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
                
                order: [ [ 'time', 'DESC' ]],
                
                
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
        // [
        //     {
        //         model: Service,
        //         attributes: ['id', 'name'],
        //         model: User,
        //         attributes: ['id', 'name'],
        //         model: StatusHistory,
        //         attributes: ['id', 'time'],
        //         include: [
        //             {
        //                 model: Status,
        //                 attributes: ['id', 'name'],
        //             }
        //         ],
        //         model: IssuesList,
        //         attributes: ['id'],
        //         include: [
        //             {
        //                 model: Issues,
        //                 attributes: ['id', 'name'],
        //             }
        //         ],
        //     }

        // ],
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}

