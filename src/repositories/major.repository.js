const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');

// lay ra data cua major (service, issues)
module.exports.getMajorDetail = async () => {
    const major = await Major.findAll({
        include: [
            {
                model: Service,
                attributes: ['id', 'name'],
                order: [
                    ['id', 'ASC'],
                ],
                include: {
                    model: Issues,
                    attributes: ['id', 'name', 'estimate_fix_duration', 'estimate_price'],
                    order: [
                        ['id', 'ASC'],
                    ]
                },
            }
        ],
        order: [
            ['id', 'ASC'],
        ]
    }).then().catch(err => {
        console.log(err)
    });
    return major;
}

