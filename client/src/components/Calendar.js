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
import Grid from '@material-ui/core/Grid';
import Phone from '@material-ui/icons/Phone';
import Email  from '@material-ui/icons/Email'

const formatInterviews = (interviews)=>{
    let formattedInterviews = [];
    if (interviews.interviews !== undefined) {
        interviews.interviews.forEach((interview)=>{
            let startDate = new Date(interview.date);
            let endDate = new Date(new Date(interview.date).setHours(new Date(interview.date).getHours() + 1));
            formattedInterviews.push({id:interview._id, title: interview._interviewee.name + " / " + interview._interviewer.name, startDate, endDate });
        });
        return formattedInterviews;
    }
}

const getInterviewData=(interviewId, interviews)=>{
    let interviewResult = '';
        interviews.forEach((interview)=>{
            if(interview._id === interviewId){
                interviewResult = interview;
            }
        });
        return interviewResult;
}

const Content = (({
    children, appointmentData, classes, ...restProps
  }) => {
    const { data: interviews } = useInterviews();
    let interviewData = getInterviewData(appointmentData.id, interviews.interviews);
    let role = sessionStorage.getItem('userRole');
      return(
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            {role === 'interviewee' ? 
            <div style={{marginLeft:'25px'}}>
            <p>Interviewer</p>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                <Phone style={{color:"#868686"}}/>
                </Grid>
                <Grid item xs={10}>
                    <p>{interviewData._interviewer.phone}</p>
                </Grid>
                <Grid item xs={2}>
                <Email style={{color:"#868686"}}/>
                </Grid>
                <Grid item xs={10}>
                    <p>{interviewData._interviewer.email}</p>
                </Grid>
            </Grid>
            </div>
           
            
            :
            <div style={{marginLeft:'25px'}}>
            <p>Interviewee</p>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                 <Phone style={{color:"#868686"}}/>
                </Grid>
                <Grid item xs={10}>
                    <p>{interviewData._interviewee.phone}</p>
                </Grid>
                <Grid item xs={2}>
                    <Email style={{color:"#868686"}}/>
                </Grid>
                <Grid item xs={10}>
                    <p>{interviewData._interviewee.email}</p>
                </Grid>
            </Grid>
            </div>
            
            }
          
            </AppointmentTooltip.Content>
      );
  });
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
            <AppointmentTooltip contentComponent={Content} />
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
