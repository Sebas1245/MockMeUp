import React from 'react';
import Header from '../components/Header';
import JoinAs from '../components/JoinAs';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/landingPageBG.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }


}));
const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header />
            <JoinAs />
        </div>
    )
}

export default LandingPage;