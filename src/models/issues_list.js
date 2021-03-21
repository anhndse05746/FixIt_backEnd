const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const Issues = require('../models/issues')
const Services = require('../models/services')
const ReparingRequest = require('../models/repairing_request')

const RequestIssue = db.define('request_issues', {

    request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    issues_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
}, {
    freezeTableName: true,
    timestamps: true
});

ReparingRequest.hasMany(RequestIssue, {foreignKey: "request_id"});
RequestIssue.belongsTo(ReparingRequest, { foreignKey: 'request_id' });

Issues.hasMany(RequestIssue, {foreignKey: "issues_id"});
RequestIssue.belongsTo(Issues, {foreignKey: "issues_id"});

module.exports = RequestIssue 