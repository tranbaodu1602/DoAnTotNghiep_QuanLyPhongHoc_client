const User = require('../models/ModalUser');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkUser = await User.findOne({
                username: userData.username,
            });

            if (!checkUser) {
                const user = new User(userData);
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
            const checkUser = await User.findOne({
                username: username,
            });
            console.log('user:' + checkUser);
            if (checkUser === null) {
                reslove({
                    status: 'Fail',
                    message: 'ten dang nhap khong ton tai',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);

            if (!comparePassword) {
                reslove({
                    status: 'Fail',
                    message: 'mat khau khong chinh xac',
                });
            } else {
                if (checkUser.isAdmin === true) {
                    reslove({
                        status: 'SUCCESS',
                        message: 'login success, wellcome admin',
                        data: {
                            user: checkUser,
                            path: '/admin/home',
                        },
                    });
                } else {
                    reslove({
                        status: 'SUCCESS',
                        message: 'login success',
                        data: {
                            checkUser,
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
