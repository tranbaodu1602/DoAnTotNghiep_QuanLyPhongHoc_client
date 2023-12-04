const slugify = require('slugify');
const unidecode = require('unidecode');
const moment = require('moment');
const bcrypt = require('bcrypt');
const PhongHoc = require('../models/ModalPhongHoc');
const ThongBao = require('../models/ModalThongBao');
const HocPhan = require('../models/ModalHocPhan');
const GiaoVien = require('../models/ModalGiaovien');
const TaiKhoan = require('../models/ModalTaiKhoan');
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
            const monhoc = await HocPhan.findOne({ tenMonHoc: data.title });
            const dataId = data._id.toString();
            monhoc.thongTinLich.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.phongHoc = data.phongHoc;
                    value.ghiChu = data.ghiChu;
                    value.tenGV = data.tenGV;
                    value.tietHoc = data.tietHoc;
                    return value;
                }
            });
            await monhoc.save();
            const io = getIO();
            io.sockets.emit('updateSchedule', { monhoc });
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
            monhoc.thongTinLich.map((value) => {
                const valueIdString = value._id.toString();
                if (valueIdString === dataId) {
                    value.ghiChu = 'Tạm ngưng';
                    return value;
                }
            });
            await monhoc.save();
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

const themCuocHop = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            console.log(data);
            if (data.member.length >= 1) {
                let ghichu = 'Không có nhắc nhở';
                if (data.ghiChu != '') {
                    ghichu = data.ghiChu;
                }
                const getTietHoc = (startDate, endDate) => {
                    const startHour = parseInt(startDate.split('T')[1].split(':')[0]);
                    const startMinute = parseInt(startDate.split('T')[1].split(':')[1]);

                    const startTotalMinutes = startHour * 60 + startMinute;

                    const convertToTietHoc = (totalMinutes) => {
                        if (totalMinutes >= 390 && totalMinutes <= 540) return '1-3';
                        if (totalMinutes >= 550 && totalMinutes <= 700) return '4-6';
                        if (totalMinutes >= 750 && totalMinutes <= 900) return '7-9';
                        if (totalMinutes >= 910 && totalMinutes <= 1060) return '10-12';
                        return '';
                    };

                    const tietHoc = convertToTietHoc(startTotalMinutes); // Sử dụng kết quả này cho cả startTietHoc và endTietHoc

                    return tietHoc;
                };

                const tietHoc = getTietHoc(data.startDate, data.endDate);
                console.log(tietHoc);

                const appointment = await HocPhan.findOne({ maLopHocPhan: '000000' });
                if (appointment) {
                    const startDateUTC = moment.utc(data.startDate).format(); // Chuyển đổi sang UTC
                    const endDateUTC = moment.utc(data.endDate).format(); // Chuyển đổi sang UTC
                    appointment.thongTinLich.push({
                        title: data.title,
                        startDate: startDateUTC,
                        endDate: endDateUTC,
                        phongHoc: data.phongHoc,
                        tenGV: data.member[0],
                        tietHoc: tietHoc, // lưu tiết học tại đây
                        ghiChu: ghichu,
                    });
                    await appointment.save(); // Lưu lại thông tin lịch họp
                }
                const promises = data.member.map(async (value) => {
                    const GV = await GiaoVien.find({ 'ThongTinCaNhan.hoTenGV': value });
                    return GV;
                });
                let DSGV = (await Promise.all(promises)).flatMap((item) => item);
                DSGV = DSGV.map(async (gv) => {
                    if (!gv.ThongTinGiangDay.lichDay.includes('000000')) {
                        gv.ThongTinGiangDay.lichDay.push('000000');
                        await gv.save(); // Lưu lại thông tin lịch của mỗi giáo viên
                    }
                    return gv;
                });
                await Promise.all(DSGV);
                const DSHP = await HocPhan.find();
                const io = getIO();
                io.sockets.emit('createAppointment', DSHP);
                reslove({
                    status: 'Success',
                    message: 'Thêm cuộc họp thành công',
                });
            } else {
                reslove({
                    status: 'Success',
                    message: 'Bạn chưa chọn thành viên cho cuộc họp',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const taoThongBao = async (data) => {
    return new Promise(async (reslove, reject) => {
        const { tenThongBao, chiTiet, ngayTao, danhCho } = data.body;
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

const datLaiMatKhau = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const tk = await TaiKhoan.findOne({ taikhoan: data.taiKhoan });
            if (tk) {
                const hash = bcrypt.hashSync(tk.taikhoan, 10);
                tk.matkhau = hash;
                await tk.save();
            }

            const DSTK = await TaiKhoan.find();
            if (DSTK) {
                const taikhoan = DSTK.map((value) => {
                    if (value.loaitaikhoan !== 'admin') {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: value.loaitaikhoan,
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    } else {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: 'khoa',
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    }
                });
                const io = getIO();
                io.sockets.emit('resetPassword', taikhoan);
            }
            reslove({
                status: 'Success',
                message: 'Đặt lại mật khẩu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const xoaTaiKhoan = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const deleteAcc = await TaiKhoan.findOneAndDelete({ taikhoan: data.taiKhoan });

            if (deleteAcc) {
                const DSTK = await TaiKhoan.find();

                const taikhoan = DSTK.map((value) => {
                    if (value.loaitaikhoan !== 'admin') {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: value.loaitaikhoan,
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    } else {
                        const tk = {
                            taiKhoan: value.taikhoan,
                            loaiTaiKhoan: 'khoa',
                            matKhau: value.matkhau,
                            ngayTao: value.ngaytao,
                        };
                        return tk;
                    }
                });
                const io = getIO();
                io.sockets.emit('deleteAccount', taikhoan);
            }

            reslove({
                status: 'Success',
                message: 'Xóa tài khoản thành công',
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
    themCuocHop,
    taoThongBao,
    xoaAllThongBao,
    xacNhanYeuCau,
    datLaiMatKhau,
    xoaTaiKhoan,
};
