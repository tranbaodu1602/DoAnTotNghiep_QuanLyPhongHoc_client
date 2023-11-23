const slugify = require('slugify');
const unidecode = require('unidecode');
const PhongHoc = require('../models/ModalPhongHoc');
const ThongBao = require('../models/ModalThongBao');
const { getIO } = require('../configs/Socket');

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

const taoThongBao = async (data) => {
    return new Promise(async (reslove, reject) => {
        const { tenThongBao, chiTiet, ngayTao, danhCho, dinhKem } = data.body;
        try {
            const convertedStr = slugify(unidecode(tenThongBao), { lower: true });
            let link = 'không có file đính kèm';
            if (
                data.files &&
                data.files['dinhKem'] &&
                Array.isArray(data.files['dinhKem']) &&
                data.files['dinhKem'].length > 0
            ) {
                link = data.files['dinhKem'][0].path;
            }
            const thongBaoNew = new ThongBao({
                tenThongBao,
                slug: convertedStr,
                chiTiet,
                ngayTao,
                danhCho,
                dinhKem: link,
            });
            await thongBaoNew.save();
            const io = getIO();
            io.sockets.emit('newNotify', { thongBaoNew });
            reslove({
                status: 'Success',
                message: 'Tạo thông báo thành công',
                thongBaoNew,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const xoaAllThongBao = async () => {
    try {
        await ThongBao.deleteMany().skip(11);
        return {
            status: 'Success',
            message: 'Đã xóa tất cả thông báo',
        };
    } catch (error) {
        throw new Error('Không thể xóa thông báo: ' + error.message);
    }
};

module.exports = {
    themPhongHoc,
    taoThongBao,
    xoaAllThongBao,
};
