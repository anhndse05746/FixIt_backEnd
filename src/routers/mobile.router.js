const userController = require('../controllers/user.controller');

/**
* @param {import('express').Application} app
*/
module.exports.setupMobileRouter = (app) => {
    // Api for user
    app.get('/api/v2/users', userController.getListUsers);
    app.get('/api/v2/users/:id', userController.getUserDetail);
}