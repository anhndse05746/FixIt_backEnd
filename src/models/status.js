const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')


const Status = db.define('status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false
});
//service_id


module.exports = Status