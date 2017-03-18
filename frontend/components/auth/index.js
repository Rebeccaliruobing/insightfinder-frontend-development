import React from 'react';
import {Router, Route, browserHistory, IndexRedirect, Redirect} from 'react-router';

import Login from './login';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import ForgotUsername from './forgotUsername';
import Signup from './signup';
import SignupStep2 from './signup2';

export const authRoutes = (
  <Router history={browserHistory}>
    <Route path="/">
      <Route component={Login} path="/login"/>
      <Route component={Signup} path="/signup"/>
      <Route component={SignupStep2} path="/signup2"/>
      <Route component={ForgotPassword} path="/forgotPassword"/>
      <Route component={ResetPassword} path="/resetPassword"/>
      <Route component={ForgotUsername} path="/forgotUsername"/>
      <Redirect from="*" to="/login"/>
    </Route>
  </Router>
);