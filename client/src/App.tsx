
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './page/Login/Login'
import Home from './page/Home/Home'
import { LichHoc } from './page/Home/LichHoc/LichHoc'
import { Thongbao } from './page/Home/ThongBao/Thongbao'

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
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
