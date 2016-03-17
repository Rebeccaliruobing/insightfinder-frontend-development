/*
 * home.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Header from './components/header';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const pageBody = document.querySelector('#page-body');
if (pageBody) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
      </Route>
    </Router>
  ), pageBody);
}
