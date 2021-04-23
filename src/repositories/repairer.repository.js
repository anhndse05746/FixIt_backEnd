const pool = require('../databases/dbConnection');
const User = require('../models/user');
const constants = require('../utils/constants');
const Repairer = require('../models/repairer');
const sequelize = require('sequelize')
const cityOfVN = require('../utils/cityOfVietNam').cityOfVN;

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

repairer.updateProfile = async (user_id, district, city, address, identity_card_number) => {
    newRepairer = {
        district: district,
        city: city,
        address: address,
        identity_card_number: identity_card_number
    }
    await Repairer.update(newRepairer, {
        where: {
            id: user_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
    return newRepairer;


}
repairer.getRepairer = async (repairer_id) => {
    return await User.findOne({
        where: {
            id: repairer_id
        },
        include: [{
            model: Repairer,
            // required: true
        }]
    }).then().catch(err => {
        console.log(err);
    });
};

repairer.getRequestList = async (repairer_id) => {
    const rpr = await repairer.getRepairer(repairer_id)
    const query = 'SELECT rq.id, rq.customer_id, rq.service_id, rq.estimate_time, rq.estimate_price,  rq.schedule_time, rs.currentStatus,s.`name` as statusName, sv.`name` as serviceName FROM repairing_request rq JOIN (SELECT request_id, MAX(`status_id`) AS currentStatus FROM request_status GROUP BY `request_id`) as rs ON rq.id = rs.request_id JOIN `status` s ON s.id = rs.currentStatus JOIN services sv ON sv.id = rq.service_id  WHERE rs.currentStatus = $currentStatus AND rq.city = $city'

    // console.log(rpr)
    let rprCity = cityOfVN.find(cityVN => cityVN.Id == rpr.repairer.city).Name

    return await pool.query(query, {
        bind: {
            currentStatus: constants.STATUS_REQUEST_FINDING,
            city: rprCity
        },
        type: sequelize.QueryTypes.SELECT
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

repairer.getListNotVerified = async () => {
    return await Repairer.findAll({
        where: {
            is_verify: constants.REPAIRER_NOT_VERIFIED
        },
        order: [
            ['id', 'ASC']
        ],

        include: [{
            model: User,
        }]
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

repairer.approveCV = async (repairer_id) => {
    return await Repairer.update({
        is_verify: constants.REPAIRER_VERIFIED
    }, {
        where: {
            id: repairer_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports = repairer;