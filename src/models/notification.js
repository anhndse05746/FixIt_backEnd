const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const User = require('../models/user');

const Notification = db.define('notification', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.INTEGER
    },
    request_id: {
        type: Sequelize.INTEGER
    },
    isRead: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: true
});

User.hasMany(Notification, {foreignKey: "user_id"});
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Notification 