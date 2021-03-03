
const Major = require('../models/major');
const Service = require('../models/services');
const Issues = require('../models/issues');


module.exports.getMajorDetail = async () => {
    // return new Promise((resolve, reject) => {
    const major = await Major.findAll({
        include: [
            {
                model: Service,
                attributes: ['id', 'name'],
                order: [
                    // Will escape title and validate DESC against a list of valid direction parameters
                    ['id', 'ASC'],
                ],
                include: {
                    model: Issues,
                    attributes: ['id', 'name', 'estimate_fix_duration', 'estimate_price'],
                    order: [
                        // Will escape title and validate DESC against a list of valid direction parameters
                        ['id', 'ASC'],
                    ]
                },
            }
        ],
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ]
    } //xuong dong
        // , (err, results) => {
        //     if (err) {
        //         return reject(err);
        //     }
        //     return resolve(results);
        // } xuong dong
    ).then().catch(err => {
        console.log(err)
    });
    return major;
    // }
    // );

}

