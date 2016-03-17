/*
 * home.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import Header from './components/header';
import {Monitoring, RegisterProject} from './components/monitoring';
import Analysis from './components/analysis';
import Settings from './components/settings';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
      );
  }
}

const pageBody = document.querySelector('#page-body');
if (pageBody) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRedirect to="/monitoring" />
        <Route component={Monitoring} path="monitoring">
          <Route component={RegisterProject} path="register-project" />
        </Route>
        <Route component={Analysis} path="analysis" />
        <Route component={Settings} path="settings" />
      </Route>
    </Router>
  ), pageBody);
}
