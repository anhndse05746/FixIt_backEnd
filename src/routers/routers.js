const userController = require('../controllers/user.controller');
const majorController = require('../controllers/major.controller');
const authController = require('../controllers/auth.controller');
const { checkAuthenticate } = require('../middlewares/auth');
const repairerController = require('../controllers/repairer.controller');
const issueController = require('../controllers/issue.controller');
const serviceController = require('../controllers/service.controller');

const invoiceController = require('../controllers/invoice.controller');

const reviewController = require('../controllers/review.controller');
const requestController = require('../controllers/request.controller');
const verifyRole = require('../middlewares/verifyRole');
const user_addressController = require('../controllers/user_address.controller');

/**
* @param {import('express').Application} app
*/
module.exports.setupRouters = (app) => {
    //Auth
    app.post('/login', authController.login);

    //Verify Midleware
    app.all('/api/*', checkAuthenticate);
    //Verify Admin Middleware
    app.all('/api/admin/*', verifyRole.checkRole);
    app.all('/api/repairer/*', verifyRole.checkRoleRepairer);

    //API for update user
    app.post('/api/updateUser', userController.updateUser);
    app.post('/resetPassword', userController.resetPassword);
    app.post('/api/changePassword', userController.changePassword);

    //API for register
    app.post('/register', userController.register);
    app.post('/checkRegistered', userController.checkRegisteredPhoneNumber);

    //Admin APIs
    //API for get all customers
    app.get('/api/admin/getAllCus', userController.getAllCustomerController);

    //API for get all repairers
    app.get('/api/admin/getAllRepairer', repairerController.getAllRepairerController);
    app.get('/api/admin/getAllRepairerNotVerified', repairerController.getAllRepairerNotVerifiedController);
    app.post('/api/admin/approveCV', repairerController.approveCV);

    //API for major service 
    app.get('/getMajor', majorController.getMajorDetail);
    app.post('/api/admin/createMajor', majorController.createMajor);
    app.post('/api/admin/updateMajor', majorController.updateMajor);
    app.post('/api/admin/deleteMajor', majorController.deleteMajor);

    //API for issue
    app.post('/api/admin/createIssue', issueController.createIssue);
    app.post('/api/admin/updateIssue', issueController.updateIssue);
    app.post('/api/admin/deleteIssue', issueController.deleteIssue);

    //API for service
    app.post('/api/admin/createService', serviceController.createService);
    app.post('/api/admin/updateService', serviceController.updateService);
    app.post('/api/admin/deleteService', serviceController.deleteService);

    // major service 
    app.get('/api/getMajor', majorController.getMajorDetail);
    //get all request

    app.post('/api/createRequest', requestController.createRequest);
    //API for take request
    app.post('/api/repairer/takeRequest', requestController.takeRequest)
    //API for cancel request
    app.post('/api/cancelRequest', requestController.cancelRequest);

    //API for get list request for customer
    app.post('/api/getListRequestByStatus', requestController.getListRequestByStatusForCustomer);

    //API for get init list request
    app.post('/api/getInitListRequest', requestController.getInitListRequest);

    // user service

    // get Request detail by request_id
    app.post('/api/getRequestDetail', requestController.getRequestByRequestID);

    //create Invoice 
    app.post('/api/createInvoice', invoiceController.createInvoice);

    //review Engineer
    // app.get('/api/reviewEngineer', invoiceController.createInvoice);

    //API for address
    app.post('/api/createAddress', user_addressController.createAddress);

    //get request list for repairer
    app.post('/api/getRequestList', repairerController.getListRequest);
};

