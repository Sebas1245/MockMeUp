import 'date-fns';
import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
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
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const classes = useStyles();
    const theme = useTheme();   
    const currentDate = new Date()
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [startTime, setStartTime] = useState(currentDate)
    const [endTime, setEndTime] = useState(currentDate)
    const handleSelectedDaysChange = (e) => {
        setSelectedDays(e.target.value)
        setSelectedIndices([...selectedIndices, selectedDays.indexOf(e.target.value)])
    }
    return (
        
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Set your availability for the week!
                </Typography>
                <form className={classes.form}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Your available days</InputLabel>
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
                        <MenuItem key={day} value={day} style={getStyles(day, selectedDays, theme)}>
                        {day}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
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
        </Container>
        
    )
}