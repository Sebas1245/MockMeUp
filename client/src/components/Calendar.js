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
import { useInterviews } from '../hooks/useInterviews';

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
            <Appointments />
            <AppointmentTooltip />
            <Toolbar/>
            <DateNavigator />
            <ViewSwitcher />
        </Scheduler>
    )
};

/* TODO Add a Tooltip component as well
import { useTheme } from '@material-ui/core/styles';

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
*/

export default Calendar;
