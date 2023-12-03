import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './ChiTietPhong.scss';
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
import { DatePicker, Button } from 'antd';
import moment from 'moment';

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

const { Content } = Layout;

type ParamType = {
    toanha: string;
};
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

const ChiTietPhongHoc: React.FC = () => {
    const { toanha } = useParams<ParamType>();
    const [isRerender, setRerender] = useState(false);

    const storedData: any = localStorage.getItem('myDataKey');
    const danhSach = JSON.parse(storedData);

    socket.on('createAppointment', (DSHP: any) => {
        danhSach.DanhSachHocPhan = DSHP;
        localStorage.setItem('myDataKey', JSON.stringify(danhSach));
        setRerender(!isRerender);
    });

    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);

    const [data, setData] = useState([]);
    const [isModelVisible, setModelVisible] = useState(false);

    useEffect(() => {
        const lichHoc = danhSach.DanhSachHocPhan.flatMap((monHoc) =>
            monHoc.thongTinLich.filter((lichHoc) => lichHoc.phongHoc === toanha),
        );

        const updatedData = [];

        lichHoc.forEach((lich) => {
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
    }, [isRerender]);

    const handleUpdateClick = () => {
        // Xử lý cập nhật dữ liệu ở đây
    };
    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    const Appointment: React.FC<{
        children: React.ReactNode;
        style: React.CSSProperties;
        data: AppointmentData;
    }> = ({ children, style, data, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                /* backgroundColor: '#FFC107', */
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

    const toggleModelVisibility = () => {
        setModelVisible(!isModelVisible);
    };
    const toggleClose = () => {
        setModelVisible(false);
    };
    ///-------------
    const [formData, setFormData] = useState({
        title: '',
        member: [],
        phongHoc: toanha,
        ghiChu: '',
        startDate: '',
        endDate: '',
    });
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [statusAddMember, setStatusAddMember] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const handleMemberSelection = (e) => {
        const memberName = e.target.value;
        const isChecked = e.target.checked;

        let updatedMembers = [...selectedMembers];

        if (isChecked) {
            updatedMembers = [...selectedMembers, memberName];
        } else {
            updatedMembers = selectedMembers.filter((name) => name !== memberName);
        }

        setSelectedMembers(updatedMembers);

        // Cập nhật formData
        setFormData({
            ...(formData as any),
            member: updatedMembers,
        });
    };

    const handleAddMember = () => {
        setStatusAddMember(!statusAddMember);
    };

    const handleAddAppointment = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/admin/create-appointment', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('oke');
                setModelVisible(false);
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Đặt lại trạng thái form
        // setFormData({
        //     title: '',
        //     startDate: '',
        //     endDate: '',
        //     phongHoc: '',
        //     ghiChu: '',
        //     tenGV: '',
        //     tietHoc: '',
        // });
    };
    ///---------------

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>
                    <Content>
                        <div className="PhongHoc__content">
                            <div className="PhongHoc__lichHoc">
                                <div className="PhongHoc__ten">
                                    <h2>Lịch của phòng {toanha}</h2>
                                </div>
                                <div className={`PhongHoc__lich ${isModelVisible ? 'faded' : ''}`}>
                                    <div className="PhongHoc__button">
                                        <div className="PhongHoc__add">
                                            <Button type="primary" onClick={toggleModelVisibility}>
                                                Thêm cuộc họp
                                            </Button>
                                        </div>
                                        <div className="PhongHoc__update">
                                            <DatePicker
                                                className="date"
                                                placeholder="Ngày bắt đầu"
                                                value={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                format="YYYY-MM-DD"
                                            />
                                            <DatePicker
                                                className="date"
                                                placeholder="Ngày kết thúc"
                                                value={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                format="YYYY-MM-DD"
                                            />
                                            <Button type="primary" onClick={handleUpdateClick} className="update">
                                                Cập nhật
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="PhongHoc__danhsach">
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
                                                        // timeTableCellComponent={CustomTimeTableCell}
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
                                </div>
                            </div>
                            <div className="PhongHoc_form">
                                {isModelVisible && (
                                    <div className="form-container">
                                        <h2>Thêm cuộc họp</h2>
                                        <div onClick={toggleClose} className="form-button-close">
                                            <div className="form-button-close-x">x</div>
                                        </div>
                                        <div>
                                            <label className="form-label">Tiêu đề</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Thành viên cuộc họp</label>
                                            <Button
                                                onClick={handleAddMember}
                                                style={{ margin: 'auto', paddingTop: 4 + 'px' }}
                                                type="primary"
                                            >
                                                Thêm
                                                <i
                                                    style={{ marginLeft: 8 + 'px' }}
                                                    className="fa-solid fa-circle-plus"
                                                ></i>
                                            </Button>
                                            {statusAddMember === true ? (
                                                <>
                                                    {danhSach.DanhSachGiaoVien.map((value: any, key: any) => (
                                                        <div key={key}>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    value={value.ThongTinCaNhan.hoTenGV}
                                                                    checked={selectedMembers.includes(
                                                                        value.ThongTinCaNhan.hoTenGV,
                                                                    )}
                                                                    onChange={handleMemberSelection}
                                                                />
                                                                {value.ThongTinCaNhan.hoTenGV}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div>
                                            <label className="form-label">Phòng học: </label>
                                            <input type="text" value={toanha} className="form-input" readOnly />
                                        </div>
                                        <div>
                                            <label className="form-label">Ghi chú: </label>
                                            <textarea
                                                className="form-textarea"
                                                name="ghiChu"
                                                value={formData.ghiChu}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Giờ bắt đầu: </label>
                                            <input
                                                className="form-input"
                                                type="datetime-local"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Giờ kết thúc: </label>
                                            <input
                                                className="form-input"
                                                type="datetime-local"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                onClick={handleAddAppointment}
                                                className="form-button"
                                            >
                                                Thêm
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

export default ChiTietPhongHoc;
