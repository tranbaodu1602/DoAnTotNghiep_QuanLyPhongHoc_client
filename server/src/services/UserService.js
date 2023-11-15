const TaiKhoan = require('../models/ModalTaiKhoan');
const SinhVien = require('../models/ModalSinhVien');
const HocPhan = require('../models/ModalHocPhan');
const GiaoVien = require('../models/ModalGiaovien');

const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await TaiKhoan.findOne({
                taikhoan: userData.taikhoan,
            });

            if (existingUser) {
                resolve({
                    status: 'FAIL',
                    message: 'Người dùng đã tồn tại',
                });
            } else {
                const user = new TaiKhoan(userData);
                await user.save();
                resolve({
                    status: 'Success',
                    message: 'Tạo tài khoản thành công',
                    data: user,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const changePassword = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { username, oldPassword, newPassword, confirmNewPassword } = data;
        try {
            const checkUser = await TaiKhoan.findOne({
                taikhoan: username,
            });

            if (checkUser === null) {
                resolve({
                    status: 'fail',
                    message: 'Tên đăng nhập không tồn tại',
                });
                return;
            }
            const comparePassword = bcrypt.compareSync(oldPassword, checkUser.matkhau);

            if (!comparePassword) {
                resolve({
                    status: 'fail',
                    message: 'Mật khẩu không chính xác',
                });
                return;
            }

            if (newPassword !== confirmNewPassword) {
                resolve({
                    status: 'fail',
                    message: 'Nhập lại mật khẩu không đúng',
                });
                return;
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 10);

            await TaiKhoan.updateOne({ taikhoan: username }, { $set: { matkhau: hashedPassword } });

            resolve({
                status: 'success',
                message: 'Đổi mật khẩu thành công',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const userLogin = async (dataLogin) => {
    return new Promise(async (reslove, reject) => {
        const { username, password } = dataLogin;
        try {
            const checkUser = await TaiKhoan.findOne({
                taikhoan: username,
            });

            if (checkUser === null) {
                reslove({
                    data: {
                        status: 'fail',
                        message: 'Tên đăng nhập không tồn tại',
                        path: '',
                    },
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.matkhau);

            if (!comparePassword) {
                reslove({
                    data: {
                        status: 'fail',
                        message: 'Mật khẩu không chính xác',
                        path: '',
                    },
                });
            } else {
                if (checkUser.loaitaikhoan === 'admin') {
                    const DSHP = await HocPhan.find();
                    if (!DSHP) {
                        reslove({
                            status: 'success',
                            message: 'Đăng nhập thành công, Wellcome admin !!',
                            DanhSachHocPhan: 'khong tim thay hoc phan',
                            checkUser,
                            path: '/admin/home',
                        });
                    } else {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công, wellcome admin !!',
                                DanhSachHocPhan: DSHP,
                                checkUser,
                                path: '/admin/home',
                            },
                        });
                    }
                } else if (checkUser.loaitaikhoan === 'sinhvien') {
                    const data = await SinhVien.findOne({ 'ThongTinCaNhan.maSV': username });
                    const lich = [];
                    await Promise.all(
                        data.ThongTinHocPhan.data[0].dsHocPhan.map(async (value) => {
                            const hp = await HocPhan.findOne({ maLopHocPhan: value });
                            if (!hp) {
                                console.log('Không tìm thấy lịch của mã học phần là ' + value);
                            } else {
                                lich.push(hp);
                            }
                        }),
                    );
                    if (lich.length === 0) {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: data,
                                lich: 'Không có lịch học trong học kì',
                                path: '/home',
                            },
                        });
                    } else {
                        reslove({
                            data: {
                                status: 'SUCCESS',
                                message: 'Đăng nhập thành công',
                                checkUser,
                                data: {
                                    data,
                                    lich,
                                },
                                path: '/home',
                            },
                        });
                    }
                } else if (checkUser.loaitaikhoan === 'giaovien') {
                    const data = await GiaoVien.findOne({ 'ThongTinCaNhan.maGV': username });
                    console.log('data', data);
                    reslove({
                        data: {
                            status: 'SUCCESS',
                            message: 'Đăng nhập thành công',
                            checkUser,
                            data: data,
                            path: '/home',
                        },
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    changePassword,
    userLogin,
};
