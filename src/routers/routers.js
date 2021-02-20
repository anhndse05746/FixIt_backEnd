const userController = require('../controllers/user.controller');

/**
* @param {import('express').Application} app
*/
module.exports.setupRouters = (app) => {
    // Api for user
    app.get('/api/v1/users', userController.getListUsers);
    app.post('/api/v1/users', userController.createUser);
    app.get('/api/v1/user/:id', userController.getUserDetail);

}