import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Collapse, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll'
// React Router 
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    fontFamily: 'Raleway',
  },
  btnLogin: {
    color: '#fff',
    marginRight: '2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
  btnSignUp: {
    color: '#fff',
    borderColor: '#07777D',
    fontWeight: 'bold',
    marginRight: '2rem',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#62A8AC',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    fontFamily: 'Farro',
  },
  banner: {
    color: '#fff',
    fontSize: '2.5rem',
    fontFamily: 'Farro',
    display: 'inline-block',
    textAlign: 'center',

  },
  color: {
    color: '#62A8AC',
    fontWeight: 'bold',
    backgroundColor: '#24211a',
    padding: '10px',
    borderRadius: '10px',
    fontFamily: 'Chakra Petch',
  },

  goDown: {
    color: '#fff',
    fontSize: '3rem',

  }

}));



export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
    let cursor = true;
    const speed = 350;
    const interval = setInterval(() => {
      if (cursor) {
        document.getElementById('cursor').style.opacity = 0;
        cursor = false;
      } else {
        document.getElementById('cursor').style.opacity = 1;
        document.getElementById('cursor').style.color = '#d4374c';
        cursor = true;
      }
    }, speed);
    return () => {
      clearInterval(interval);
    }
  }, [])



  return (
    <div className={classes.root} id="header">


      <AppBar className={classes.appbar}  >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Mock Me Up
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button className={classes.btnLogin}>
              Login
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" className={classes.btnSignUp}>
              Sign Up
            </Button>
          </Link>

        </Toolbar>
      </AppBar>

      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
        <div className={classes.banner}>
          <h1>One place to <br /> <span className={classes.color}>connect<span id="cursor">|</span> </span></h1>
          <div class={classes.goDown}>
            <Scroll to="roles" smooth={true}>
              <IconButton>
                <KeyboardArrowDownIcon className={classes.goDown} />
              </IconButton>
            </Scroll>

          </div>
        </div>
      </Collapse>


    </div>
  );
}


