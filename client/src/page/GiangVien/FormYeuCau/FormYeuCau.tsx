import React, { useState } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import './FormYeuCau.scss';

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const FormYeuCau: React.FC = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    socket.on('requestSchedule', (data: { GV: any }) => {
        console.log(data.GV);
    });

    const [formData, setFormData] = useState({
        hoTenGV: data.data.ThongTinCaNhan.hoTenGV,
        ngay: '',
        monhoc: data.lich[0].tenMonHoc,
        tietday: '',
        lydo: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (e.target.type === 'select-one') {
            const selectedIndex = e.target.selectedIndex;
            const selectedValue = e.target.options[selectedIndex].value;
            setFormData({
                ...formData,
                [name]: selectedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:3001/teacher/request-schedule', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Gửi yêu cầu thành công, vui lòng đợi xác nhận');
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="your-form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên:
                        <input type="text" name="hoTenGV" value={formData.hoTenGV} readOnly />
                    </label>

                    <label>
                        Ngày:
                        <input type="date" name="ngay" value={formData.ngay} onChange={handleChange} />
                    </label>

                    <label>
                        Tiết dạy:
                        <input type="text" name="tietday" value={formData.tietday} onChange={handleChange} />
                    </label>
                    <label>
                        Môn:
                        <select name="monhoc" value={formData.monhoc} onChange={handleChange}>
                            {data.lich.map((monHoc: any) => (
                                <option key={monHoc.maLopHocPhan} value={monHoc.tenMonHoc}>
                                    {monHoc.tenMonHoc}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Lý do:
                        <textarea name="lydo" value={formData.lydo} onChange={handleChange} />
                    </label>

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormYeuCau;
