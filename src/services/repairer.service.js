const repairer = require('../repositories/repairer.repository');
const repairerRepo = require('../repositories/repairer.repository');

module.exports.getAllRepairer = async () => {
    return await repairerRepo.getAllRepairer();
}

module.exports.getAllRepairerNotVerified = async () => {
    return await repairerRepo.getListNotVerified();
}

module.exports.approveCV = async (id) => {
    await repairerRepo.approveCV(id);
    return await repairerRepo.getListNotVerified();
}