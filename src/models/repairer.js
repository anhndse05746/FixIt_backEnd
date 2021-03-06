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
    }
}, {
    // freezeTableName: true,
    timestamps: false
});

User.hasOne(Repairer, {foreignKey: 'id'});
Repairer.belongsTo(User, {foreignKey: 'id'});

module.exports = Repairer;
