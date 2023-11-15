const HocPhan = require('../models/ModalHocPhan');

const taoHocPhan = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const checkHP = await HocPhan.findOne({
                maLopHocPhan: data.maLopHocPhan,
            });

            if (!checkHP) {
                const HocPhanNew = new HocPhan(data);
                await HocPhanNew.save();
                reslove({
                    status: 'Success',
                    message: 'tao hoc phan thanh cong',
                    data: HocPhanNew,
                });
                return HocPhanNew;
            } else {
                reslove({
                    status: 'FAIL',
                    message: 'Trung lap hoc phan',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getHocPhanTheoMaHP = (maHP) => {
    return new Promise(async (reslove, reject) => {
        try {
            const HP = await HocPhan.findOne({ maLopHocPhan: maHP.maLopHocPhan });
            if (!HP) {
                reslove({
                    status: 'fail',
                    message: 'Khong tim thay ma hoc phan',
                });
            } else {
                reslove({
                    status: 'success',
                    data: HP,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllHocPhan = () => {
    return new Promise(async (reslove, reject) => {
        try {
            const DSHP = await HocPhan.find();
            if (!DSHP) {
                reslove({
                    status: 'fail',
                    message: 'danh sanh trong',
                });
            } else {
                reslove({
                    status: 'success',
                    data: DSHP,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    taoHocPhan,
    getHocPhanTheoMaHP,
    getAllHocPhan,
};
