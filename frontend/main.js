import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as Redux } from 'react-redux';
import localforage from 'localforage';

import getBrowserLocale from './src/common/getBrowserLocale';
import configureStore from './src/common/configureStore';
import AppRoot from './root';

const createInitialState = () => {
  // Merge server states with default web states as the initial states.
  const state = JSON.parse(window.__INITIAL_STATE__ || '{}'); // eslint-disable-line no-underscore-dangle
  return {
    ...state,
    app: {
      appName: 'InsightFinder',
      appVersion: '1.1',
      currentLocale: getBrowserLocale(),
      ...state.app,
    },
  };
};

const store = configureStore({
  initialState: createInitialState(),
  platformDeps: {
    storageEngine: localforage,
  },
});

const appElement = document.getElementById('app');

// Render app with hot support.
// https://gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
ReactDOM.render((
  <Redux store={store}>
    <Router>
      <AppRoot />
    </Router>
  </Redux>
), appElement);
