/* eslint-disable no-console */
/*
 * Build the webpack 'entry' configuration.
 *
 * For each entry, some libraries are prepended:
 * - react-addons-perf react performance collector.
 * - webpack and react HMR client side code.
**/

import isPlainObject from 'lodash/isPlainObject';
import forEach from 'lodash/forEach';
import chalk from 'chalk';

const entry = (settings) => {
  const { entries, isDev } = settings;

  if (!isPlainObject(entries)) {
    console.error(`${chalk.red('error')} The ${chalk.blue('entries')} option` +
    `in ${chalk.blue('webpack.settings.js')} must be a plain object`);
    process.exit();
  }

  const ret = {};

  forEach(entries, (v, k) => {
    let items = [];

    if (isDev) {
      items = items.concat([
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'react-addons-perf',
      ]);
    }

    ret[k] = items.concat(v);
  });

  return ret;
};

export default entry;
