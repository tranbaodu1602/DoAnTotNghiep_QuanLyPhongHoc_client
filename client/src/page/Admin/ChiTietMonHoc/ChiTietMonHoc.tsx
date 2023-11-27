import React, { useState, useEffect, ChangeEvent } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './ChiTietMonHoc.scss';
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

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;

interface AppointmentData {
    startDate: Date;
    endDate: Date;
    phongHoc: string;
    ghiChu: string;
    tenGV: string;
    tietHoc: string;
}

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

type ParamType = {
    tenMonHoc: string;
};

const ChiTietMonHoc: React.FC = () => {
    const { tenMonHoc } = useParams<ParamType>();

    const [data, setData] = useState([]);
    const [isModelVisible, setModelVisible] = useState(false);

    const storedData: any = localStorage.getItem('myDataKey');
    const danhSach = JSON.parse(storedData);

    socket.on('cancelSchedule', (data: { monhoc: any }) => {
        const foundIndex = danhSach.DanhSachHocPhan.findIndex((item: any) => {
            return item.maLopHocPhan === data.monhoc.maLopHocPhan;
        });

        if (foundIndex !== -1) {
            danhSach.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
            localStorage.setItem('myDataKey', JSON.stringify(danhSach));
        }
    });

    socket.on('updateSchedule', (data: { monhoc: any }) => {
        const foundIndex = danhSach.DanhSachHocPhan.findIndex((item: any) => {
            return item.maLopHocPhan === data.monhoc.maLopHocPhan;
        });

        if (foundIndex !== -1) {
            danhSach.DanhSachHocPhan[foundIndex] = data.monhoc; // Cập nhật giá trị tại chỉ mục đã tìm thấy
            localStorage.setItem('myDataKey', JSON.stringify(danhSach));
        }
    });

    useEffect(() => {
        const tenMonHocCanTim = tenMonHoc; // Tên môn học bạn muốn tìm
        const monHocDaTim = danhSach.DanhSachHocPhan.find((item: any) => item.maLopHocPhan === tenMonHocCanTim);

        const updatedData: any = [];

        monHocDaTim.thongTinLich.forEach((lich: any) => {
            // Chuyển đổi endDate và startDate sang địa phương không thay đổi giá trị thời gian
            const localEndDate = new Date(lich.endDate).toLocaleString('en-US', { timeZone: 'UTC' });
            const localStartDate = new Date(lich.startDate).toLocaleString('en-US', { timeZone: 'UTC' });

            updatedData.push({
                ...lich,
                endDate: localEndDate,
                startDate: localStartDate,
            });
        });

        if (updatedData) {
            // Nếu tìm thấy môn học, cập nhật data bằng môn học đó
            setData(updatedData);
        }
    }, [tenMonHoc, isModelVisible]);

    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    const Appointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
        data: AppointmentData;
    }> = ({ children, style, data, ...restProps }) => {
        const dynamicBackgroundColor = data.ghiChu === "Tạm ngưng" ? 'rgb(248, 200, 195)' : '';
        return (
            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor: dynamicBackgroundColor,
                    borderRadius: '8px',
                }}
                onClick={() => {
                    handleAppointmentClick(data);
                    toggleModelVisibility();
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

                    Ghi chú: <span style={{ color: 'red' }}>
                        {data.ghiChu}
                    </span>

                </div>
            </Appointments.Appointment>)
    }

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
    const [selectedAppointment, setSelectedAppointment] = useState({});

    const handleAppointmentClick = (data: Object) => {
        setSelectedAppointment(data);
    };

    const toggleModelVisibility = () => {
        setModelVisible(!isModelVisible);
    };
    const toggleClose = () => {
        setModelVisible(false);
        setSelectedAppointment({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleUpdateSchedule = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/admin/update-schedule', {
                method: 'POST',
                body: JSON.stringify(selectedAppointment),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setModelVisible(false);
                setSelectedAppointment({});
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelSchedule = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/admin/cancel-schedule', {
                method: 'POST',
                body: JSON.stringify(selectedAppointment),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setModelVisible(false);
                setSelectedAppointment({});
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    //--------------------------------
    // const initialFormData: FormData = selectedAppointment !=null
    // ?
    //     {
    //         title: 'a',
    //     tenGV: 'a',
    //     phongHoc: 'a',
    //     tiet: 'a',
    //     ghiChu: 'a',
    //     }:{
    //         title: '',
    //         tenGV: '',
    //         phongHoc: '',
    //         tiet: '',
    //         ghiChu: '',
    //     }

    //   const [formData, setFormData] = useState<FormData>(initialFormData);

    //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //   };
    //-------------------------------

    const tenMon = danhSach.DanhSachHocPhan.find((item: any) => item.maLopHocPhan === tenMonHoc);

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="ChiTietMonHoc_Content ">
                            <h2>Lịch theo môn {tenMon.tenMonHoc} </h2>

                            <div className={`ChiTietMonHoc_Lich  ${isModelVisible ? 'faded' : ''}`}>
                                <React.Fragment>
                                    <ExternalViewSwitcher
                                        currentViewName={currentViewName}
                                        onChange={currentViewNameChange}
                                    />
                                    <Paper>
                                        <Scheduler data={data} height={620}>
                                            <ViewState
                                                defaultCurrentDate="2023-10-24"
                                                currentViewName={currentViewName}
                                            />
                                            <WeekView
                                                startDayHour={5.5} // Giờ bắt đầu buổi sáng
                                                endDayHour={21} // Giờ kết thúc buổi tối
                                                cellDuration={60}
                                            />
                                            <MonthView />
                                            <Toolbar />
                                            <DateNavigator />
                                            <TodayButton />

                                            <Appointments
                                                appointmentComponent={
                                                    currentViewName === 'Week' ? Appointment : customAppointment
                                                }
                                            />
                                            {currentViewName === 'Month' ? (
                                                <AppointmentTooltip showCloseButton />
                                            ) : (
                                                <></>
                                            )}
                                        </Scheduler>
                                    </Paper>
                                </React.Fragment>
                            </div>
                            <div className="ChiTietMonHoc_Form">
                                {isModelVisible && (
                                    <div className="form-container">
                                        <h2>Thông tin lịch</h2>
                                        <div onClick={toggleClose} className="form-button-close">
                                            <div className="form-button-close-x">x</div>
                                        </div>
                                        <div>
                                            <label className="form-label">Tên môn :</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="title"
                                                value={selectedAppointment.title}
                                            // onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tên giảng viên: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="tenGV"
                                                value={selectedAppointment.tenGV}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Phòng học: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="phongHoc"
                                                value={selectedAppointment.phongHoc}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tiết học: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="tietHoc"
                                                value={selectedAppointment.tietHoc}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Ghi chú: </label>
                                            <textarea
                                                className="form-textarea"
                                                name="ghiChu"
                                                value={selectedAppointment.ghiChu}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <button onClick={handleUpdateSchedule} className="form-button">
                                                Cập nhật
                                            </button>
                                            <button onClick={handleCancelSchedule} style={{ marginLeft: '5px' }}>
                                                Tạm hoãn
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    );
};

export default ChiTietMonHoc;
