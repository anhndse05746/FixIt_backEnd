const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const Services = require('../models/services')
const Issues = db.define('issues', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    service_id: {
        type: Sequelize.INTEGER
    },
    estimate_fix_duration: {
        type: Sequelize.INTEGER
    },
    estimate_price: {
        type: Sequelize.DECIMAL
    }
}, {

    timestamps: true
});
//service_id
Services.hasMany(Issues, { foreignKey: "service_id" });
Issues.belongsTo(Services, { foreignKey: 'service_id' });


module.exports = Issues 