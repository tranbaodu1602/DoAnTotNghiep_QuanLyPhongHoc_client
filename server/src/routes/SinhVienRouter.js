const express = require('express');
const routes = express.Router();
const sinhVienController = require('../controllers/SinhVienController');

routes.post('/create', sinhVienController.themSinhVien);
routes.post('/get-student-by-id', sinhVienController.getSVTheoMaSV);

module.exports = routes;
