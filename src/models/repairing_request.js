const Sequelize = require('sequelize')
const db = require('../databases/dbConnection')
const User = require('../models/user')
const Services = require('../models/services')
const Issues = require('../models/issues')

const ReparingRequest = db.define('repairing_request', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    schedule_time: {
        type: Sequelize.DATE,
    },
    estimate_time: {
        type: Sequelize.DATE,
    },
    estimate_price: {
        type: Sequelize.DECIMAL
    },
    description: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true
});
//service_id


User.hasMany(ReparingRequest, {as: 'Customer', foreignKey: "customer_id" });
ReparingRequest.belongsTo(User, {as: 'Customer', foreignKey: "customer_id" });

User.hasMany(ReparingRequest, { as: 'Repairer', foreignKey: "repairer_id" });
ReparingRequest.belongsTo(User, { as: 'Repairer', foreignKey: "repairer_id" });

Services.hasMany(ReparingRequest, { foreignKey: "service_id" });
ReparingRequest.belongsTo(Services, { foreignKey: 'service_id' });


module.exports = ReparingRequest