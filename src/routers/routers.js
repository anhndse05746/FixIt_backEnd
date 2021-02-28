const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { checkAuthenticate } = require('../middlewares/auth');

/**
* @param {import('express').Application} app
*/
module.exports.setupRouters = (app) => {
    //Auth
    app.post('/login', authController.login);

    //Verify Midleware
    app.all('/api/*', checkAuthenticate);

    // Api for user
    app.post('/api/v1/users', userController.createUser);

}