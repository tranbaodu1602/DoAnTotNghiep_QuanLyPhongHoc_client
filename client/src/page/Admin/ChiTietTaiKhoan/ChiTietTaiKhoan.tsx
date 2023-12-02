import React, { useState, useEffect } from 'react';
import { Layout, Input, Button } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './ChiTietTaiKhoan.scss';

const { Content } = Layout;
const { Search } = Input;
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
        setIsKhoaDisabled(false);
    };
    //////-------------------------
    const [selectedItem, setSelectedItem] = useState<TaiKhoanData>();
    const selectItem = (item: TaiKhoanData) => {
        setSelectedItem(item);
    };

    const handleEdit = (item) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn sửa?");
        if (isConfirmed) {
            //xử lí
            alert("đã xủ lĩ")
        }
    };
    const handleDelete = (item) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn xóa?");
        if (isConfirmed) {
            //xử lí
            console.log(item);
            alert("đã xủ lí")
        }
    };

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TaiKhoanData[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleSearch = () => {
        const results = data.filter(item => item.taiKhoan.includes(searchTerm));
        setSearchResults(results);
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setIsSearching(false);
    };

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="TaiKhoan_content">
                            <div className="TaiKhoan_list">

                                <div className="TaiKhoan_noidung">
                                    <h2>{`Danh sách tài khoản ${loaitaikhoan === 'giaovien' ? 'Giảng viên' : loaitaikhoan === 'sinhvien' ? 'Sinh Viên' : 'Khoa'}`}</h2>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Search
                                            placeholder="Nhập mã tài khoản cần tìm kiếm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onSearch={handleSearch}
                                            style={{ marginRight: '8px', width: "600px", marginBottom: "20px" }} // Khoảng trống giữa input và button
                                        />
                                        {searchTerm && (
                                            <Button onClick={handleClearSearch} type="primary" danger style={{ marginBottom: "20px" }}>
                                                X
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tài khoản</th>
                                                        <th>Mật khẩu</th>
                                                        <th>Đặt lại mật khẩu</th>
                                                        <th>Cập nhật trạng thái</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(isSearching ? searchResults : data).map((item, i) => (
                                                        <tr key={i} className="TaiKhoan_item" onClick={() => selectItem(item)}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.taiKhoan}</td>
                                                            <td>{item.matKhau}</td>
                                                            <td className="d-flex justify-content-center">
                                                                <button className="btn btn-primary" onClick={() => handleEdit(item)}>
                                                                    Đặt lại
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                                                                    Thay đổi trạng thái
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="TaiKhoan_form">
                                <h5>Thêm tài khoản</h5>
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
