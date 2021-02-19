const express = require('express');
const user = require('../models/dal/userDAO')
const userAPI = express.Router();

userAPI.get('/users', async (req, res, next) => {
    try {
        let results = await user.getAll();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
userAPI.get('/user/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        let results = await user.getUserByID(id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = userAPI;