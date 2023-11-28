const slugify = require('slugify');
const unidecode = require('unidecode');
const PhongHoc = require('../models/ModalPhongHoc');
const ThongBao = require('../models/ModalThongBao');
const HocPhan = require('../models/ModalHocPhan');
const GiaoVien = require('../models/ModalGiaovien');
const mongoose = require('mongoose');
const { getIO } = require('../configs/Socket');

const themPhongHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkExist = await PhongHoc.findOne({
                maPhong: data.maPhong,
            });
            if (!checkExist) {
                const newPhongHoc = new PhongHoc(data);
                await newPhongHoc.save();
                reslove({
                    status: 'Success',
                    message: 'them phong hoc thanh cong',
                    data: newPhongHoc,
                });
            } else {
                reslove({
                    status: 'FAIL',
                    message: 'Đã tồn tại phòng học có mã ' + data.maPhong,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const capNhatLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            // const monhoc = await HocPhan.findOne({ tenMonHoc: data.title });
            // const dataId = data._id.toString();
            // // console.log(dataId);
            // monhoc.thongTinLich.map((value) => {
            //     const valueIdString = value._id.toString();
            //     if (valueIdString === dataId) {
            //         value.phongHoc = data.phongHoc;
            //         value.ghiChu = data.ghiChu;
            //         value.tenGV = data.tenGV;
            //         value.tietHoc = data.tietHoc;
            //         return value;
            //     }
            // });
            // await monhoc.save();
            // // console.log(monhoc);
            // const io = getIO();
            // io.sockets.emit('updateSchedule', { monhoc });
            reslove({
                status: 'Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const tamHoanLichHoc = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const monhoc = await HocPhan.findOne({ tenMonHoc: data.title });
            const dataId = data._id.toString();
            console.log(dataId);
            monhoc.thongTinLich.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.ghiChu = 'Tạm ngưng';
                    return value;
                }
            });
            await monhoc.save();
            console.log(monhoc);
            const io = getIO();
            io.sockets.emit('cancelSchedule', { monhoc });
            reslove({
                status: 'Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const taoThongBao = async (data) => {
    return new Promise(async (reslove, reject) => {
        const { tenThongBao, chiTiet, ngayTao, danhCho, dinhKem } = data.body;
        try {
            const convertedStr = slugify(unidecode(tenThongBao), { lower: true });
            let link = 'không có file đính kèm';
            if (
                data.files &&
                data.files['dinhKem'] &&
                Array.isArray(data.files['dinhKem']) &&
                data.files['dinhKem'].length > 0
            ) {
                link = data.files['dinhKem'][0].path;
            }
            const thongBaoNew = new ThongBao({
                tenThongBao,
                slug: convertedStr,
                chiTiet,
                ngayTao,
                danhCho,
                dinhKem: link,
            });
            await thongBaoNew.save();
            const io = getIO();
            io.sockets.emit('newNotify', { thongBaoNew });
            reslove({
                status: 'Success',
                message: 'Tạo thông báo thành công',
                thongBaoNew,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const xoaAllThongBao = async () => {
    try {
        await ThongBao.deleteMany().skip(11);
        reslove({
            status: 'Success',
            message: 'Xóa thông báo thành công',
        });
    } catch (error) {
        throw new Error('Không thể xóa thông báo: ' + error.message);
    }
};

const xacNhanYeuCau = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const GV = await GiaoVien.findOne({ 'ThongTinCaNhan.hoTenGV': data.tenGV });
            const dataId = data._id.toString();
            if (!data.tinnhanphanhoi) {
                data.tinnhanphanhoi = 'Không có tin nhắn phản hồi';
            }
            GV.ThongTinGiangDay.yeuCau.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.trangthaixacnhan = true;
                    value.tinnhanphanhoi = data.tinnhanphanhoi;
                    return value;
                }
            });

            await GV.save();
            const DS = await GiaoVien.find();

            const io = getIO();
            io.sockets.emit('confirmRequest', DS);
            reslove({
                status: 'Success',
                message: 'Phản hồi yêu cầu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    themPhongHoc,
    capNhatLichHoc,
    tamHoanLichHoc,
    taoThongBao,
    xoaAllThongBao,
    xacNhanYeuCau,
};
