// import React from 'react'
// import { useNavigate } from 'react-router-dom';
//import { Routes } from "react-router-dom"
//import { LichHoc } from './LichHoc/LichHoc.js'
//import { Thongbao } from './ThongBao/Thongbao.js'
//import {PrivateRoute} from "../../route/"
import NavBar from '../../components/NavBar/NavBar.tsx';
import Sider from '../../components/Sider/Sider.tsx';
import Content from '../../components/Content/Content.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { Outlet } from 'react-router-dom';

const Home = () => {
    // const navigate = useNavigate();
    // const handleLogout = () => {
    //     navigate("/login")

    // }
    return (
        <>
            <NavBar />

            <Sider />
            <Content />
            {/* <div> */}
            <Outlet />
            <Footer />
        </>
    );
};
export default Home;
