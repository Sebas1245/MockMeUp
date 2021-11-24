import React from 'react';
import { CssBaseline } from '@material-ui/core';
// Landing Page
import LandingPage from './views/LandingPage';
// Login Component 
import SignIn from './views/SignIn';
// Sign Up Component
import SignUp from './views/SignUp';
import {  Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth'
import Dashboard from './views/Dashboard';
import Theme from './Theme';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Theme>
        <div>
          <CssBaseline />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
            path="/dashboard"
            element={ 
               <RequireAuth>
                  <Dashboard />
              </RequireAuth> 
            }
          />
          </Routes>

        </div>
    </Theme>
    </QueryClientProvider>
  );
}

export default App;
