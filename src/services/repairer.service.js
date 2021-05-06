const repairer = require('../repositories/repairer.repository');
const repairerRepo = require('../repositories/repairer.repository');

module.exports.getAllRepairer = async () => {
    return await repairerRepo.getAllRepairer();
}
module.exports.updateIs_Verify = async (user_id) => {
    return await repairerRepo.updateIs_Verify(user_id);
}

module.exports.getAllRepairerNotVerified = async () => {
    return await repairerRepo.getListNotVerified();

}
module.exports.getRequestList = async (repairer_id) => {
    return await repairerRepo.getRequestList(repairer_id);
}

module.exports.approveCV = async (repairer_id) => {
    await repairerRepo.approveCV(repairer_id);
    return await repairerRepo.getListNotVerified();
}
