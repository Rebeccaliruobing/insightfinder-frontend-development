import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, useRouterHistory, IndexRoute, IndexRedirect} from 'react-router';
import { createHashHistory } from 'history'
import {Console, Link} from './artui/react';
import {routes as cloutRoutes} from './components/cloud';
import {Settings} from './components/settings';
import './apis';

const APPID = `app`;

const EmptyContent = function(props) {
  return (
    <Console.Content style={{height: 1000}}>Hello Insightfinder!</Console.Content>
  )
};

const App = function(props) {
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}>
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

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

$('body').prepend($(`<div id='${APPID}'></div>`))
const appBody = document.querySelector(`#${APPID}`);
if (appBody) {
  ReactDOM.render((
    <Router history={appHistory}>
      <Route component={App} path="/">
        <IndexRedirect to="/cloud" />
        {cloutRoutes}
        <Route component={Settings} path="settings" >
          <IndexRoute component={EmptyContent} />
        </Route>
      </Route>
    </Router>
  ), appBody);
}
