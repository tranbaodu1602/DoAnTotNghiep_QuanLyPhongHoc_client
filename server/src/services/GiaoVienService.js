const GiaoVien = require('../models/ModalGiaovien');

const themGiaoVien = async (data) => {
    return new Promise(async (reslove, reject) => {
        try {
            const check = await GiaoVien.findOne({
                maGV: data.maGV,
            });

            if (!check) {
                const GVNew = new GiaoVien(data);
                await GVNew.save();
                reslove({
                    status: 'Success',
                    message: 'them giao vien thanh cong',
                    data: GVNew,
                });
                return HocPhanNew;
            } else {
                reslove({
                    status: 'FAIL',
                    message: 'Đã tồn tại giáo viên có mã ' + data.ThongTinCaNhan.maGV,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    themGiaoVien,
};
