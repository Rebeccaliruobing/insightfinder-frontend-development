/*
 * Bootstrap environment
**/

const onWindowIntl = () => {
  require('babel-polyfill');
  require('../../commons');
  require('../../app');
};

onWindowIntl();
