const userController = require('../controllers/user.controller');

/**
* @param {import('express').Application} app
*/
module.exports.setupWebRouter = (app) => {
    // Api for user
    app.get('/api/v1/users', userController.getListUsers);
    app.post('/api/v1/users', userController.createUser);
    app.get('/api/v1/users/:id', userController.getUserDetail);

    app.get('/api/v1/customers', userController.getListUsers);
}