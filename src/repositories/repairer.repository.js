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

repairer.getVerifyRepairerByUID = async (repairer_id) => {
    return await Repairer.findOne({
        where: {
            id: repairer_id,
            is_verify: true
        }
    }).then().catch(err => {
        console.log(err);
    });
};

module.exports = repairer;