const express = require('express');
const routes = express.Router();
const adminController = require('../controllers/AdminController');
const cloudinary = require('../configs/Cloudunary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'file',
    allowedFormats: ['jpg', 'png', 'jpeg', 'xlsx', 'docx'],
    resource_type: 'auto',
    use_filename: true,
});

const upload = multer({ storage: storage });

routes.post('/add-classroom', adminController.themPhongHoc);
routes.post('/create-notify', upload.fields([{ name: 'dinhKem', maxCount: 1 }]), adminController.taoThongBao);
routes.get('/delete-all-notify', adminController.xoaAllThongBao);

module.exports = routes;
