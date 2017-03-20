import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import localforage from 'localforage';

import getBrowserLocale from '../common/getBrowserLocale';
import configureStore from '../common/configureStore';
import AppRoot from './app/Root';

const createInitialState = () => {
  // Merge server states with default web states as the initial states.
  const state = JSON.parse(window.__INITIAL_STATE__ || '{}'); // eslint-disable-line no-underscore-dangle
  const windowWidth = window.innerWidth ||
    document.documentElement.clientWidth || document.body.clientHeight;
  const windowHeight = window.innerHeight ||
    document.documentElement.clientHeight || document.body.clientHeight;
  return {
    ...state,
    app: {
      appName: 'InsightFinder',
      appVersion: '1.1',
      currentLocale: getBrowserLocale(),
      viewport: {
        width: windowWidth,
        height: windowHeight,
        widthDiff: 0,
        heightDiff: 0,
      },
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

const render = (Component) => {
  ReactDOM.render((
    <AppContainer>
      <Component store={store} />
    </AppContainer>
  ), document.getElementById('app'));
};

render(AppRoot);

// Render app with hot support.
// https://gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const AppRootNext = require('./app/Root').default;
    render(AppRootNext);
  });
}
