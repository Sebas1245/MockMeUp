import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import JoinAs from './components/JoinAs'

const useStyles = makeStyles((theme) => ({

    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/landingPageBG.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }


}));


function App() {
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      <CssBaseline/>
      <Header />
     
      <JoinAs />
    </div>
  );
}

export default App;
