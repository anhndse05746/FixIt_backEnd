const Sequelize = require('sequelize');
const db = require('../databases/dbConnection');
const ReparingRequest = require('../models/repairing_request');

const Invoice = db.define('invoice', {
    request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    payment_method_id: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.STRING,
    },
    other_cost: {
        type: Sequelize.INTEGER,
    },
    total_price: {
        type: Sequelize.INTEGER,
    },
    cost_of_supplies: {
        type: Sequelize.INTEGER,
    },
    actual_proceeds: {
        type: Sequelize.INTEGER,
    },
}, {
    freezeTableName: true,
    timestamps: true
});

ReparingRequest.hasOne(Invoice, { foreignKey: "request_id" });
Invoice.belongsTo(ReparingRequest, { foreignKey: 'request_id' });

// Issues.hasMany(IssuesList, {foreignKey: "issues_id"});
// IssuesList.belongsTo(Issues, {foreignKey: "issues_id"});


module.exports = Invoice