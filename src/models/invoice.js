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
    cost_incurred: {
        type: Sequelize.DOUBLE,
    },
    total_price: {
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