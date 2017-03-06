/* @flow */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as Redux } from 'react-redux';
import App from '../../../root';
import AppNext from './App';

type Props = {
  store: Object;
};

// Use ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {
  props: Props;
  render() {
    const { store } = this.props;
    // Switch between different version
    return (
      <Redux store={store}>
        <Router>
          <Switch>
            <Route path="/v2" component={AppNext} />
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </Redux>
    );
  }
}

export default Root;
