const repairer = require('../repositories/repairer.repository');
const repairerRepo = require('../repositories/repairer.repository');

module.exports.getAllRepairer = () => {
    return repairerRepo.getAllRepairer();
}

