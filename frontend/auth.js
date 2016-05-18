import './auth.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import {Login} from './components/auth';

const App = function(props) {
  return (
    props.children
  );
};

const appBody = document.querySelector('#auth');
if (appBody) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={App} path="auth">
        <IndexRedirect to="/auth/login" />
        <Route component={Login} path="login" />
      </Route>
    </Router>
  ), appBody);
}
