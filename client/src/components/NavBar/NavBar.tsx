import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        const isDataExist = localStorage.getItem('myDataKey') !== null;

        // Nếu dữ liệu tồn tại, hãy xóa nó
        if (isDataExist) {
            localStorage.removeItem('myDataKey');
        }
        navigate('/');
    };

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);
    console.log("a", data);

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
                    <Link className="dir" to="/home">
                        <li>
                            <i className="fa-solid fa-house-chimney"></i>
                            Trang Chủ
                        </li>
                    </Link>

                    <Link className="dir" to="/home/thongbao">
                        <li>
                            <i className="fa-solid fa-message"></i>
                            Thông báo
                        </li>
                    </Link>

                    <Link className="dir" to="/home/lichhoc">
                        <li>
                            <i className="fa-solid fa-calendar-days"></i>
                            {data.checkUser.loaitaikhoan === 'sinhvien' ? 'Lịch Học' : 'Lịch Dạy'}

                        </li>
                    </Link>

                    {data.checkUser.loaitaikhoan === 'giaovien' ? (<Link className="dir" to="/home/lichhoc">
                        <li>
                            <i className="fa-solid fa fa-calendar-times-o"></i>
                            Yêu Cầu
                        </li>
                    </Link>) : (<></>)

                    }

                    <li className="infomation">
                        <div className="avt">
                            {data.data.ThongTinCaNhan.anhDaiDien != null ?
                                (<img src={data.data.ThongTinCaNhan.anhDaiDien} />)
                                : (<img src={avt} alt="" />)}

                            <span onClick={handleModal}>
                                {data.data.ThongTinCaNhan.hoTenSV}
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