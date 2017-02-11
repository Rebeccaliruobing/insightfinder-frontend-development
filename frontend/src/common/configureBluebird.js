/*
 * Use bluebird to replace promise as it's fast and easy to use.
 *
 * http://bluebirdjs.com/docs/why-bluebird.html
 * https://github.com/babel/babel-loader#custom-polyfills-eg-promise-library
**/

const Bluebird = require('bluebird');

Bluebird.config({ warnings: false });
require('babel-runtime/core-js/promise').default = Bluebird;

module.exports = Bluebird;
