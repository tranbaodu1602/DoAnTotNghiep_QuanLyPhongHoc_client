import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QLThongBao.scss';
import FormThongBao from './FormThongBao';
import { Card, List } from 'antd';
import '../../Home/ThongBao/thongBao.scss';
import './QLThongBao.scss';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const QLThongbao: React.FC = () => {

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    const sv = thongtin.DanhSachThongBao.filter(thongbao => thongbao.danhCho === 'sinhvien')
    const gv = thongtin.DanhSachThongBao.filter(thongbao => thongbao.danhCho === 'giaovien')
    const all = thongtin.DanhSachThongBao.filter(thongbao => thongbao.danhCho === 'tatca')

    const convertData = (mangMoi) => {
        // Tạo mảng mới để lưu trữ tất cả lịch học
        const updatedData = [];

        mangMoi.forEach(mang => {
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
                                    <Card className="card" title="THÔNG TIN SINH VIÊN" style={{ color: '#737373', maxHeight: "450px", overflowY: "auto" }}>
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaosv} // Danh sách dữ liệu
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <Card title={item.ngayTao}>
                                                        <p>{item.tenThongBao}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card
                                        className="card"
                                        title="THÔNG TIN GIẢNG VIÊN"
                                        style={{ color: '#737373', marginTop: 2 + '%', maxHeight: "450px", overflowY: "auto" }}
                                    >
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaogv} // Danh sách dữ liệu
                                            renderItem={(item, key) => (
                                                <List.Item>
                                                    <Card key={key} title={item.ngayTao}>
                                                        <p>{item.tenThongBao}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card className="card" title="THÔNG BÁO TẤT CẢ"
                                        style={{ color: '#737373', marginTop: 2 + '%', maxHeight: "450px", overflowY: "auto" }}>
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={thongbaoall} // Danh sách dữ liệu
                                            renderItem={(item) => (
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
                                    <FormThongBao />
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
