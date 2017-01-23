/*
 * Build the webpack 'entry' configuration.
 *
 * For each entry, some libraries are prepended:
 * - react-addons-perf: react performance collector.
 * - webpack HMR client side code.
 *
 * Dependant packages:
 * $ npm i -S babel-runtime
 * $ npm i -D react-hot-loader react-addons-perf
**/

import _ from 'lodash';

const entry = (settings) => {
  const { entries, isDev } = settings;

  if (!_.isPlainObject(entries)) {
    throw new Error('The entries option must be a plain object.');
  }

  const ret = {};

  _.forEach(entries, (v, k) => {
    let items = [
    ];

    if (isDev) {
      items = items.concat([
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        'react-addons-perf',
      ]);
    }

    ret[k] = items.concat(v);
  });

  return ret;
};

export default entry;
