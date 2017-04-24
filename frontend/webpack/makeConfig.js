/*
 * Create webpack configuration based on passed-in application specific settings.
**/
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import isPlainObject from 'lodash/isPlainObject';
import R from 'ramda';
import babel from './parts/babel';
import assets from './parts/assets';
import entry from './parts/entry';
import output from './parts/output';
import html from './parts/html';
import styles from './parts/styles';

const makeConfig = (webpackSettings) => {
  const settings = {
    assetsRoot: 'assets/',
    publicPath: '/',
    ...webpackSettings,
  };

  const env = process.env.NODE_ENV;
  settings.isDev = env === 'development';
  settings.isProd = env === 'production';
  settings.uglifyjs = process.env.UGLIFYJS === 'true';
  settings.testing = process.env.BUILD_ENV === 'test';

  const { isDev, commonEntry, uglifyjs } = settings;

  const babelSettings = babel(settings);
  const styleSettings = styles(settings);
  const htmlSettings = html(settings);

  // The rules used to load the modules.
  const rules = R.filter(R.identity)([].concat(
    babelSettings.rules,
    styleSettings.rules,
    assets(settings),
  ));

  let plugins = [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: true,
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ];

  // Add common chunks and manifest chunk
  // https://webpack.js.org/guides/caching/
  if (isPlainObject(commonEntry)) {
    const names = R.keys(commonEntry);
    if (names.length > 0) {
      names.push(names[0].replace(/[^/]+$/, 'manifest'));
    }
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        names,
      }),
    );
  }

  plugins = R.filter(R.identity)(plugins.concat(
    htmlSettings.plugins,
    babelSettings.plugins,
    styleSettings.plugins,
  ));

  return webpackMerge({
    entry: entry(settings),
    output: output(settings),
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', 'jsx'],
    },
    devtool: uglifyjs ? 'source-map' : 'inline-source-map',
    context: settings.paths.source,
    target: 'web',
    plugins,

    // Advanced configuration
    cache: isDev,
    performance: {
      hints: false,
    },
  }, settings.webpackConfig);
};

export default makeConfig;
