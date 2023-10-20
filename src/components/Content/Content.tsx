import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'antd';

import './content.scss';
import { SinhVien, GiaoVien } from '../../../DataSample';
import avt from '../../assets/images/avt4.jpg';

const Content: React.FC = () => {
    const thongTinCaNhan = SinhVien.ThongTinCaNhan;
    const thongTinHocVan = SinhVien.ThongTinHocVan;
    const thongTinHocPhan = SinhVien.ThongTinHocPhan;
    const [statusScroll, setStatusScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            const currentScrollPosition = window.scrollY;
            console.log('Chiều cao hiện tại khi cuộn chuột:', currentScrollPosition, 'pixels');
            if (currentScrollPosition >= 300) {
                setStatusScroll(true);
            } else if (currentScrollPosition <= 200) {
                setStatusScroll(false);
            }
        });
    }, [statusScroll]);
    return (
        <div className="content-coponent">
            <div className="my-info">
                <div className="title-info">
                    <span>Thông tin cá nhân</span>
                </div>
                <hr />
                <div className="avt">
                    <img src={avt} alt="" />
                    <span>Xem chi tiết</span>
                </div>
                <div className="text-info">
                    <ul>
                        <li>
                            MSSV: <b>{thongTinCaNhan.maSV}</b>
                        </li>
                        <li>
                            Họ tên: <b>{thongTinCaNhan.hoTenSV}</b>
                        </li>
                        <li>
                            Giới tính: <b>{thongTinCaNhan.gioiTinh}</b>
                        </li>
                        <li>
                            Ngày sinh: <b>{thongTinCaNhan.ngaySinh}</b>
                        </li>
                        <li>
                            Nơi sinh: <b>{thongTinCaNhan.noiSinh}</b>
                        </li>
                    </ul>
                </div>
                <div className="text-info2">
                    <ul>
                        <li>
                            Lớp học: <b>{thongTinHocVan.lopDanhNghia}</b>
                        </li>
                        <li>
                            Khóa học: <b>{thongTinHocVan.nienKhoa}</b>
                        </li>
                        <li>
                            Bậc đào tạo: <b>{thongTinHocVan.bacDaoTao}</b>
                        </li>
                        <li>
                            Loại hình đào tạo: <b>{thongTinHocVan.loaiHinhDaoTao}</b>
                        </li>
                        <li>
                            Ngành: <b>{thongTinHocVan.chuyenNganh}</b>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="learning-calendar">
                <Row className="row">
                    <Col className="col" span={12}>
                        <Card
                            className={`card1 ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                            title="Lịch học theo tuần"
                            style={{ color: '#1da1f2', backgroundColor: '#e0fbff' }}
                        >
                            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>0</h1>
                                <div className="card-icon">
                                    <i className="fa-solid fa-calendar-days"></i>
                                </div>
                            </div>
                            <p>Xem chi tiết</p>
                        </Card>
                    </Col>
                    <Col className="col" span={12}>
                        <Card
                            className={`card2 ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                            title="Lịch thi theo tuần"
                            style={{ color: '#ff9205', backgroundColor: '#fff2d4', float: 'right' }}
                        >
                            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>0</h1>
                                <div className="card-icon">
                                    <i className="fa-solid fa-calendar-days"></i>
                                </div>
                            </div>
                            <p>Xem chi tiết</p>
                        </Card>
                    </Col>
                </Row>

                <Row className="row2">
                    <Col className="col2">
                        <Card
                            className={`card ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                            title="Nhắc nhở mới chưa xem"
                            style={{ color: '#737373' }}
                        >
                            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>0</h1>
                                <div className="card-icon">
                                    <i className="fa-regular fa-bell"></i>
                                </div>
                            </div>
                            <p>Xem chi tiết</p>
                        </Card>
                        <Card
                            className={`card ${statusScroll === false ? '' : 'animate__jackInTheBox'} `}
                            title="Số môn học trong học kì"
                            style={{ color: '#737373', position: 'absolute', bottom: 0 }}
                        >
                            <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h1>0</h1>
                                <div className="card-icon">
                                    <i className="fa-solid fa-book"></i>
                                </div>
                            </div>
                            <p>Xem chi tiết</p>
                        </Card>
                    </Col>

                    <Col className="col2">
                        <Card className="card2" title="Lớp học phần" style={{ color: '#1da1f2' }}>
                            <Table
                                dataSource={thongTinHocPhan.dataSource}
                                columns={thongTinHocPhan.columns}
                                pagination={{ pageSize: 3 }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Content;
