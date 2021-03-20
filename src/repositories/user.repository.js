const pool = require('../databases/dbConnection');
const User = require('../models/user');
const constants = require('../utils/constants');
const User_Address = require('../models/user_address');

let users = {};

users.getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query(`Select * from user`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`Select * from user where user_id = ?`, id, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.checkRegistered = async (phone, role_id) => {
    let result = await User.findOne({
        where: {
            phone_number: phone,
            role_id: role_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    })
    return result;
}

users.getUsersByPhone = async (phone) => {
    let userData = await User.findOne({
        where: {
            phone_number: phone
        }
    })
        .then().catch(err => {
            throw new Error(err.message);
        });
}

users.getAllUser = async (role_id) => {
    let getAllCustomer = await User.findAll({
        where: {
            role_id: role_id,
        },
        order: [
            ['id', 'ASC']
        ]
    }).then().catch(err => {
        throw new Error(err.message);
    });
    return getAllCustomer;
};


users.updateUser = async (phone, role_id, name, dob, email, image) => {
    let user = await users.checkRegistered(phone, role_id);
    if (user) {
        const newUser = {
            name: name,
            dob: dob,
            email: email,
            image: image
        }
        await User.update(newUser, {
            where: {
                phone_number: phone,
                role_id: role_id
            }
        }).then().catch(err => {
            throw new Error(err.message);
        });
        return newUser;
    } else {
        return false;
    }
}

users.resetPassword = async (phone, role_id, newPassword) => {
    let user = await users.checkRegistered(phone, role_id);
    if (user) {
        await User.update({
            password: newPassword
        }, {
            where: {
                phone_number: phone,
                role_id: role_id
            }
        }).then().catch(err => {
            throw new Error(err.message);
        });
        return true;
    } else {
        return false;
    }
}

users.getOldPassword = async (phone, role_id) => {
    let user = await users.checkRegistered(phone, role_id);
    if (user) return user.password;
}

users.updateDevice = async (phone, role_id, device_token) => {
    await User.update({
        device_token: device_token
    }, {
        where: {
            phone_number: phone,
            role_id: role_id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

users.getAddressList = async (id) => {
    return await User_Address.findAll({
        where: {
            user_id: id
        }
    }).then().catch(err => {
        throw new Error(err.message);
    });
}

module.exports = users;