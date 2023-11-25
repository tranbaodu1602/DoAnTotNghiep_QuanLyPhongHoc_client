import React from 'react';
import './ChiTietTaiKhoan.scss';

interface TaiKhoanData {
    id: number;
    taiKhoan: string;
    matKhau: string;
    loaiTaiKhoan: string;
    khoa: string;
}

const ChiTietTaiKhoanSinhVien: React.FC<{ data: TaiKhoanData[] }> = ({ data }) => {
    const taiKhoanTheoKhoa: Record<string, TaiKhoanData[]> = data.reduce(
        (acc: Record<string, TaiKhoanData[]>, item: TaiKhoanData) => {
            if (!acc[item.khoa]) {
                acc[item.khoa] = [];
            }
            acc[item.khoa].push(item);
            return acc;
        },
        {},
    );

    return (
        <>
            <div className="TaiKhoanSinhVien_content">
                <h2>Tài khoản Sinh viên</h2>
                <div className="TaiKhoanSinhVien_body">
                    {Object.keys(taiKhoanTheoKhoa).map((khoa, i) => (
                        <div key={i} className="TaiKhoanSinhVien_list">
                            <h5>Khóa {khoa}</h5>
                            <div>
                                <div className="TaiKhoanSinhVien_table">
                                    <div>STT</div>
                                    <div>TÀI KHOẢN</div>
                                    <div>MẬT KHẨU</div>
                                </div>
                                {taiKhoanTheoKhoa[khoa].map((item, i) => (
                                    <div key={item.id} className="TaiKhoanSinhVien_khoa">
                                        <div>{i + 1}</div>
                                        <div> {item.taiKhoan}</div>
                                        <div> {item.matKhau}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChiTietTaiKhoanSinhVien;
