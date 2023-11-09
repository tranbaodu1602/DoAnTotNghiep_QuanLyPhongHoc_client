
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AdminSider from '../AdminSider/AdminSider';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './ChiTietPhong.scss'
import { MonHoc } from '../../../../DataSample';
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


const { Content } = Layout;

type ParamType = {
    toanha: string;
};
interface AppointmentData {
    startDate: Date,
    endDate: Date,
    phongHoc: string,
    ghiChu: string,
    tenGV: string,
    tietHoc: string,

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
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [data, setData] = useState([]);
    useEffect(() => {
        // Tạo một mảng mới để lưu các object có phongHoc giống nhau
        const lichHocGiongPhong = [];

        MonHoc.data.roomData.forEach((monHoc) => {
            monHoc.thongTinLich.forEach((lich) => {
                if (lich.phongHoc === toanha) {
                    lichHocGiongPhong.push(lich);
                }
            });
        });

        // Cập nhật data với danh sách các lịch học có phongHoc giống nhau
        setData(lichHocGiongPhong);
    }, [toanha]);

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
    const [isModelVisible, setModelVisible] = useState(false)

    const toggleModelVisibility = () => {
        setModelVisible(!isModelVisible);
    };
    const toggleClose = () => {
        setModelVisible(false);
        setSelectedAppointment({})
    }
    ///-------------
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        phongHoc: toanha,
        ghiChu: '',
        tenGV: '',
        tietHoc: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAdd = () => {
        const newEvent = {
            title: formData.title,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
            phongHoc: formData.phongHoc,
            ghiChu: formData.ghiChu,
            tenGV: formData.tenGV,
            tietHoc: formData.tietHoc,
        };

        console.log(newEvent);

        // Đặt lại trạng thái form
        setFormData({
            title: '',
            startDate: '',
            endDate: '',
            phongHoc: '',
            ghiChu: '',
            tenGV: '',
            tietHoc: '',
        });
    }
    ///---------------

    return (
        <>
            <AdminNavbar />
            <Layout style={{ minHeight: '100vh', marginTop: '2px' }}>
                <AdminSider />
                <Layout >
                    <Content >
                        <div className='PhongHoc__content'>
                            <div className='PhongHoc__lichHoc'>
                                <div className='PhongHoc__ten'>
                                    <h2>Lịch của phòng {toanha}</h2>
                                </div>
                                <div className={`PhongHoc__lich ${isModelVisible ? 'faded' : ''}`}>
                                    <div className='PhongHoc__button'>
                                        <div className='PhongHoc__add'>
                                            <Button type="primary" onClick={toggleModelVisibility}>Thêm</Button>
                                        </div>
                                        <div className='PhongHoc__update'>

                                            <DatePicker
                                                className='date'
                                                placeholder="Ngày bắt đầu"
                                                value={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                format="YYYY-MM-DD"
                                            />
                                            <DatePicker
                                                className='date'
                                                placeholder="Ngày kết thúc"
                                                value={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                format="YYYY-MM-DD"
                                            />
                                            <Button type="primary" onClick={handleUpdateClick} className='update'>
                                                Cập nhật
                                            </Button>

                                        </div>
                                    </div>
                                    <div className='PhongHoc__danhsach'>
                                        <React.Fragment>
                                            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
                                            <Paper>
                                                <Scheduler data={data} height={620}>
                                                    <ViewState defaultCurrentDate="2023-10-24" currentViewName={currentViewName} />
                                                    <WeekView
                                                        startDayHour={6.5} // Giờ bắt đầu buổi sáng
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
                                    </div>
                                </div>
                            </div>
                            <div className='PhongHoc_form'>
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
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tên giảng viên: </label>
                                            <input
                                                type="text"
                                                className="form-input"

                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Phòng học: </label>
                                            <input
                                                type="text"
                                                value={toanha}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Tiết học: </label>
                                            <input
                                                type="text"
                                                className="form-input"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Ghi chú: </label>
                                            <textarea
                                                className="form-textarea"

                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Giờ bắt đầu: </label>
                                            <input className="form-input" type="datetime-local" />
                                        </div>
                                        <div>
                                            <label className="form-label">Giờ kết thúc: </label>
                                            <input className="form-input" type="datetime-local" />
                                        </div>
                                        <div>
                                            <button className="form-button" >Thêm</button>

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
