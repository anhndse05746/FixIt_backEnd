const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
// const Major = require('../models/major')
const Services = db.define('services', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING,
    },
    is_active: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: true
});



module.exports = Services