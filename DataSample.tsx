export const SinhVien = {
    ThongTinCaNhan: {
        hoTenSV: 'Ngô Hữu Nghị',
        maSV: '19495921',
        ngaySinh: '20/05/2001',
        gioiTinh: 'Nam',
        noiSinh: 'An Giang',
        SDT: '0877104344',
        CMND: {
            soCMND: '352540248',
            ngayCap: new Date(),
            noiCap: 'An Giang',
        },
        danToc: 'Kinh',
        tonGiao: 'Phật Giáo Hòa Hảo',
        hoKhauThuongTru: 'số 252 Tổ 2 Ấp Hiệp Hòa, Xã Hiệp Xương, Huyện Phú Tân, Tỉnh An Giang',
        email: 'nghiaa1ad0@gmai.com',
        ngayVaoDoan: new Date(),
    },
    ThongTinHocVan: {
        trangThai: 'Đang Học',
        maHoSo: '19NV11697008',
        nienKhoa: '2019-2023',
        ngayVaoTruong: '12/08/2019',
        lopDanhNghia: 'DHKTPM15B',
        bacDaoTao: 'Đại Học',
        loaiHinhDaoTao: 'Chính quy',
        Khoa: 'Công nghệ thông tin',
        chuyenNganh: 'Kỹ thuật phần mềm',
    },
    ThongTinHocPhan: {
        dataSource: [
            { key: '1', monHoc: 'Lập trình phân tán', soTC: '3', soTiet: '45' },
            { key: '2', monHoc: 'Lập trình WWW', soTC: '4', soTiet: '60' },
            { key: '3', monHoc: 'Lập trình Hướng đối tượng', soTC: '4', soTiet: '60' },
            { key: '4', monHoc: 'Kiểm thử phần mềm', soTC: '3', soTiet: '45' },
            { key: '5', monHoc: 'Kiến trúc thiết kế phần mềm', soTC: '4', soTiet: '60' },
            { key: '6', monHoc: 'Mạng máy tính', soTC: '3', soTiet: '45' },
            { key: '7', monHoc: 'An toàn thông tin', soTC: '3', soTiet: '45' },
        ],
        columns: [
            { title: 'Môn học/học phần', dataIndex: 'monHoc', key: 'monHoc' },
            { title: 'Số tín chỉ', dataIndex: 'soTC', key: 'soTC' },
            { title: 'Số tiết', dataIndex: 'soTiet', key: 'soTiet' },
        ],
    },
};

export const GiaoVien = {
    ThongTinCaNhan: {
        hoTenGV: 'Nguyễn văn A',
        gioiTinh: 'Nam',
        chucVu: 'Giáo viên thỉnh giảng',
        Khoa: 'Công nghệ thông tin',
        email: 'abc@gmail.com',
        SDT: '0421932109',
    },
    ThongTinGiangDay: {
        lichDay: [
            {
                monHoc: {
                    tenMonHoc: 'Lập Trình JavaScript',
                    tenLopHocPhan: 'DH12323AS3',
                    soTinChi: 3,
                    soTietLT: 45,
                    soTietTH: 0,
                    soBuoiDay: 15,
                    lichDay: [
                        {
                            ngay: 'Thứ 3, ngày 20/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 4, ngày 21/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 6, ngày 23/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 3, ngày 27/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 4, ngày 28/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 6, ngày 30/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                    ],
                },
            },
            {
                monHoc: {
                    tenMonHoc: 'Lập Trình JavaScript',
                    tenLopHocPhan: 'DH12323AS3',
                    soTinChi: 3,
                    soTietLT: 45,
                    soTietTH: 0,
                    soBuoiDay: 15,
                    lichDay: [
                        {
                            ngay: 'Thứ 3, ngày 20/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 4, ngày 21/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 6, ngày 23/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 3, ngày 27/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 4, ngày 28/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                        {
                            ngay: 'Thứ 6, ngày 30/05/2023',
                            phongHoc: 'X10.06',
                            gioBatDau: '3:00 PM',
                            gioKetThuc: '5:40 PM',
                            ghiChu: 'lichhoc',
                        },
                    ],
                },
            },
        ],
    },
};

const ChuyenVienPhongKhoa = {
    ThongTinCaNhan: {},
};

const ChuyenVienPhongDaoTao = {};

const MonHoc = {
    maLopHocPhan: '',
    tenMonHoc: '',
    soTinChi: '',
    soTietLT: 40,
    soTietTH: 20,
    trangThai: '',
};
