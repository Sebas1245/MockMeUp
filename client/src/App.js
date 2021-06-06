import React from 'react';
import { CssBaseline } from '@material-ui/core';
// Landing Page
import LandingPage from './views/LandingPage';
// Login Component 
import SignIn from './views/SignIn';
// Sign Up Component
import SignUp from './views/SignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Dashboard from './views/Dashboard';
import Theme from './Theme';



function App() {

  return (
    <Theme>
      <Router>
        <div>
          <CssBaseline />

          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>

        </div>
      </Router>
    </Theme>
  );
}

export default App;
