const pool = require('./dbConnection');

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


module.exports = users;