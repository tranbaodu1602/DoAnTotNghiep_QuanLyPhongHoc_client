import React from 'react';

import NavBar from '../../components/NavBar/NavBar.tsx';
import Sider from '../../components/Sider/Sider.tsx';
import Content from '../../components/Content/Content.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { Outlet } from 'react-router-dom';


const Home = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    var data = JSON.parse(storedData);
    console.log(data);

    return (
        <>
            <NavBar spropA={data} />
            <Sider />
            <Content />
            <Outlet />
            <Footer />
        </>
    );
};
export default Home;
