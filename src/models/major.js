const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const Services = require('../models/services')
const Major = db.define('major', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
    is_active: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: true
});

Major.hasMany(Services, {foreignKey: "major_id"});
Services.belongsTo(Major, { foreignKey: 'major_id' });


module.exports = Major 