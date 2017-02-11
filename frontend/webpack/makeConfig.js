/*
 * Create webpack configuration object based on application settings.
**/

import webpack from 'webpack';
import R from 'ramda';
import webpackSettings from '../webpack.settings';
import babel from './parts/babel';
import assets from './parts/assets';
import entry from './parts/entry';
import output from './parts/output';
import html from './parts/html';
import styles from './parts/styles';

const makeConfig = () => {
  const settings = R.clone(webpackSettings);

  const env = process.env.NODE_ENV;
  settings.isDev = env === 'development';
  settings.isProd = env === 'production';

  const { isDev } = settings;

  const babelSettings = babel(settings);
  const styleSettings = styles(settings);
  const htmlSettings = html(settings);

  // The rules used to load the modules.
  const rules = R.filter(R.identity)([].concat(
    babelSettings.rules,
    styleSettings.rules,
    assets(settings),
    settings.moduleRules,
  ));

  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: true,
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['assets/common', 'assets/manifest'],
    }),
  ];

  plugins = R.filter(R.identity)(plugins.concat(
    htmlSettings.plugins,
    babelSettings.plugins,
    styleSettings.plugins,
    settings.plugins,
  ));

  return {
    entry: entry(settings),
    output: output(settings),
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', 'jsx'],
      alias: settings.resolveAlias,
    },
    devtool: isDev ? 'source-map' : '',
    context: settings.paths.source,
    plugins,

    // Advanced configuration
    cache: isDev,
    performance: {
      hints: false,
    },
  };
};

export default makeConfig;
