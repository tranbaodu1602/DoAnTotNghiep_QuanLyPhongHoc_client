const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const GiaoVienSchema = new mongoose.Schema({
    ThongTinCaNhan: {
        maGV: String,
        hoTenGV: String,
        tuoi: Number,
        gioiTinh: String,
        chucVu: String,
        khoa: String,
        email: String,
        SDT: String,
    },
    ThongTinGiangDay: {
        lichDay: [String],
    },
});

const GiaoVien = db.model('GiaoVien', GiaoVienSchema);

module.exports = GiaoVien;
