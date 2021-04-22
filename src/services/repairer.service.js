const repairer = require('../repositories/repairer.repository');
const repairerRepo = require('../repositories/repairer.repository');

module.exports.getAllRepairer = () => {
    return repairerRepo.getAllRepairer();
}

module.exports.checkVerifyReparier = async (repairer_id) => {
    return repairerRepo.getVerifyRepairerByUID(repairer_id);
}