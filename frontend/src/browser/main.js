/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './app/Root';

const appElement = document.getElementById('app');

// Initial render
ReactDOM.render(
  <AppRoot />,
  appElement);

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const NextAppRoot = require('./app/Root').default;

    ReactDOM.render(
      <NextAppRoot />,
      appElement);
  });
}
