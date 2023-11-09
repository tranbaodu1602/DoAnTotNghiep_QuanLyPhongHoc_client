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
import { MonHoc } from '../../../../DataSample';

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
    useEffect(() => {
        const tenMonHocCanTim = tenMonHoc; // Tên môn học bạn muốn tìm
        const monHocDaTim = MonHoc.data.roomData.find((item) => item.maLopHocPhan === tenMonHocCanTim);
        if (monHocDaTim) {
            // Nếu tìm thấy môn học, cập nhật data bằng môn học đó
            setData(monHocDaTim.thongTinLich);
        }
    }, [tenMonHoc]);
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
    const [selectedAppointment, setSelectedAppointment] = useState({});

    const handleAppointmentClick = (data: Object) => {
        setSelectedAppointment(data);
        console.log('datatest', selectedAppointment);
    };

    const [isModelVisible, setModelVisible] = useState(false);

    const toggleModelVisibility = () => {
        setModelVisible(!isModelVisible);
    };
    const toggleClose = () => {
        setModelVisible(false);
        setSelectedAppointment({})
    }
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

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout>

                    <Content>
                        <div className="ChiTietMonHoc_Content ">
                            <h2>Lịch theo môn học</h2>
                            <div className='ChiTietMonHoc_Add' >
                                <button onClick={toggleModelVisibility}>Thêm lịch</button>
                            </div>
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
                                                startDayHour={6.5} // Giờ bắt đầu buổi sáng
                                                endDayHour={22} // Giờ kết thúc buổi tối
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
                            <div className="ChiTietMonHoc_Form" >
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

                                                value={selectedAppointment ? selectedAppointment.title : ''}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tên giảng viên: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={selectedAppointment ? selectedAppointment.tenGV : ''}

                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Phòng học: </label>
                                            <input
                                                type="text"
                                                className="form-input"

                                                value={selectedAppointment ? selectedAppointment.phongHoc : ''}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tiết học: </label>
                                            <input
                                                type="text"
                                                className="form-input"

                                                value={selectedAppointment ? selectedAppointment.tietHoc : ''}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Ghi chú: </label>
                                            <textarea
                                                className="form-textarea"
                                                value={selectedAppointment ? selectedAppointment.ghiChu : ''}
                                            />
                                        </div>
                                        <div>
                                            <button className="form-button">Cập nhật</button>
                                            <button style={{ marginLeft: "5px" }}>tạm hoãn</button>

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
