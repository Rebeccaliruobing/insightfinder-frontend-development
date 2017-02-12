import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Redux } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import localforage from 'localforage';

import getBrowserLocale from '../common/getBrowserLocale';
import configureStore from '../common/configureStore';
import AppRoot from '../../root';

const createInitialState = () => {
  // Merge server states with default web states as the initial states.
  const state = JSON.parse(window.__INITIAL_STATE__ || '{}'); // eslint-disable-line no-underscore-dangle
  return {
    ...state,
    app: {
      appName: 'InsightFinder',
      appVersion: '1.1',
      isReactNative: false,
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
  <AppContainer>
    <Redux store={store}>
      <AppRoot />
    </Redux>
  </AppContainer>
), appElement);

if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('../../root', () => {
    const NextAppRoot = require('../../root').default;

    ReactDOM.render((
      <AppContainer>
        <Redux store={store}>
          <NextAppRoot />
        </Redux>
      </AppContainer>
    ), appElement);
  });
}
