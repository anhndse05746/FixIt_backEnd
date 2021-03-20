const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const Issues = require('../models/issues')
const ReparingRequest = require('../models/repairing_request')

const IssuesList = db.define('issues_list', {

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
    timestamps: false
});

ReparingRequest.hasMany(IssuesList, {foreignKey: "request_id"});
IssuesList.belongsTo(ReparingRequest, { foreignKey: 'request_id' });

Issues.hasMany(IssuesList, {foreignKey: "issues_id"});
IssuesList.belongsTo(Issues, {foreignKey: "issues_id"});


module.exports = IssuesList 