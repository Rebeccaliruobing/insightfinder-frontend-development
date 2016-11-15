/*
 * Settings used to build webpack configuration.
**/

import path from 'path';
import webpack from 'webpack';

const currentDir = path.normalize(__dirname);
const sourceDir = path.join(currentDir, 'src');
const buildDir = path.join(currentDir, 'build');
const distDir = path.join(currentDir, '../static');
const nodeModulesDir = path.join(currentDir, 'node_modules');
const htmlsDir = path.join(sourceDir, 'browser/app/htmls');

// Use the reducers to create the state records which will include the type info,
// and then set the initial value of the records.
// The initialState is used by html template to generate the pages. For different
// html template, the initialState might be different.
const initialState = {};

// Webpack 2.0 config object doesn't support customize variables.
// So we need keep the settings and export it.
const webpackSettings = {
  // The port for frontend hot dev server.
  hotPort: 5000,
  // apiServerUrl: 'http://0.0.0.0:6068',

  paths: {
    root: currentDir,
    source: sourceDir,
    htmls: htmlsDir,
    build: buildDir,
    dist: distDir,
    node_modules: nodeModulesDir,
  },

  // others loaders, mainly for exports & expose
  loaders: [{
    test: require.resolve('dygraphs/dygraph-combined-dev'),
    loader: 'exports-loader',
    options: {
      Dygraph: true,
    }
  }, {
    test: require.resolve('jquery'),
    loaders: ['expose-loader?$', 'expose-loader?jQuery'],
  }],

  // plugins
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'moment': 'moment',
      'React': 'react',
      'ReactDOM': 'react-dom',
      'cx': 'classnames',
    })
  ],

  // Define the starting points of app, use object syntax.
  // https://webpack.js.org/concepts/entry-points/
  entries: {
    'assets/app': './browser',
  },

  // The list of [template, output, initialState] for html files generation.
  htmls: [
    ['index.ejs', 'index.html', initialState],
  ],
};

export default webpackSettings;
