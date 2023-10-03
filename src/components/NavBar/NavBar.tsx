import React from 'react';
import { Link } from "react-router-dom"

const NavBar: React.FC = () => {
    return (
        <div>
            NavBar
            <ul>
                <li>
                    <Link to="/home/thongbao">Thong Bao</Link>
                </li>
                <li>
                    <Link to="/home/lichhoc">Lich Hoc</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
