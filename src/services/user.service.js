const userRepository = require('../repositories/user.repository');
const user = require('../models/user');
const repairerRepo = require('../repositories/repairer.repository');
const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');
const cityOfVN = require('../utils/cityOfVietNam').cityOfVN;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)
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
                //compare password in database with password recieved from api
                let comparePassword = await bcrypt.compare(password, user.password);
                if (comparePassword) {
                    let token = jwt.genreateToken(user.id, user.phone_number, user.role_id);
                    let address_list = [];
                    if (role_id == 3) {
                        address_list = await userRepository.getAddressList(user.id);
                    }
                    let repairer = {}
                    let is_verify;
                    let address;
                    let city;
                    let district;
                    let major;
                    let identity_card_number;
                    //Check if user is an repairer
                    if (role_id == constants.ROLE_REPAIRER) {
                        //get repairer information 
                        repairer = await repairerRepo.getRepairer(user.id)
                        is_verify = repairer.repairer.is_verify;
                        address = repairer.repairer.address;
                        city = repairer.repairer.city;
                        district = repairer.repairer.district;
                        major = repairer.repairer.major_id
                        identity_card_number = repairer.repairer.identity_card_number
                    }

                    payload = {
                        id: user.id,
                        phone: user.phone_number,
                        name: user.name,
                        email: user.email,
                        role: user.role_id,
                        token: `Bearer ${token}`,
                        address_list: address_list,
                        address: address,
                        is_verify: is_verify,
                        city: city,
                        district: district,
                        is_active: user.is_active,
                        major_id: major,
                        identity_card_number: identity_card_number
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


module.exports.changeUserActiveStatus = async (user_id, role_id, status) => {
    let result
    await userRepository.changeActiveStatus(user_id, status);
    if (role_id == constants.ROLE_REPAIRER) {
        result = await repairerRepo.getAllRepairer()

        if (status == constants.NOT_ACTIVE) {
            await repairerRepo.deactiveRepairer(user_id);
        } else {
            await repairerRepo.approveCV(user_id);
        }
    }
    else {
        result = await userRepository.getAllUser()
    }
    // let result = await userRepository.getUserByID(user_id);
    return result;
}

module.exports.checkRegisteredPhoneNumber = async (phone, role_id) => {
    let message;
    let checkResult = await userRepository.checkRegistered(phone, role_id);
    if (!checkResult) return message = 'Phone number is not registered';
    else return message = 'Phone number is registed';
}

module.exports.getAllCustomer = async () => {
    return await userRepository.getAllUser();
};

module.exports.updateUser = async (user_id, phone, role_id, name, email, image, district, city, address, identity_card_number) => {
    let result = await userRepository.updateUser(phone, role_id, name, email, image);
    if (role_id == constants.ROLE_REPAIRER) {
        //get repairer information 
        await repairerRepo.updateProfile(user_id, district, city, address, identity_card_number)
    }
    return result;
};

module.exports.resetPassword = async (phone, role_id, newPassword) => {
    let message;
    let passwordInDB = await userRepository.getOldPassword(phone, role_id);
    let comparePassword = await bcrypt.compare(newPassword, passwordInDB);
    if (comparePassword) {
        message = constants.PASSWORD_DUPPLICATE;
    } else {
        newPassword = await bcrypt.hash(newPassword, salt);
        let result = await userRepository.resetPassword(phone, role_id, newPassword);
        message = true
    }
    return message
}

module.exports.changePassword = async (phone, role_id, oldPassword, newPassword) => {
    let message;
    let passwordInDB = await userRepository.getOldPassword(phone, role_id);
    let comparePassword = await bcrypt.compare(oldPassword, passwordInDB);
    if (comparePassword) {
        newPassword = await bcrypt.hash(newPassword, salt);
        let resultOfChangePassword = await userRepository.resetPassword(phone, role_id, newPassword);
        message = 'success';
    } else {
        message = 'Incorrect password'
    }
    return message;
}