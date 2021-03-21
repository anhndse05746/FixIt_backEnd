const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')

const User_Address = db.define('user_request_address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING,
    },
    district: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = User_Address