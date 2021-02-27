const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    phone_number: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
    role_id: {
        type: Sequelize.INTEGER,
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false
})

module.exports = User