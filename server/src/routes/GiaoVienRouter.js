const express = require('express');
const routes = express.Router();
const giaoVienController = require('../controllers/GiaoVienController');

routes.post('/create', giaoVienController.themGiaoVien);

module.exports = routes;
