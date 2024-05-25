const express = require('express');
const routes = express.Router();
const hocPhanController = require('../controllers/HocPhanController');

routes.post('/create', hocPhanController.taoHocPhan);
routes.post('/delete', hocPhanController.xoaHocPhan);
routes.post('/register', hocPhanController.dangKiHocPhan);
routes.post('/open-course', hocPhanController.moLopHocPhan);
routes.post('/cancel-course', hocPhanController.huyLopHocPhan);
routes.post('/status-change', hocPhanController.dongLopHocPhan);
routes.post('/get-by-id', hocPhanController.getHocPhanTheoMaHP);
routes.get('/get-all-hp', hocPhanController.getAllHocPhan);

module.exports = routes;
