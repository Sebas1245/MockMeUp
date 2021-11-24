import * as React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { useTheme } from '@material-ui/core/styles';
import { useInterviews } from '../hooks/useInterviews';

const dummyAppointments = [
    {
        title: 'Interview with John Smith',
        startDate: new Date(2021, 10, 22, 17),
        endDate: new Date(2021, 10, 22, 18),
    }, 
    {
        title: 'Interview with John Smith',
        startDate: new Date(2021, 10, 24, 10),
        endDate: new Date(2021, 10, 24, 11),
    }, 
    {
        title: 'Interview with John Smith',
        startDate: new Date(2021, 10, 23, 13),
        endDate: new Date(2021, 10, 23, 14),
    }, 
]


const formatInterviews = (interviews)=>{
    let formattedInterviews = [];
    if (interviews.interviews !== undefined) {
        interviews.interviews.forEach((interview)=>{
            let startDate = new Date(interview.date);
            let endDate = new Date(new Date(interview.date).setHours(new Date(interview.date).getHours() + 1));
            formattedInterviews.push({title: interview._interviewee.name + " / " + interview._interviewer.name, startDate, endDate });
        });
        return formattedInterviews;
    }
}

const Layout = ({ appointmentMeta, visible, onHide, ...restProps }) => {
    return (<div>
        <p>Component</p>
    </div>)
}

const Calendar = () => {
    const currentDate = new Date();
    const { data: interviews } = useInterviews();
    
    return (
        <Scheduler
            data={formatInterviews(interviews)}
            >
            <ViewState
                    defaultCurrentDate={currentDate}
                />
            <MonthView />
            <WeekView
            startDayHour={8}
            endDayHour={20}
            />
            <Appointments appointmentComponent={CustomAppointmentRender } />
            <AppointmentTooltip layoutComponent={Layout}/>
            <Toolbar/>
            <DateNavigator />
            <ViewSwitcher />
        </Scheduler>
    )
};

const CustomAppointmentRender = ({ children, style, data, ...restProps }) => {
    const theme = useTheme()

    return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: theme.palette.primary.main,
                borderRadius: '5px'
            }}>
            {children}
        </Appointments.Appointment>
    )
}


export default Calendar;
