/*
 * home.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, 
  IndexRoute, IndexRedirect, Link} from 'react-router';
import {Console} from './artui/react';

import {Monitoring, Projects, Summary, LiveMonitoring} from './components/monitoring';
import Analysis from './components/analysis';
import Settings from './components/settings';

const logo = require('./images/logo.png');


const EmptyContent = function(props) {
  return (
    <Console.Content>
      <div style={{height: 1000}}>Hi Insightfinder!</div>
    </Console.Content>
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
            <i className="user icon circular teal inverted" />
            Guest
            <i className="dropdown icon"/>
            <div className="menu">
              <div className="item">
                <i className="icon power"/>Logout
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
          <Route component={LiveMonitoring} path="live" />
        </Route>
        <Route component={Analysis} path="analysis">
          <IndexRoute component={EmptyContent} />
        </Route>
        <Route component={Settings} path="settings" >
          <IndexRoute component={EmptyContent} />
        </Route>
      </Route>
    </Router>
  ), pageBody);
}
