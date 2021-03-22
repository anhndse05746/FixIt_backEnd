const IssuesList = require('../models/issues_list');

module.exports.insertListIssues = async (issues_list) => {

    const request = await IssuesList.bulkCreate(
        issues_list
    ).then().catch(err => {
        console.log(err)
    });
    return request;
}

module.exports.getListIssuseByRequestID = async (id) => {

    const request = await IssuesList.findAll({
        where: {
            request_id: id
        }
    }).then().catch(err => {
        console.log(err)
    });
    return request;
}

