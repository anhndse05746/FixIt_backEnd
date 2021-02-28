const userRepository = require('../repositories/user.repository');
const user = require('../models/user');
const constants = require('../utils/constants');
const jwt = require('../helpers/jwt.helper');

module.exports.userAuthentication = async (phone, password) => {
    let payload
    let userData = await user.findOne({
        where: {
            phone_number: phone
        }
    })
        .then(user => {
            if (user) {
                console.log('user')
                if (user.password == password) {
                    let token = jwt.genreateToken(user.user_id, user.phone_number);
                    payload = {
                        phone: user.phone_number,
                        name: user.name,
                        role: user.role_id,
                        token: `Bearer ${token}`
                    }
                }
                else {
                    // "Password incorrect"
                    throw new Error("Password incorrect")
                }
            }
            else {
                // "This phone number is not registered"
                throw new Error("This phone number is not registered")
            }
        }).catch(err => {
            throw new Error(err.message)
        });

    return payload
}
