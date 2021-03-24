const userController = require('../controllers/user.controller');
const majorController = require('../controllers/major.controller');
const authController = require('../controllers/auth.controller');
const { checkAuthenticate } = require('../middlewares/auth');
const repairerController = require('../controllers/repairer.controller');

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

    // major service 
    app.get('/api/getMajor', majorController.getMajorDetail);
    //get all request

    app.get('/api/createRequest', requestController.createRequest);
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
    app.get('/getRequestDetail', requestController.getRequestByRequestID);

    //create Invoice 
    app.get('/createInvoice', invoiceController.createInvoice);

    //review Engineer
    // app.get('/api/reviewEngineer', invoiceController.createInvoice);

    //API for address
    app.post('/api/createAddress', user_addressController.createAddress);
};

