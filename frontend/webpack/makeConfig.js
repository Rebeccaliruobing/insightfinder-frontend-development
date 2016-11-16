/*
 * Create webpack configuration object based on application settings.
 *
 * TODO: eval-source-map not working, and source-map is quite slow.
 * https://github.com/webpack/webpack/issues/2145
 * Hack fix(Webpack 1)
 * https://github.com/webpack/webpack/issues/3087
**/

import webpack from 'webpack';
import compact from 'lodash/compact';
import cloneDeep from 'lodash/cloneDeep';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpackSettings from '../webpack.settings';
import babel from './parts/babel';
import assets from './parts/assets';
import entry from './parts/entry';
import output from './parts/output';
import html from './parts/html';
import styles from './parts/styles';

const makeConfig = () => {
  const settings = cloneDeep(webpackSettings);

  const env = process.env.NODE_ENV;
  settings.isDev = env === 'development';
  settings.isProd = env === 'production';

  const { isDev } = settings;
  const devtool = isDev ? 'source-map' : '';

  // The rules used to load the modules.
  const rules = compact([].concat(
    babel(settings),
    assets(settings),
    styles(settings),
    settings.loaders,
  ));

  let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];

  plugins = compact(plugins.concat(
    html(settings),
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: true,
        NODE_ENV: JSON.stringify(env),
      },
    }),
    isDev ? null : [
      new ExtractTextPlugin('[name]-[hash].css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      }),
    ],

    // To support webpack 1.x loaders option.
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }),
        ],
      },
    }),
    settings.plugins,
  ));

  return {
    context: settings.paths.source,
    entry: entry(settings),
    output: output(settings),
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js'],
    },
    cache: isDev,
    devtool,
    plugins,
  };
};

export default makeConfig;
