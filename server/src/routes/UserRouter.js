const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UserController');

routes.post('/create', userController.createUser);
routes.post('/login', userController.userLogin);

module.exports = routes;
