import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';



type ParamType = {
    tenThongBao: string;
};

const AdminChiTietThongBao: React.FC = () => {
    const { slug } = useParams<ParamType>();

    const storedData: any = localStorage.getItem('myDataKey');
    const thongtin = JSON.parse(storedData);

    return (
        <>

            <div className='Thongbao_content'>
                {slug}
            </div>
        </>
    )
};
export default AdminChiTietThongBao;