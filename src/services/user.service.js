const userRepository = require('../repositories/user.repository');
const user = require('../models/user');
const constants = require('../utils/constants');

module.exports.getListUsers = () => {
    let userData = user.findAll().then().catch(err => console.log(err));
    return userData;
}

module.exports.getUsersById = (id) => {
    let userData = user.findByPk(id).then().catch(err => console.log(err));
    return userData;
}

module.exports.getUsersByPhone = (phone) => {
    let userData = user.findOne({
        where: {
            phone_number: phone
        }
    })
        .then().catch(err => console.log(err));

    return userData;
}