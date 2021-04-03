const repairer = require('../repositories/repairer.repository');
const repairerRepo = require('../repositories/repairer.repository');

module.exports.getAllRepairer = async () => {
    return await repairerRepo.getAllRepairer();
}

module.exports.getAllRepairerNotVerified = async () => {
    return await repairerRepo.getListNotVerified();

}
module.exports.getRequestList = (repairer_id) => {
    return repairerRepo.getRequestList(repairer_id);
}