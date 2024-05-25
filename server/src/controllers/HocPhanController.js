const HocPhan = require('../services/HocPhanService');

const taoHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.taoHocPhan(req);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
    }
};

const xoaHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.xoaHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
    }
};

const moLopHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.moLopHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
    }
};

const dongLopHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.dongLopHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
    }
};

const dangKiHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.dangKiHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
    }
};

const huyLopHocPhan = async (req, res) => {
    try {
        const course = await HocPhan.huyLopHocPhan(req.body);
        res.status(200).json({
            course,
        });
    } catch (error) {
        console.log(error);
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
    xoaHocPhan,
    moLopHocPhan,
    dongLopHocPhan,
    dangKiHocPhan,
    huyLopHocPhan,
    getHocPhanTheoMaHP,
    getAllHocPhan,
};
