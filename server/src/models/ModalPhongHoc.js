const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const ThietBiSchema = new mongoose.Schema({
    tenThietBi: String,
    loai: String,
    ngayMua: Date,
    nhaCungCap: String,
});

const LoaiPhongSchema = new mongoose.Schema({
    tenLoai: String,
    thietBi: [ThietBiSchema],
});

const PhongSchema = new mongoose.Schema({
    maPhong: String,
    tenPhong: String,
    sucChua: Number,
    trangThai: String,
    tenNha: String,
    loaiPhong: LoaiPhongSchema,
});

const PhongHoc = db.model('PhongHoc', PhongSchema);

module.exports = PhongHoc;
