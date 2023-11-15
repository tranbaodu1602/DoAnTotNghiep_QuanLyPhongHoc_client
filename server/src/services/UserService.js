const TaiKhoan = require('../models/ModalTaiKhoan');
const SinhVien = require('../models/ModalSinhVien');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkUser = await TaiKhoan.findOne({
                taikhoan: userData.taikhoan,
            });

            if (!checkUser) {
                const user = new TaiKhoan(userData);
                await user.save();
                reslove({
                    status: 'Success',
                    message: 'tao tai khoan thanh cong',
                    data: user,
                });
                return user;
            } else {
                reslove({
                    status: 'FAIL',
                    message: 'nguoi dung da ton tai',
                });
            }
        } catch (error) {
            throw error;
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
                    reslove({
                        data: {
                            status: 'SUCCESS',
                            message: 'Đăng nhập thành công, wellcome admin',
                            checkUser,
                            path: '/admin/home',
                        },
                    });
                } else {
                    const data = await SinhVien.findOne({ 'ThongTinCaNhan.maSV': username });
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
    userLogin,
};
