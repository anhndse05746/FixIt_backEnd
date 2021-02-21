const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const {checkAuthenticate} = require('../middlewares/auth');

/**
* @param {import('express').Application} app
*/
module.exports.setupRouters = (app) => {
    //Auth
    app.post('/login', authController.login);

    app.all('/api/*', checkAuthenticate);

    // Api for user
    app.get('/api/v1/users', userController.getListUsers);
    app.post('/api/v1/users', userController.createUser);
    app.get('/api/v1/user/:id', userController.getUserDetail);

}