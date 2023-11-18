const PhongHoc = require('../models/ModalPhongHoc');

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

module.exports = {
    themPhongHoc,
};
