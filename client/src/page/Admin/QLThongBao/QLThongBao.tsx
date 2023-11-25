import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QLThongBao.scss';
// import FormThongBao from './FormThongBao';
import { Card, List } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import '../../Home/ThongBao/thongBao.scss';
import './QLThongBao.scss';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;

const QLThongbao: React.FC = () => {
    const [tenThongBao, setTenThongBao] = useState('');
    const [chiTiet, setChiTiet] = useState('');
    const [danhCho, setDanhCho] = useState('sinhvien');
    const [ngayTao, setNgayTao] = useState(new Date().toISOString().slice(0, 10));
    const [dinhKem, setDinhKem] = useState<string | null>('');
    const [error, setError] = useState('');

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);
    socket.on('newNotify', (data: { thongBaoNew: any }) => {
        thongtin.DanhSachThongBao.push(data.thongBaoNew);
        localStorage.setItem('myDataKey', JSON.stringify(thongtin));
    });

    const sv = thongtin.DanhSachThongBao.filter((thongbao: any) => thongbao.danhCho === 'sinhvien');
    const gv = thongtin.DanhSachThongBao.filter((thongbao: any) => thongbao.danhCho === 'giaovien');
    const all = thongtin.DanhSachThongBao.filter((thongbao: any) => thongbao.danhCho === 'tatca');

    const convertData = (mangMoi: any) => {
        // Tạo mảng mới để lưu trữ tất cả lịch học
        const updatedData: any = [];

        mangMoi.forEach((mang: any) => {
            // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
            const localDate = new Date(mang.ngayTao).toLocaleString('en-US', { timeZone: 'UTC' });
            updatedData.push({
                ...mang,
                ngayTao: localDate,
            });
        });

        return updatedData;
    };

    const thongbaosv = convertData(sv);
    const thongbaogv = convertData(gv);
    const thongbaoall = convertData(all);

    const handleTenThongBaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTenThongBao(event.target.value);
    };

    const handleChiTietChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChiTiet(event.target.value);
    };

    const handleDinhKemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setDinhKem(files[0].name);
        } else {
            setDinhKem('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!tenThongBao || !chiTiet) {
            setError('Vui lòng điền tên thông báo và chi tiết.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/admin/create-notify', {
                method: 'POST',
                body: JSON.stringify({ tenThongBao, chiTiet, ngayTao, danhCho, dinhKem }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Nếu request thành công, hiển thị thông báo thành công
                toast.success('Thêm thông báo thành công!');
                setTenThongBao('');
                setChiTiet('');
                setDanhCho('sinhvien');
                setNgayTao(new Date().toISOString().slice(0, 10));
                setDinhKem(null);
                setError('');
                // const data = response.json();
                // data.then((result) => {
                //     thongtin.DanhSachThongBao.push(result.notify.thongBaoNew);
                //     localStorage.setItem('myDataKey', JSON.stringify(thongtin));
                // });
            } else {
                // Nếu request không thành công, hiển thị thông báo thất bại
                toast.error('Thêm thông báo thất bại. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi khi có lỗi trong quá trình gửi request
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!');
        }
    };

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="ThongBao_layout">
                            <div className="ThongBao_content">
                                <h2>Thông báo</h2>
                                <div className="notify-list">
                                    <Card
                                        className="card"
                                        title="THÔNG TIN SINH VIÊN"
                                        style={{ color: '#737373', maxHeight: '450px', overflowY: 'auto' }}
                                    >
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaosv} // Danh sách dữ liệu
                                            renderItem={(item: any) => (
                                                <List.Item>
                                                    <Card title={item.ngayTao}>
                                                        <p style={{ fontStyle: 'italic' }}>{item.tenThongBao}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card
                                        className="card"
                                        title="THÔNG TIN GIẢNG VIÊN"
                                        style={{
                                            color: '#737373',
                                            marginTop: 2 + '%',
                                            maxHeight: '450px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaogv} // Danh sách dữ liệu
                                            renderItem={(item: any, key) => (
                                                <List.Item>
                                                    <Card key={key} title={item.ngayTao}>
                                                        <p>{item.tenThongBao}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card
                                        className="card"
                                        title="THÔNG BÁO TẤT CẢ"
                                        style={{
                                            color: '#737373',
                                            marginTop: 2 + '%',
                                            maxHeight: '450px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaoall} // Danh sách dữ liệu
                                            renderItem={(item: any) => (
                                                <List.Item>
                                                    <Card title={item.ngayTao}>
                                                        <p>{item.tenThongBao}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </div>
                            </div>
                            <div className="ThongBao_form">
                                <div className="ThongBao_form_content">
                                    <ToastContainer />
                                    <div
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            paddingLeft: '55px',
                                            paddingBottom: '12px',
                                        }}
                                    >
                                        Thêm thông báo
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="form-group">
                                            <label htmlFor="tenThongBao">Tên thông báo:</label>
                                            <input
                                                type="text"
                                                id="tenThongBao"
                                                className="form-control"
                                                value={tenThongBao}
                                                onChange={handleTenThongBaoChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="chiTiet">Chi tiết:</label>
                                            <textarea
                                                id="chiTiet"
                                                className="form-control"
                                                style={{ height: '250px', maxHeight: '450px', overflowY: 'auto' }}
                                                value={chiTiet}
                                                onChange={handleChiTietChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ngayTao">Ngày tạo:</label>
                                            <input
                                                type="date"
                                                id="ngayTao"
                                                className="form-control"
                                                value={ngayTao}
                                                onChange={(e) => setNgayTao(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group" style={{ marginTop: '6px' }}>
                                            <label htmlFor="danhCho">Loại tài khoản:</label>
                                            <select
                                                className="form-control"
                                                name="danhCho"
                                                value={danhCho}
                                                onChange={(e) => setDanhCho(e.target.value)}
                                            >
                                                <option value="sinhvien">Sinh viên</option>
                                                <option value="giaovien">Giảng viên</option>
                                                <option value="tatca">Tất cả</option>
                                            </select>
                                        </div>
                                        <div className="form-group" style={{ marginTop: '20px' }}>
                                            <label htmlFor="dinhKem">Ảnh đính kèm : </label>
                                            <input type="file" id="dinhKem" onChange={handleDinhKemChange} multiple />
                                        </div>
                                        <div style={{ height: '40px', maxHeight: '90px', overflowY: 'auto' }}></div>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <button type="submit" className="btn btn-primary" style={{ width: '90%' }}>
                                                Thêm thông báo
                                            </button>
                                        </div>
                                    </form>
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

export default QLThongbao;
