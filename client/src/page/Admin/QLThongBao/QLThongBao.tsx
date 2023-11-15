import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QLThongBao.scss';
import FormThongBao from './FormThongBao';
import { Card, List } from 'antd';
import '../../Home/ThongBao/thongBao.scss';
import './QLThongBao.scss';

const { Content } = Layout;

const QLThongbao: React.FC = () => {
    const data = [
        {
            title: 'Card 1',
            description: 'Mô tả cho Card 1',
            time: '20/03/2023',
        },
        {
            title: 'Card 2',
            description: 'Mô tả cho Card 2',
            time: '20/03/2023',
        },
        {
            title: 'Card 3',
            description: 'Mô tả cho Card 3',
            time: '20/03/2023',
        },
    ];
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
                                    <Card className="card" title="THÔNG TIN GIỜ HỌC" style={{ color: '#737373' }}>
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={data} // Danh sách dữ liệu
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <Card title={item.title}>
                                                        <p>{item.description}</p>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                    <Card
                                        className="card"
                                        title="THÔNG TIN SỰ KIỆN"
                                        style={{ color: '#737373', marginTop: 2 + '%' }}
                                    >
                                        <List
                                            grid={{ gutter: 16, column: 1 }} // Thiết lập cấu trúc danh sách (3 cột)
                                            dataSource={data} // Danh sách dữ liệu
                                            renderItem={(item, key) => (
                                                <List.Item>
                                                    <Card key={key} title={item.title}>
                                                        <p>{item.description}</p>
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
