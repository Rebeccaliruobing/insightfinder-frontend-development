/* @flow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Redux } from 'react-redux';
import App from '../../../root';

type Props = {
  store: Object;
};

// Use ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {
  props: Props;
  render() {
    const { store } = this.props;
    return (
      <Redux store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Redux>
    );
  }
}

export default Root;
