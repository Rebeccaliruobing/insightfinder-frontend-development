/*
 * home.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect, Link} from 'react-router';
import {Console} from './artui/react';

import {Monitoring, Projects, Summary} from './components/monitoring';
import Analysis from './components/analysis';
import Settings from './components/settings';

const logo = require('./images/logo.png');


const EmptyContent = function(props) {
  return (
    <div style={{height: 1000}}>Hello World!</div>
    )
};

const App = function(props) {
  return (
    <Console>
      <Console.Topbar logo={logo}>
        <Link to="/monitoring" className="item">Cloud Monitoring</Link>
        <Link to="/analysis" className="item">File Analysis</Link>
        <Link to="/settings" className="item">Alert Settings</Link>
        <div className="right menu">
          <div className="ui right simple dropdown item">
            <i className="user icon circular teal inverted"></i>
            Guest
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">
                <i className="icon power"></i>Logout
              </div>
            </div>
          </div>
        </div>
      </Console.Topbar>
      {props.children}
    </Console>
  );
};

const pageBody = document.querySelector('#app');
if (pageBody) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRedirect to="/monitoring" />
        <Route component={Monitoring} path="monitoring">
          <IndexRedirect to="/monitoring/projects" />
          <Route component={Projects} path="projects" />
          <Route component={Summary} path="summary" />
        </Route>
        <Route component={Analysis} path="analysis" />
        <Route component={Settings} path="settings" />
      </Route>
    </Router>
  ), pageBody);
}
