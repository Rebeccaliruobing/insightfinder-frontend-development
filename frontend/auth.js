import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import {AuthRoute} from './components/auth';

$('body').prepend($('<div id="app"></div>'));
ReactDOM.render((
  <Router history={browserHistory}>
    {AuthRoute}
  </Router>
), document.querySelector('#app'));
