
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './page/Login/Login'
import Home from './page/Home/Home'
import { LichHoc } from './page/Home/LichHoc/LichHoc'
import { Thongbao } from './page/Home/ThongBao/Thongbao'
import AdminHome from './page/Admin/AdminHome'
import PhongHoc from './page/Admin/Phong/PhongHoc'
import QLThongbao from './page/Admin/QLThongBao/QLThongBao'
import TaiKhoan from './page/Admin/TaiKhoan/TaiKhoan'
import ChiTietPhongHoc from './page/Admin/ChiTietPhong/ChiTietPhong'
import ChiTietMonHoc from './page/Admin/ChiTietMonHoc/ChiTietMonHoc'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path="/home/thongbao" element={<Thongbao />} />
          <Route path="/home/lichhoc" element={<LichHoc />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/lichhoc" element={<PhongHoc />} />
          {/*  */}
          <Route path="/admin/taikhoan" element={<TaiKhoan />} />
          <Route path="/admin/thongbao" element={<QLThongbao />} />
          {/*  */}
          <Route path="/admin/phonghoc/:loaiphong" element={<PhongHoc />} ></Route>
          <Route path="/admin/phonghoc/:loaiphong/:toanha" element={<ChiTietPhongHoc />} ></Route>
          <Route path="/admin/monhoc/:tenMonHoc" element={<ChiTietMonHoc />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
