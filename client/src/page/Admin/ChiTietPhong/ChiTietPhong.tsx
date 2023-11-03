import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './ChiTietPhong.scss'
import AdminLichTheoPhong from '../AdminLich/AdminLichTheoPhong';

const { Content } = Layout;

type ParamType = {
    toanha: string;
};

const ChiTietPhongHoc: React.FC = () => {

    const { toanha } = useParams<ParamType>();

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout >
                    <Content >
                        <div className='PhongHoc__content'>
                            <div className='PhongHoc__lichHoc'>
                                <div className='PhongHoc__ten'>{toanha}</div>
                                <div className='PhongHoc__lich'>
                                    <div className=''>Lịch của phòng</div>
                                    <div className=''><AdminLichTheoPhong tenPhong={toanha} /></div>
                                </div>
                            </div>
                            <div className='PhongHoc_forrm'>

                            </div>
                        </div>

                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default ChiTietPhongHoc;
