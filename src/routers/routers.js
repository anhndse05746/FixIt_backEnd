const userController = require('../controllers/user.controller');
const majorController = require('../controllers/major.controller');
const authController = require('../controllers/auth.controller');
const { checkAuthenticate } = require('../middlewares/auth');
const repairerController = require('../controllers/repairer.controller');
const verifyRole = require('../middlewares/verifyRole');

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

    //API for register
    app.post('/register', userController.register);

    //Admin APIs
    //API for get all customers
    app.get('/api/admin/getAllCus', userController.getAllCustomerController);
    //API for get all repairers
    app.get('/api/admin/getAllRepairer', repairerController.getAllRepairerController);

    // major service 
    app.get('/getMajor', majorController.getMajorDetail);
};

