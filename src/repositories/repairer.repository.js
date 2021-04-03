const pool = require('../databases/dbConnection');
const User = require('../models/user');
const constants = require('../utils/constants');
const Repairer = require('../models/repairer');

let repairer = {};

repairer.getAllRepairer = async () => {
    return await User.findAll({
        where: {
            role_id: constants.ROLE_REPAIRER,
        },
        order: [
            ['id', 'ASC']
        ],

        include: [{
            model: Repairer, 
            // required: true
        }]
    }).then().catch(err => {
        console.log(err);
    });
};

repairer.getListNotVerified = async () => {
    return await Repairer.findAll({
        where: {
            is_verify: constants.REPAIRER_NOT_VERIFIED
        }, 
        order: [
            ['id', 'ASC']
        ],

        include: [{
            model: Repairer, 
        }]
    })
}

module.exports = repairer;