// import React from 'react'
import { useNavigate } from "react-router-dom"
//import { Routes } from "react-router-dom"
//import { LichHoc } from './LichHoc/LichHoc.js'
//import { Thongbao } from './ThongBao/Thongbao.js'
//import {PrivateRoute} from "../../route/"
import NavBar from "../../components/NavBar/NavBar.tsx"
import Sider from '../../components/Sider/Sider.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { Outlet } from 'react-router-dom';




const Home = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login")

    }
    return (
        <>
            <NavBar />
            <button onClick={handleLogout}>Logout</button>
            <Sider />
            <div style={{ backgroundColor: 'red', height: '100px', width: '200px' }}>
                abv
                <Outlet />
                {/* <PrivateRoute path="\home\lichhoc"
                component={LichHoc}>
                </PrivateRoute>
                <PrivateRoute path="\home\thongbao"
                component={Thongbao}>
                </PrivateRoute> */}
            </div>
            <Footer />
        </>
    )
}
export default Home;