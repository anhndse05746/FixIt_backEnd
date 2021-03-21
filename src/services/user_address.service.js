const user_addressRepo = require('../repositories/user_address.repository');

module.exports.createAddress = async (user_id, address, district, city) => {
    let address_list = await user_addressRepo.getAddressByUserID(user_id).then().catch(err => { throw new Error(err.message); });
    let is_dupilcate = false;
    for (const item of address_list) {
        if (item.city == city && item.district == district && item.address == address) {
            is_dupilcate = true;
            console.log(is_dupilcate);
            return 'New address is duplicated';
        }
    }
    return await user_addressRepo.createAddress(user_id, address, district, city).then().catch(err => { throw new Error(err.message); });
}

module.exports.getAddressByUser = async (user_id) => {
    let address_list = await user_addressRepo.getAddressByUserID(user_id).then().catch(err => { throw new Error(err.message); });
    return address_list;
}