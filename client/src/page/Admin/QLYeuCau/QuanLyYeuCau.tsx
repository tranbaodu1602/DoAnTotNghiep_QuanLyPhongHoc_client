import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import './QuanLyYeuCau.scss'
import { useParams } from 'react-router-dom';

const { Content } = Layout;

type ParamType = {
    tenMonHoc: string;
};
const QuanLyYeuCau: React.FC = () => {


    const { loai } = useParams<ParamType>();
    let xacnhan = false;
    let name = ''
    if (loai === 'daduyet') {
        xacnhan = true;
        name = 'Đã Duyệt'
    }
    if (loai === 'choduyet') {
        xacnhan = false;
        name = 'Chờ Duyệt'
    }

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const yeuCauMoi = data.DanhSachGiaoVien.flatMap((giaoVien) =>

        giaoVien.ThongTinGiangDay?.yeuCau?.map((yeucau) => {
            const localDate = new Date(yeucau.thoigian).toLocaleString('en-US', { timeZone: 'UTC' });
            return {
                ...yeucau,
                TenGV: giaoVien.ThongTinCaNhan.hoTenGV,
                thoigian: localDate,
            }
        }) || []
    );
    const yeuCauDaXacNhan = yeuCauMoi.filter((item) => item.trangthaixacnhan == xacnhan);

    return (
        <>
            <AdminNavbar />
            <Layout className='yeucau__body__content'>
                <AdminSider />
                <Layout className='yeucau__content'>
                    <div style={{ padding: "5px 80px", fontSize: "25px", fontWeight: "700" }}>Yêu cầu {name}</div>
                    <Content >
                        {yeuCauDaXacNhan.map((item, i) => (
                            <div key={i} className='list__yeucau'>
                                <div className='yeucau__card '>
                                    <div style={{ padding: "2px 10px" }}>STT: {i + 1}</div>
                                    <div className='yeucau__header'>
                                        <div className='yeucau__title'> Title: {item.lydo}</div>
                                        <div className='yeucau__user'>Gửi từ: <strong>{item.TenGV}</strong></div>
                                    </div>
                                    <div className='yeucau__body'>
                                        <div className='yeucau__item'><strong>Môn:</strong>  {item.monhoc}</div>
                                        <div className='yeucau__item'> <strong>Thời Gian:</strong> {item.thoigian}</div>
                                        <div className='yeucau__item'><strong>Tiết: </strong>{item.tietday}</div>
                                        <div className='yeucau__item'><strong>Lý do: </strong>{item.lydo}</div>
                                        <div>{item._id}</div>

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
