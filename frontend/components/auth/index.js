import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import Login from './login';

const App = function(props) {
  return (
    <div className="auth ui middle center aligned container">
      <div>
        {props.children}
      </div>
    </div>
  );
};

export const AuthRoute = (
  <Route component={App} path="auth">
    <IndexRedirect to="/auth/login" />
    <Route component={Login} path="login" />
  </Route>
);