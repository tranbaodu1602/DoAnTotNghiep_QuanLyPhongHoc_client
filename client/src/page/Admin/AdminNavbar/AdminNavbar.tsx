import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/tieude4.png';
import avt from '../../../assets/images/avt4.jpg';
import './AdminNavbar.scss';

const AdminNavbar: React.FC = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const navigate = useNavigate();

    const handleModal = () => {
        setModalStatus(!modalStatus);
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="admin_navbar-component">
            <div className="admin_logo">
                <img src={logo} alt="" />
            </div>
            <div className="admin_search-bar">
                <input className="admin_search-input" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div className="admin_menu">
                <ul className="admin_ul">
                    <li className="admin_infomation">
                        <div className="admin_avt">
                            <img src={avt} alt="" />
                            <span onClick={handleModal}>
                                Admin{' '}
                                <i className={`fa-solid fa-chevron-down ${modalStatus == true ? 'admin_transform' : ''}`}></i>
                            </span>
                        </div>
                        <div className={`admin_modal-logout ${modalStatus == true ? '' : 'disable-div'}`}>
                            <ul>
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

export default AdminNavbar;
