const User_Address = require('../models/user_address');
const constants = require('../utils/constants');

let user_address = {};

user_address.createAddress = async (user_id, address, district, city) => {
    return await User_Address.create({
        user_id: user_id,
        address: address,
        district: district, 
        city: city
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

user_address.getAddressByUserID = async (user_id) => {
    return await User_Address.findAll({
        where: {
            user_id: user_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports = user_address;
