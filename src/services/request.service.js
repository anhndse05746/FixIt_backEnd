const RequestRepo = require("../repositories/request.repository")


module.exports.getRequestDetail = async () => {

    let requestData = await RequestRepo.getRequestDetail();
    //.then().catch(err => console.log(err))
    return requestData;
}
