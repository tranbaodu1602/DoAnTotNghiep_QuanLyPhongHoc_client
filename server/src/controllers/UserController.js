const userService = require('../services/UserService');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { taikhoan, matkhau, ngayTao, loaitaikhoan } = req.body;
        const hash = bcrypt.hashSync(matkhau, 10);
        const dateCreate = new Date();
        dateCreate.getHours() + 7;
        const newUser = {
            taikhoan,
            matkhau: hash,
            ngaytao: dateCreate,
            loaitaikhoan,
        };
        const user = await userService.createUser(newUser);
        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const response = await userService.changePassword(req.body);
        res.status(200).json({
            response,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }

        const data = await userService.userLogin(req.body);

        return res.status(200).json({
            dataLogin: data,
        });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createUser,
    changePassword,
    userLogin,
};
