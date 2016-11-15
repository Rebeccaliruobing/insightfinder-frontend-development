/*
 * Bootstrap environment
**/

const onWindowIntl = () => {
  require('babel-polyfill');
  require('../../app');
};

onWindowIntl();
