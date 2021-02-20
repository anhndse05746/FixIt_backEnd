const userRepository = require('../repositories/user.repository');

module.exports.getListUsers = async () => {
    let userData = await userRepository.getAll();

    return userData;
}