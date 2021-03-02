const user = require('../models/user');
const userRegister = require('../models/user');
const constants = require('../utils/constants');

module.exports.regiseter = async (id, phone_number, password, name, role_id, email) => {
    
    let registerCheck = await user.findOne({
        where: {
            phone_number: phone_number,
        }
    }).then( async (user) => {
        if(!user) {
            let resultRegister = await userRegister.create({
                phone_number: phone_number,
                password: password,
                name: name,
                role_id: role_id,
                email: email,
                is_active: true
            }).then(userRegister => {
                if(userRegister) {
                    return true;
                } else {
                    throw new Error(constants.MESS_ERROR);
                }
            });
        } else {
            throw new Error(constants.REGISTERED_PHONENUMBER);
        }
    }).catch(err => {
        throw new Error(err.message);
    });

    
};

