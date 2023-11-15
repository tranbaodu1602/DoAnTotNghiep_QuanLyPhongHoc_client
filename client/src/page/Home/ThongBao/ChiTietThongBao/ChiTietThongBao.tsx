import React from 'react';
import NavBar from '../../../../components/NavBar/NavBar';
import { useParams } from 'react-router-dom';
import './ChiTietThongBao.scss'


type ParamType = {
    tenThongBao: string;
};

const ChiTietThongBao: React.FC = () => {
    const { tenThongBao } = useParams<ParamType>();
    const data = [
        {
            title: 'Thông báo 1',
            description: 'Mô tả cho Card 1 aaaaaaaaaaaaaaaaaaaaaa',
            time: '20/03/2023',
        },
        {
            title: 'Thoogn báo 2',
            description: 'Mô tả cho Card 2 aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            time: '20/03/2023',
        },
        {
            title: 'Thông báo 3',
            description: 'Mô tả cho Card 3',
            time: '20/03/2023',
        },
    ];

    const thongBao = data.find((item) => item.title === tenThongBao);

    if (!thongBao) {
        return <div>Không tìm thấy thông báo</div>;
    }
    console.log("tb", thongBao);

    return (
        <>
            <NavBar />
            <div className='Thongbao_content'>
                <div className="Thongbao_body">
                    <div className='Thongbao_title'>
                        <div className='Thongbao_name'>{tenThongBao}</div>
                        <div className='Thongbao_time'>Ngày tạo: {thongBao.time}</div>
                    </div>
                    <div className='Thongbao_des'>
                        <div className='Thongbao_text'>
                            {thongBao.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChiTietThongBao;
