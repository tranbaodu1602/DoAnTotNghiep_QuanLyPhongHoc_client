const Admin = require('../services/AdminService');

const themPhongHoc = async (req, res) => {
    try {
        const classroom = await Admin.themPhongHoc(req.body);
        res.status(200).json({
            classroom,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const capNhatLichHoc = async (req, res) => {
    try {
        const update = await Admin.capNhatLichHoc(req.body);
        res.status(200).json({
            message: 'Cập nhật thành công',
            update,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const tamHoanLichHoc = async (req, res) => {
    try {
        const cancel = await Admin.tamHoanLichHoc(req.body);
        res.status(200).json({
            message: 'Đã tạm hoãn lịch học',
            cancel,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const themCuocHop = async (req, res) => {
    try {
        const appointment = await Admin.themCuocHop(req.body);
        res.status(200).json({
            appointment,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const taoThongBao = async (req, res) => {
    try {
        const notify = await Admin.taoThongBao(req);
        res.status(200).json({
            notify,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const xoaAllThongBao = async (req, res) => {
    try {
        const notify = await Admin.xoaAllThongBao();
        res.status(200).json({
            notify,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const xacNhanYeuCau = async (req, res) => {
    try {
        const request = await Admin.xacNhanYeuCau(req.body);
        res.status(200).json({
            request,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const datLaiMatKhau = async (req, res) => {
    try {
        const reset = await Admin.datLaiMatKhau(req.body);
        res.status(200).json({
            reset,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const xoaTaiKhoan = async (req, res) => {
    try {
        const reset = await Admin.xoaTaiKhoan(req.body);
        res.status(200).json({
            reset,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
