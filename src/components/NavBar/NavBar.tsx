import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import logo from '../../assets/images/tieude4.png';
import avt from '../../assets/images/avt4.jpg';
import './navbar.scss';

const NavBar: React.FC = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const navigate = useNavigate();

    const handleModal = () => {
        setModalStatus(!modalStatus);
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="navbar-component">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="search-bar">
                <input className="search-input" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="menu">
                <ul className="ul">
                    <li className="li">
                        <i className="fa-solid fa-house-chimney"></i>
                        <Badge count={5} style={{ right: '-10px' }}>
                            <Link className="dir" to="/home">
                                Trang Chủ
                            </Link>
                        </Badge>
                    </li>
                    <li className="li">
                        <i className="fa-solid fa-message"></i>
                        <Link className="dir" to="/home/thongbao">
                            Thông báo
                        </Link>
                    </li>
                    <li className="li">
                        <i className="fa-solid fa-calendar-days"></i>
                        <Link className="dir" to="/home/lichhoc">
                            Lịch Học
                        </Link>
                    </li>
                    <li className="infomation">
                        <div className="avt">
                            <img src={avt} alt="" />
                            <span onClick={handleModal}>
                                Ngô Hữu Nghị{' '}
                                <i className={`fa-solid fa-chevron-down ${modalStatus == true ? 'transform' : ''}`}></i>
                            </span>
                        </div>
                        <div className={`modal-logout ${modalStatus == true ? '' : 'disable-div'}`}>
                            <ul>
                                <li>
                                    <span>Thông tin cá nhân</span>
                                </li>
                                <li>
                                    <span>Đổi mật khẩu</span>
                                </li>
                                <li onClick={handleLogout}>
                                    <span>Đăng xuất</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
