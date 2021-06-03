import React from 'react';
import { CssBaseline } from '@material-ui/core';
// Landing Page
import LandingPage from './views/LandingPage';
// Login Component 
import SignIn from './views/SignIn';
// Sign Up Component
import SignUp from './views/SignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import BookInterviewForm from './components/BookInterviewForm';



function App() {

  return (
    <Router>
      <div>
        <CssBaseline />

         <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          
        </Switch> 
       
      </div>
    </Router>
  );
}

export default App;
