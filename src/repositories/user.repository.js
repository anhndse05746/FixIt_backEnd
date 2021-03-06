const pool = require('../databases/dbConnection');
const User = require('../models/user');
const constants = require('../utils/constants');

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

module.exports = users;