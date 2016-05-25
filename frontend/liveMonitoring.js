import './app.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import {Console, Link} from './artui/react';

import './apis';
import ProjectDetails from './components/cloud/monitoring/details';

const App = function(props) {
  let {location, params} = props;
  return (
    <Console>
      <Console.Topbar logo={require('./images/logo.png')}>
      </Console.Topbar>
      <ProjectDetails location={location} params={params} />
    </Console>
  );
};

$('body').prepend($('<div id="app"></div>'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={App} path="/liveMonitoring"/>
  </Router>
), document.querySelector('#app'));
