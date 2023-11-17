import React, { useState } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './FormYeuCau.scss'
import Sider from '../../../components/Sider/Sider';


const FormYeuCau: React.FC = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const [formData, setFormData] = useState({
        hoTenGV: data.data.ThongTinCaNhan.hoTenGV,
        ngay: '',
        mon: '',
        tietDay: '',
        lyDo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Thêm logic để lưu dữ liệu vào localStorage hoặc gửi đi đâu đó nếu cần
    };


    return (
        <>
            <NavBar />
            <div className="your-form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên:
                        <input
                            type="text"
                            name="hoTenGV"
                            value={formData.hoTenGV}
                            readOnly
                        />
                    </label>

                    <label>
                        Ngày:
                        <input
                            type="date"
                            name="ngay"
                            value={formData.ngay}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Tiết dạy:
                        <input
                            type="text"
                            name="tietDay"
                            value={formData.tietDay}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Môn:
                        <select
                            name="mon"
                            value={formData.mon}
                            onChange={handleChange}
                        >

                            {data.lich.map(monHoc => (
                                <option key={monHoc.maLopHocPhan} value={monHoc.tenMonHoc}>
                                    {monHoc.tenMonHoc}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Lý do:
                        <textarea
                            name="lyDo"
                            value={formData.lyDo}
                            onChange={handleChange}
                        />
                    </label>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
};

export default FormYeuCau;
