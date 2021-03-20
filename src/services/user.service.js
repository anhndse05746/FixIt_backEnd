const userRepository = require('../repositories/user.repository');
const user = require('../models/user');
const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');

module.exports.userAuthentication = async (phone, password, role_id, device_token) => {
    let payload;
    let userData = await user.findOne({
        where: {
            phone_number: phone,
            role_id: role_id
        }
    })
        .then(async user => {
            if (user) {
                console.log('user');
                if (user.password == password) {
                    let token = jwt.genreateToken(user.id, user.phone_number, user.role_id);
                    let address_list = await userRepository.getAddressList(user.id);
                    payload = {
                        phone: user.phone_number,
                        name: user.name,
                        email: user.email,
                        role: user.role_id,
                        token: `Bearer ${token}`,
                        address_list: address_list
                    };
                    if (user.device_token !== device_token) {
                        //update user device token
                        userRepository.updateDevice(phone, role_id, device_token)
                    }
                }
                else {
                    // "Password incorrect"
                    throw new Error(constants.PASSWORD_INCORRECT);
                }
            }
            else {
                // "This phone number is not registered"
                throw new Error(constants.NOT_REGISTERRED);
            }
        }).catch(err => {
            throw new Error(err.message);
        });

    return payload;
};

module.exports.checkRegisteredPhoneNumber = async (phone, role_id) => {
    let message;
    let checkResult = await userRepository.checkRegistered(phone, role_id);
    if (!checkResult) return message = 'Phone number is not registered';
    else return message = 'Phone number is registed';
}

module.exports.getAllCustomer = async () => {
    return await userRepository.getAllUser(constants.ROLE_CUSTOMER);
};

module.exports.updateUser = async (phone, role_id, name, dob, email, image) => {
    let result = await userRepository.updateUser(phone, role_id, name, dob, email, image);
    return result;
};

module.exports.resetPassword = async (phone, role_id, newPassword) => {
    let result = await userRepository.resetPassword(phone, role_id, newPassword);
    return result;
}

module.exports.changePassword = async (phone, role_id, oldPassword, newPassword) => {
    let message;
    let passwordInDB = await userRepository.getOldPassword(phone, role_id);

    if (oldPassword === passwordInDB) {
        let resultOfChangePassword = await userRepository.resetPassword(phone, role_id, newPassword);
        message = 'success';
    } else if (oldPassword !== passwordInDB) {
        message = 'Incorrect password'
    }
    return message;
}