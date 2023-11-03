import React from 'react';

const AdminFormMonHoc: React.FC = ({ selectedAppointment }) => {
    if (selectedAppointment) {
        console.log('selectedAppointment 1 ', selectedAppointment);
    }

    return (
        <>
            <div>
                <h2>Thông tin cuộc họp</h2>
                <div>
                    <label>Tên giảng viên: </label>
                    <input type="text" />
                </div>
                <div>
                    <label>Phòng học: </label>
                    <input type="text" readOnly />
                </div>
                <div>
                    <label>Tiết học: </label>
                    <input type="text" readOnly />
                </div>
                <div>
                    <label>Ghi chú: </label>
                    <textarea />
                </div>
            </div>
            <div>
                <button>Cập nhật</button>
                <button>Thêm</button>
            </div>
        </>
    );
};

export default AdminFormMonHoc;
