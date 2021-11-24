import 'date-fns';
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Alert from '../components/Alert';
import {getToken} from '../services/tokenUtilities'





const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(1),
      },
      submit: {
        marginTop: '5%',
        marginBottom: '5%',
        backgroundColor: "#304d6d",
        '&:hover': {
          backgroundColor: '#20344a',
        },
    },
}));

function getStyles(day, selectedDays, theme) {
    return {
      fontWeight:
        selectedDays.indexOf(day) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  

export default function InterviewerAvailabilityForm() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const classes = useStyles();
    const theme = useTheme();   
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [startTime, setStartTime] = useState(roundMinutes(new Date()))
    const [endTime, setEndTime] = useState(roundMinutes(new Date()))
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [open, setOpen] = useState(false);
    const [openSucess, setOpenSuccess] = useState(false);
    const handleSelectedDaysChange = (e) => {
        const newSelectedDays = e.target.value;
        setSelectedDays(newSelectedDays)
        let newSelectedIndices = [];
        newSelectedDays.forEach((day) => {
            newSelectedIndices.push(weekdays.indexOf(day));
        })
        newSelectedIndices.sort()
        setSelectedIndices(newSelectedIndices)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitStartTime = startTime.getHours() + (startTime.getMinutes()/60)
        const submitEndTime = endTime.getHours() + (endTime.getMinutes()/60)
        if (submitStartTime === submitEndTime) {
            setErrorMsg('Start and end time cannot be the same!');
            setOpen(true);
        } else if (submitStartTime > submitEndTime) {
            setErrorMsg('Start time cannot be after end time!');
            setOpen(true);
        } else {
            const requestUrl = process.env.REACT_APP_BACKEND_URI + "/api/users/set_available_times";
            const data = {
                availableDays: selectedIndices, 
                availableHourStart: submitStartTime, 
                availableHourEnd: submitEndTime
            }
            const token = getToken();
            console.log(token)
            try {
                const res = await axios.put(requestUrl, data,
                    {
                        headers: {
                            Authorization: `Bearer: ${token}`
                        }
                    }
                )
                if (res.status === 200) {
                    setSuccessMsg('Your availability has been updated!');
                    setOpen(false);
                    setOpenSuccess(true);
                    setSelectedDays([]);
                    setStartTime(roundMinutes(new Date()));
                    setEndTime(roundMinutes(new Date()));
                }
            } catch (error) {
                setErrorMsg(error.response.data.message);
                setOpen(true);
            }
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenSuccess(false);
    };
    return (
        
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Set your availability!
                </Typography>
                <form className={classes.form}
                onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Pick your available days of the week</InputLabel>
                    <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectedDays}
                    onChange={handleSelectedDaysChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                    >
                    {weekdays.map((day) => (
                        <MenuItem key={day} value={day} style={getStyles(day, weekdays, theme)}>
                        {day}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                    minutesStep={30}
                    className={classes.formControl}
                    margin="normal"
                    id="time-picker"
                    label="Pick your start time for each day"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                    <KeyboardTimePicker
                    minutesStep={30}
                    className={classes.formControl}
                    margin="normal"
                    id="time-picker"
                    label="Pick your end time for each day"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </MuiPickersUtilsProvider>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register Availability
                </Button>
            </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openSucess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {successMsg}
                </Alert>
            </Snackbar>
        </Container>
        
    )
}

function roundMinutes(date) {

    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
}