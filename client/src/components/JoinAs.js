import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import CardImg from './CardImg';
import roles from './../roles';
import useWindowPosition from './../useWindosPosition';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    
}));



export default function JoinAs() {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
        <div className={classes.root} id="roles">
  
        <CardImg role = {roles[0]} checked={checked} />
        <CardImg role = {roles[1]} checked={checked} />
           
        </div>
    );
}


