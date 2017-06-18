/* @flow */
import React from 'react';
import { Provider as Redux } from 'react-redux';
import App from './App';

type Props = {
  store: Object,
  history: Object,
};

// Use ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {
  props: Props;

  render() {
    const { store, history } = this.props;
    return (
      <Redux store={store}>
        <App history={history} />
      </Redux>
    );
  }
}

export default Root;
