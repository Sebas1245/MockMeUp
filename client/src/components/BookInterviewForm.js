import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import MuiAlert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
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
  payment: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const intTypes = [
  {
    value: 'Web',
    label: 'Web Development',
  },
  {
    value: 'VGDev',
    label: 'Videogame Development',
  },
  {
    value: 'AppDev',
    label: 'App Development',
  },
  {
    value: 'DS',
    label: 'Data Science',
  },
  {
    value: 'SD',
    label: 'Software Development',
  },
];

const freeOrPro = [
  {
    value: 'Free',
    label: 'Free',
  },
  {
    value: 'PRO',
    label: 'PRO',
  }
]

export default function BookInterviewForm() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [intType, setType] = React.useState('Web');
  const [freePro, setFreePro] = React.useState('Free');
  const [selectedExDate, handleExDateChange] = useState(new Date());
  const [ccNumber, setccNumber] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [cvc, setCvc] = useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFreeProChange = (event) => {
    setFreePro(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Book an Interview!
                </Typography>
        <form className={classes.form} noValidate>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              disablePast
              fullWidth
              value={selectedDate}
              onChange={handleDateChange}
              id="interviewDate"
              margin="normal"
              name="interviewDate"
              helperText="Pick a date for your interview"
              requiered
            />
          </MuiPickersUtilsProvider>

          <TextField
            fullWidth
            id="interviewType"
            name="interviewType"
            margin="normal"
            select
            value={intType}
            onChange={handleTypeChange}
            helperText="Pick an interview topic"
            requiered
          >
            {intTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            id="interviewType"
            name="interviewType"
            margin="normal"
            select
            value={freePro}
            onChange={handleFreeProChange}
            helperText="Pick an interview type"
          >

            {freeOrPro.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>


          {freePro === "PRO" &&
            (
              <div className={classes.payment}>

                <FormLabel component="legend">Payment Information</FormLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="First Name"
                  name="firstName"
                  value={fName}
                  fullWidth
                  onChange={event => setfName(event.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="Last Name"
                  name="lastName"
                  value={lName}
                  onChange={event => setlName(event.target.value)}
                  fullWidth
                />

                <TextField
                  label="Credit Card Number"
                  margin="normal"
                  name="ccnumber"
                  variant="outlined"
                  value={ccNumber}
                  required
                  fullWidth
                  inputProps={{ pattern: "[1-9]{16}" }}
                  onChange={event => setccNumber(event.target.value)}
                />


                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        margin="normal"
                        views={["year", "month"]}
                        disablePast
                        name="exDate"
                        value={selectedExDate}
                        helperText="Expiration Date"
                        required
                        onChange={handleExDateChange}
                      />
                    </MuiPickersUtilsProvider>

                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      helperText="Security Code"
                      required
                      inputProps={{ pattern: "[1-9]{3}" }}
                      label="CVC"
                      name="CVC"
                      value={cvc}
                      onChange={event => setCvc(event.target.value)}
                    />
                  </Grid>
                </Grid>


              </div>)
          }


          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register Interview
                    </Button>


        </form>
      </div>

    </Container>
  );
}

