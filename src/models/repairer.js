const Sequelize = require('sequelize');
const User = require('./user');
const db = require('../databases/dbConnection');

const Repairer = db.define('repairer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    major_id: {
        type: Sequelize.INTEGER
    },
    identity_card_number: {
        type: Sequelize.STRING
    },
    is_verify: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    district: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
}, {
    // freezeTableName: true,
    timestamps: true
});

User.hasOne(Repairer, { foreignKey: 'id' });
Repairer.belongsTo(User, { foreignKey: 'id' });

module.exports = Repairer;
