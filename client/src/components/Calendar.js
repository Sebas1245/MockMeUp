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
} from '@devexpress/dx-react-scheduler-material-ui';
import { useTheme } from '@material-ui/core/styles';

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

const Calendar = () => {
    const currentDate = new Date();
    
    return (
        <Scheduler
            data={dummyAppointments}
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
