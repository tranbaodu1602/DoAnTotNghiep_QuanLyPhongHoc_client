import React from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { Phong } from '../../../../DataSample'
import { Link } from 'react-router-dom';
import './PhongHoc.scss'

const { Content } = Layout;

type PhongType = {
    id: string;
    tenPhong: string;
    sucChua: string;
    trangThai: string;
    tenNha: string;
    loaiPhong: {
        id: string;
        tenLoai: string;
        thietBi: {
            id: string;
            tenThietBi: string;
        }[];
    };
};

type ParamType = {
    loaiphong: string;
};

const PhongHoc: React.FC = () => {

    const { loaiphong } = useParams<ParamType>();

    let Loai = ''
    if (loaiphong === 'lythuyet') {
        Loai = 'Phòng Lý Thuyết'
    }
    if (loaiphong === 'thuchanh') {
        Loai = 'Phòng Thực Hành'
    }
    if (loaiphong === 'hoitruong') {
        Loai = 'Phòng Hội Trường'
    }

    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const danhSachPhongTheoLoai = (danhSachPhong: PhongType[], Loai: string) => {
        return danhSachPhong.filter((phong) => phong.loaiPhong.tenLoaiPhong === Loai);
    };

    const ketQua = danhSachPhongTheoLoai(data.DanhSachPhongHoc, Loai);

    const nhaPhongMap: Record<string, PhongType[]> = {};
    ketQua.forEach((phong) => {
        if (!nhaPhongMap[phong.tenNha]) {
            nhaPhongMap[phong.tenNha] = [];
        }
        nhaPhongMap[phong.tenNha].push(phong);
    });
    console.log("data", ketQua);



    return (
        <>
            <AdminNavbar />
            <Layout className='body__content'>
                <AdminSider />
                <Layout className='content'>
                    <Content >
                        <div className='loaiphong'>{Loai}</div>
                        <div className='list__nha'>
                            {Object.keys(nhaPhongMap).map((tenNha) => (
                                <div key={tenNha} className='phong'>
                                    <h3>{`Nhà ${tenNha}`}</h3>
                                    <div className='list_phong'>
                                        {nhaPhongMap[tenNha].map((phong) => (
                                            <Link key={phong.id} to={`/admin/phonghoc/${loaiphong}/${phong.maPhong}`}>
                                                <div className='item'>Phòng {phong.maPhong}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default PhongHoc;
