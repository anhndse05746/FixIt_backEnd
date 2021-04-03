const userController = require('../controllers/user.controller');
const majorController = require('../controllers/major.controller');
const authController = require('../controllers/auth.controller');
const { checkAuthenticate } = require('../middlewares/auth');
const repairerController = require('../controllers/repairer.controller');
<<<<<<< HEAD
const issueController = require('../controllers/issue.controller');
const serviceController = require('../controllers/service.controller');
=======

const invoiceController = require('../controllers/invoice.controller');

const reviewController = require('../controllers/review.controller');
const requestController = require('../controllers/request.controller');
>>>>>>> 52c0cf9d8c6d4303e3121b08af7a0367ec681877
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2099d65d6d620e740315f488775253ad885a2861
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

<<<<<<< HEAD
=======
=======
>>>>>>> 2099d65d6d620e740315f488775253ad885a2861
    // major service 
    app.get('/api/getMajor', majorController.getMajorDetail);
    //get all request

    app.get('/api/createRequest', requestController.createRequest);
    //API for take request
    app.post('/api/repairer/takeRequest', requestController.takeRequest)
    //API for cancel request
    app.post('/api/cancelRequest', requestController.cancelRequest);

    // user service

    // get Request detail by request_id
    app.get('/getRequestDetail', requestController.getRequestByRequestID);

    //create Invoice 
    app.get('/createInvoice', invoiceController.createInvoice);

    //review Engineer
    // app.get('/api/reviewEngineer', invoiceController.createInvoice);

    //API for address
    app.post('/api/createAddress', user_addressController.createAddress);
<<<<<<< HEAD
>>>>>>> 52c0cf9d8c6d4303e3121b08af7a0367ec681877
=======
>>>>>>> 2099d65d6d620e740315f488775253ad885a2861
};

