const user = require('../models/user');
const userRegister = require('../models/user');
const constants = require('../utils/constants');
const Repairer = require('../models/repairer');
const cityOfVN = require('../utils/cityOfVietNam').cityOfVN

module.exports.register = async (phone_number, password, name, role_id, email, identity_card,
    major_id, district, city) => {
    let cityId
    let districtId
    let cityVN = cityOfVN.find(cityVN => cityVN.Name == city)
    if (cityVN) {
        let districtVN = cityVN.Districts.find(districtVN => districtVN.Name == district)
        cityId = cityVN.Id
        districtId = districtVN.Id
    }
    let registerCheck = await user.findOne({
        where: {
            phone_number: phone_number,
            role_id: role_id
        }
    }).then(async (user) => {
        if (!user) {
            let resultRegister = await userRegister.create({
                phone_number: phone_number,
                password: password,
                name: name,
                role_id: role_id,
                email: email,
                is_active: true
            }).then().catch(err => {
                throw new Error(err.message);
            });
            if (role_id == 2) {
                let registeredUser = await userRegister.findOne({
                    where: {
                        phone_number: phone_number,
                        role_id: role_id
                    }
                }).then().catch(err => {
                    throw new Error(err.message);
                });
                let registerRepairer = await Repairer.create({
                    id: registeredUser.id,
                    major_id: major_id,
                    identity_card_number: identity_card,
                    is_verify: 0,
                    district: districtId,
                    city: cityId
                }).then().catch(err => {
                    throw new Error(err.message);
                });
            }
        } else {
            throw new Error(constants.REGISTERED_PHONENUMBER);
        }
    }).catch(err => {
        throw new Error(err.message);
    });
};

