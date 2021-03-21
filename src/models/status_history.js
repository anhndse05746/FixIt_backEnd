const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
// const User = require('../models/user')
const ReparingRequest = require('../models/repairing_request')
const Status = require('../models/status')

const RequestStatus = db.define('request_status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: {
        type: Sequelize.INTEGER
    }, 
    status_id: {
        type: Sequelize.INTEGER
    },
    cancel_by: {
        type: Sequelize.INTEGER
    },
    cancel_reason: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true
});
//service_id
ReparingRequest.hasMany(RequestStatus, { foreignKey: "request_id" });
RequestStatus.belongsTo(ReparingRequest, { foreignKey: 'request_id' });

RequestStatus.belongsTo(Status, { foreignKey: "status_id" });
Status.hasMany(RequestStatus, { foreignKey: "status_id" });

module.exports = RequestStatus