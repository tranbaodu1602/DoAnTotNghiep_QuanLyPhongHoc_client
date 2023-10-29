import React, { useState } from 'react';
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
import { SinhVien } from '../../../../DataSample';

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

const Appointment: React.FC<{
    children: React.ReactNode;
    style: React.CSSProperties;
}> = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#FFC107',
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>
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
    const [data] = useState(SinhVien.ThongTinHocPhan.appointments);
    const [currentViewName, setCurrentViewName] = useState('Week');

    const currentViewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentViewName(e.target.value);
    };

    return (
        <React.Fragment>
            <ExternalViewSwitcher currentViewName={currentViewName} onChange={currentViewNameChange} />
            <Paper>
                <Scheduler data={data} height={620}>
                    <ViewState defaultCurrentDate="2023-10-24" currentViewName={currentViewName} />
                    <WeekView
                        startDayHour={6.5} // Giờ bắt đầu buổi sáng
                        endDayHour={21} // Giờ kết thúc buổi tối
                        cellDuration={60}
                    />

                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments /*appointmentComponent={Appointment}*/ />
                    <AppointmentTooltip showCloseButton />
                </Scheduler>
            </Paper>
        </React.Fragment>
    );
};

export default LearningCalendar;
