const userRepository = require('../repositories/user.repository');
const user = require('../models/User')

module.exports.getListUsers = () => {
    let userData = user.findAll().then().catch(err => console.log(err));
    return userData;
}

module.exports.getUsersById = (id) => {
    let userData = user.findByPk(id).then().catch(err => console.log(err));
    return userData;
}