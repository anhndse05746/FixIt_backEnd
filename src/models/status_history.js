const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
// const User = require('../models/user')
const ReparingRequest = require('../models/repairing_request')
const Status = require('../models/status')



const StatusHistory = db.define('status_history', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    time: {
        type: Sequelize.DATE,
    }
}, {
    freezeTableName: true,
     timestamps: false
});
//service_id
ReparingRequest.hasMany(StatusHistory, { foreignKey: "request_id" });
StatusHistory.belongsTo(ReparingRequest, { foreignKey: 'request_id' });

StatusHistory.belongsTo(Status, { foreignKey: "status_id" });
Status.hasMany(StatusHistory, { foreignKey: "status_id" });


module.exports = StatusHistory