import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';


const { Content } = Layout;

const TaiKhoan: React.FC = () => {

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout style={{ padding: '0 16px 16px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        Tài Khoản
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default TaiKhoan;
