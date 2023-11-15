const HocPhan = require('../services/HocPhanService');

const taoHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.taoHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHocPhanTheoMaHP = async (req, res) => {
    try {
        const hocPhan = await HocPhan.getHocPhanTheoMaHP(req.body);
        res.status(200).json({
            hocPhan,
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
        });
    }
};

const getAllHocPhan = async (req, res) => {
    try {
        const DSHP = await HocPhan.getAllHocPhan();
        res.status(200).json({
            DSHP,
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
        });
    }
};

module.exports = {
    taoHocPhan,
    getHocPhanTheoMaHP,
    getAllHocPhan,
};
