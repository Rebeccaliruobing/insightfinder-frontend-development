/*
 * Bootstrap environment
**/

const onWindowIntl = () => {
  require('babel-polyfill');
  require('../../commons');
  require('./main');
};

onWindowIntl();
