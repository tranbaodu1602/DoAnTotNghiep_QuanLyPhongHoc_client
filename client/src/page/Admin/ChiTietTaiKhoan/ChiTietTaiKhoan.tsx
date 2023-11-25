import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import ChiTietTaiKhoanSinhVien from './ChiTietTaiKhoanSinhVien';
import './ChiTietTaiKhoan.scss';

const { Content } = Layout;
interface TaiKhoanData {
    id: number;
    taiKhoan: string;
    matKhau: string;
    loaiTaiKhoan: string;
    khoa: string;
}
type ParamType = {
    loaitaikhoan: string;
};

const ChiTietTaiKhoan: React.FC = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);
    const TaiKhoan = thongtin.DanhSachTaiKhoan;

    const { loaitaikhoan } = useParams<ParamType>();

    const [data, setData] = useState<TaiKhoanData[]>([]);
    useEffect(() => {
        const taikhoan = TaiKhoan.filter((item: any) => item.loaiTaiKhoan === loaitaikhoan);
        if (taikhoan) {
            // Nếu tìm thấy môn học, cập nhật data bằng môn học đó
            setData(taikhoan);
        }
    }, [loaitaikhoan]);

    //////------------------------
    const [formData, setFormData] = useState({
        taiKhoan: '',
        matKhau: '',
        loaiTaiKhoan: 'sinhvien',
        khoa: '',
    });
    const [isKhoaDisabled, setIsKhoaDisabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Kiểm tra giá trị của trường "loaiTaiKhoan" và kích hoạt hoặc vô hiệu hóa trường "khoa"
        if (name === 'loaiTaiKhoan') {
            if (value === 'sinhvien') {
                setIsKhoaDisabled(false);
            } else {
                setIsKhoaDisabled(true);
            }
        }
    };

    const handleAdd = () => {
        const newAccount = {
            id: 2,
            taiKhoan: formData.taiKhoan,
            matKhau: formData.matKhau,
            loaiTaiKhoan: formData.loaiTaiKhoan,
            khoa: formData.khoa,
        };

        console.log(newAccount);

        // Đặt lại trạng thái form
        setFormData({
            taiKhoan: '',
            matKhau: '',
            loaiTaiKhoan: 'sinhvien',
            khoa: '',
        });

        // Vô hiệu hóa trường "khoa" sau khi thêm
        setIsKhoaDisabled(false);
    };
    //////-------------------------
    const [selectedItem, setSelectedItem] = useState<TaiKhoanData>();
    const selectItem = (item: TaiKhoanData) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        console.log('item', selectedItem);
        console.log(formData);
    }, [selectedItem, formData]);
    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="TaiKhoan_content">
                            <div className="TaiKhoan_list">
                                {loaitaikhoan === 'sinhvien' ? (
                                    <div>
                                        <ChiTietTaiKhoanSinhVien data={data} />
                                    </div>
                                ) : (
                                    <div className="TaiKhoan_noidung">
                                        <h2>{`Danh sách tài khoản ${
                                            loaitaikhoan === 'giaovien' ? 'Giảng viên' : 'Khoa'
                                        }`}</h2>
                                        <div>
                                            <div className="TaiKhoan_table">
                                                <div>STT</div>
                                                <div>Tài khoản</div>
                                                <div>Mật khẩu</div>
                                            </div>
                                        </div>

                                        <div className="TaiKhoan_danhsach">
                                            {data.map((item, i) => (
                                                <div key={i} className="TaiKhoan_item" onClick={() => selectItem(item)}>
                                                    <div>{i + 1}</div>
                                                    <div>{item.taiKhoan}</div>
                                                    <div>{item.matKhau}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="TaiKhoan_form">
                                <div>
                                    <label>Tài khoản:</label>
                                    <input
                                        type="text"
                                        name="taiKhoan"
                                        value={formData.taiKhoan}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Mật khẩu:</label>
                                    <input
                                        type="text"
                                        name="matKhau"
                                        value={formData.matKhau}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Loại tài khoản:</label>
                                    <select name="loaiTaiKhoan" value={formData.loaiTaiKhoan} onChange={handleChange}>
                                        <option value="sinhvien">Sinh viên</option>
                                        <option value="giaovien">Giảng viên</option>
                                        <option value="admin">Khoa</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Khoa:</label>
                                    <input
                                        type="text"
                                        name="khoa"
                                        value={formData.khoa}
                                        onChange={handleChange}
                                        disabled={isKhoaDisabled}
                                    />
                                </div>
                                <div>
                                    <button onClick={handleAdd}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default ChiTietTaiKhoan;
