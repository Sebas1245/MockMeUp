import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                MockMeUp
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#07777d',

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#fff',
        backgroundColor: '#07777d',
        '&:hover': {
            backgroundColor: '#055f64',
        },

    },
    formControl: {
        width: '100%',
    },
}));

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

const programmingLanguages = [
    'Python',
    'JavaScript',
    'Java',
    'C/C++',
    'GoLang',
    'C#',
    'SQL',
    'Dart',
    'R',
    'PHP',
];

export default function SignUp() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('')
    const [language, setProgrammingLanguages] = React.useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !phone || !role || !language || !password || !confirmPassword) {
            setErrorMsg("Fill in all required fields");
            setOpen(true);
        }
        else if (password !== confirmPassword) {
            setErrorMsg("Passwords are different");
            setOpen(true);
        }
        else {
            const requestUrl = process.env.REACT_APP_BACKEND_URI + "/api/register";
            try {
                const res = await axios.post(requestUrl, {
                    name,
                    email,
                    role,
                    phone,
                    programmingLanguages: language,
                    password,
                    confirmPassword
                })
                const { token, user } = res.data;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userName', user.name);
                sessionStorage.setItem('userRole', user.role);
                navigate('/dashboard');

            }
            catch (error) {
                setErrorMsg(error.response.data);
                setOpen(true);
            }
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up

                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="firstName"
                                label="Your name"
                                autoFocus
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Mobile phone"
                                name="phone"
                                autoComplete="phone"
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Sign up as</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    onChange={event => setRole(event.target.value)}
                                >
                                    <MenuItem value={"interviewer"}>Interviewer</MenuItem>
                                    <MenuItem value={"interviewee"}>Interviewee</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="demo-mutiple-checkbox-label">Favorite Programming Languages</InputLabel>
                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={language}
                                    onChange={event => setProgrammingLanguages(event.target.value)}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {programmingLanguages.map((programmingLanguage) => (
                                        <MenuItem key={programmingLanguage} value={programmingLanguage}>
                                            <Checkbox checked={language.indexOf(programmingLanguage) > -1} />
                                            <ListItemText primary={programmingLanguage} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword "
                                label="Confirm Password "
                                type="password"
                                id="confirmPassword "
                                autoComplete="current-password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" >

                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}