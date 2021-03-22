const RequestIssue = require('../models/request_issues');

module.exports.insertListIssues = async (issues_list) => {

    const request = await RequestIssue.bulkCreate(
        issues_list
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}
module.exports.deleteListIssuesByID = async (id) => {

    await RequestIssue.destroy({
        where: {
            request_id: id
        }
    }).then().catch(err => {
        console.log(err)
    });

}

module.exports.getListIssuseByRequestID = async (id) => {

    const request = await RequestIssue.findAll({
        where: {
            request_id: id
        }, order: [['updatedAt', 'DESC']],
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}

