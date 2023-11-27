import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QuanLyYeuCau.scss'

const { Content } = Layout;


const QuanLyYeuCau: React.FC = () => {

    const ex = [
        {
            title: "Yêu cầu hủy lịch",
            tenGV: "Tôn Long Phước",
            mon: "Công nghệ mới",
            lyDo: "có lý do cá nhân",
            tiet: "1-3",
            thoiGian: "30-11-2023",
        },
        {
            title: "Yêu cầu dời lịch",
            tenGV: "Đặng Thị Thu Hà",
            mon: "Phân tích thiết kế hệ thống",
            lyDo: "có lý do cá nhân",
            tiet: "1-3",
            thoiGian: "30-11-2023",
        },
    ]

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);


    return (
        <>
            <AdminNavbar />
            <Layout className='yeucau__body__content'>
                <AdminSider />
                <Layout className='yeucau__content'>
                    <Content >
                        {ex.map((item, i) => (
                            <div key={i} className='list__yeucau'>
                                <div className='yeucau__card'>
                                    <div className='yeucau__header'>
                                        <div className='yeucau__title'> Title: {item.lyDo}</div>
                                        <div className='yeucau__user'>Gửi từ: <strong>{item.tenGV}</strong></div>
                                    </div>
                                    <div className='yeucau__body'>
                                        <div className='yeucau__item'><strong>Môn:</strong>  {item.mon}</div>
                                        <div className='yeucau__item'> <strong>Thời Gian:</strong> {item.thoiGian}</div>
                                        <div className='yeucau__item'><strong>Tiết: </strong>{item.tiet}</div>
                                        <div className='yeucau__item'><strong>Lý do: </strong>{item.lyDo}</div>

                                    </div>
                                    <div className='yeucau_form'>
                                        <div className='yeucau__phanhoi'>
                                            <textarea placeholder='Tin nhắn phẩn hồi' />
                                        </div>
                                        <div className='yeucau__footer'>
                                            <div>
                                                <button className='yeucau__xacnhan'>Xác nhận</button>
                                            </div>
                                            <div>
                                                <button className='yeucau__tuchoi'>Từ chối</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default QuanLyYeuCau;
