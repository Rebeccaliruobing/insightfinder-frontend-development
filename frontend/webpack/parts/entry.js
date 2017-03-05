/* eslint-disable no-console */
/*
 * Build the webpack 'entry' configuration.
 *
 * For each entry, some libraries are prepended:
 * - react-addons-perf react performance collector.
 * - webpack and react HMR client side code.
**/

import isPlainObject from 'lodash/isPlainObject';
import R from 'ramda';
import chalk from 'chalk';

const entry = (settings) => {
  const { entries, isDev, commonEntry } = settings;

  if (!isPlainObject(entries)) {
    console.error(`${chalk.red('error')} The ${chalk.blue('entries')} option` +
      `in ${chalk.blue('webpack.settings.js')} must be a plain object`);
    process.exit();
  }

  // The real entry must be the last item.
  // And if need to add babel- polyfill, it must be the first one.
  const patch = R.map(entry => (isDev ? [].concat([
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'react-addons-perf',
  ], entry) : entry));

  let ret = patch(entries);
  if (isPlainObject(commonEntry)) {
    ret = Object.assign({}, ret, patch(commonEntry));
  }

  return ret;
};

export default entry;
