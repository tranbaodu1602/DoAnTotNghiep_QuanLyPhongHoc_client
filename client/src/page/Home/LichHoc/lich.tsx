import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    WeekView,
    MonthView,
    Appointments,
    AppointmentTooltip,
    Toolbar,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

// import { io, Socket } from 'socket.io-client';

// const socket: Socket = io('http://localhost:3001');

const ExternalViewSwitcher = ({
    currentViewName,
    onChange,
}: {
    currentViewName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <RadioGroup
        aria-label="Views"
        style={{ flexDirection: 'row' }}
        name="views"
        value={currentViewName}
        onChange={onChange}
    >
        <FormControlLabel value="Week" control={<Radio />} label="Lịch theo Tuần" />
        <FormControlLabel value="Month" control={<Radio />} label="Lịch theo Tháng" />
    </RadioGroup>
);

const CustomTimeTableCell: React.FC<{ startDate: Date }> = ({ startDate }) => {
    const hour = startDate.getHours();
    let timeSlotText = '';

    if (hour >= 6 && hour < 12) {
        timeSlotText = 'Buổi sáng';
    } else if (hour >= 12 && hour < 18) {
        timeSlotText = 'Buổi chiều';
    } else {
        timeSlotText = 'Buổi tối';
    }

    return <div style={{ textAlign: 'center' }}>{timeSlotText}</div>;
};

const LearningCalendar: React.FC = () => {
    //const [data] = useState(MonHoc.data.roomData[0].thongTinLich);
    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    const storedData = localStorage.getItem('myDataKey');
    const thongtin = storedData ? JSON.parse(storedData) : [];

    // socket.on('cancelSchedule', (data: { monhoc: any }) => {
    //     const foundIndex = thongtin.DanhSachHocPhan.findIndex((item: any) => {
    //         return item.maLopHocPhan === data.monhoc.maLopHocPhan;
    //     });

    //     if (foundIndex !== -1) {
    //         thongtin.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
    //         localStorage.setItem('myDataKey', JSON.stringify(thongtin));
    //     }
    // });

    // socket.on('updateSchedule', (data: { monhoc: any }) => {
    //     const foundIndex = thongtin.DanhSachHocPhan.findIndex((item: any) => {
    //         return item.maLopHocPhan === data.monhoc.maLopHocPhan;
    //     });

    //     if (foundIndex !== -1) {
    //         thongtin.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
    //         localStorage.setItem('myDataKey', JSON.stringify(thongtin));
    //     }
    // });

    const [data, setNewData] = useState([]);

    useEffect(() => {
        // Tạo mảng mới để lưu trữ tất cả lịch học
        const updatedData = [];

        thongtin.lich.forEach((monHoc) => {
            monHoc.thongTinLich.forEach((lich) => {
                // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
                const localEndDate = new Date(lich.endDate).toLocaleString('en-US', { timeZone: 'UTC' });
                const localStartDate = new Date(lich.startDate).toLocaleString('en-US', { timeZone: 'UTC' });

                updatedData.push({
                    ...lich,
                    endDate: localEndDate,
                    startDate: localStartDate,
                });
            });
        });

        // Cập nhật state bằng mảng mới
        setNewData(updatedData);
    }, []);

    console.log('datas', data);

    const Appointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
        data: any;
    }> = ({ children, style, data, ...restProps }) => {
        const dynamicBackgroundColor = data.ghiChu === 'Tạm ngưng' ? 'rgb(248, 200, 195)' : '';
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor: dynamicBackgroundColor,
                    borderRadius: '8px',
                }}
            >
                {children}
                <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                    GV: <span style={{ color: 'red' }}>{data.tenGV}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                    Tiết: <span style={{ color: 'red' }}>{data.tietHoc}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                    Phòng: <span style={{ color: 'red' }}>{data.phongHoc}</span>
                </div>
                <div style={{ color: '#000', paddingLeft: 4 + '%' }}>
                    Ghi chú: <span style={{ color: 'red' }}>{data.ghiChu}</span>{' '}
                </div>
            </Appointments.Appointment>
        );
    };

    const customAppointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
    }> = ({ children, style, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                /* backgroundColor: '#FFC107', */
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    );

    return (
        <React.Fragment>
            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
            <Paper>
                <Scheduler data={data} height={620}>
                    <ViewState defaultCurrentDate="2023-10-24" currentViewName={currentViewName} />
                    <WeekView
                        startDayHour={5.5} // Giờ bắt đầu buổi sáng
                        endDayHour={22} // Giờ kết thúc buổi tối
                        cellDuration={60}
                        // timeTableCellComponent={CustomTimeTableCell}
                    />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments appointmentComponent={currentViewName === 'Week' ? Appointment : customAppointment} />
                    {currentViewName === 'Month' ? <AppointmentTooltip showCloseButton /> : <></>}
                </Scheduler>
            </Paper>
        </React.Fragment>
    );
};

export default LearningCalendar;
