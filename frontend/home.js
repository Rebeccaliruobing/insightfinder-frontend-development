import './home.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import {Console, Link} from './artui/react';

import './apis';
import {Cloud, LiveMonitoring} from './components/cloud';
import {Settings} from './components/settings';

const logo = require('./images/logo.png');

const EmptyContent = function(props) {
  return (
    <Console.Content style={{height: 1000}}>Hello Insightfinder!</Console.Content>
  )
};

const App = function(props) {
  return (
    <Console>
      <Console.Topbar logo={logo}>
        <Link to="/cloud" className="item">Cloud Monitoring</Link>
        <Link to="/settings" className="item">Project Settings</Link>
        <Link to="/file" className="item">File Analysis</Link>
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

const appBody = document.querySelector('#app');
if (appBody) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRedirect to="/cloud" />
        <Route component={Cloud} path="cloud">
          <IndexRedirect to="/cloud/monitoring" />
          <Route component={LiveMonitoring} path="monitoring" />
        </Route>
        <Route component={Settings} path="settings" >
          <IndexRoute component={EmptyContent} />
        </Route>
      </Route>
    </Router>
  ), appBody);
}
