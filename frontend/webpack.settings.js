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

// Webpack 2.0 config object doesn't support customize variables. So we create a
// settings object and export to other modules.
const webpackSettings = {

  // The port of hot dev server used in development
  hotPort: 3060,

  // If the apiServerUrl is set, request to /api will proxy to this url.
  // apiServerUrl: '',

  paths: {
    root: currentDir,
    source: sourceDir,
    htmls: htmlsDir,
    build: buildDir,
    dist: distDir,
    node_modules: nodeModulesDir,
  },

  // others webpack loaders, mainly for exports & expose
  loaders: [{
    test: require.resolve('dygraphs/dygraph-combined-dev'),
    loader: 'exports-loader?Dygraph',
  }, {
    test: require.resolve('jquery'),
    loaders: ['expose-loader?$', 'expose-loader?jQuery'],
  }],

  // plugins
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      React: 'react',
      ReactDOM: 'react-dom',
      cx: 'classnames',
    }),
  ],

  // Define the starting points of app, use object syntax.
  // https://webpack.js.org/concepts/entry-points/
  entries: {
    'assets/js/app': './browser',
  },

  // Default html page for HMR in development.
  hotDefaultHtml: 'index.jsp',

  // Html files, template file is related with the path.htmls folder,
  // the filename is the output path related with the path.build folder.
  htmls: [{
    template: 'index.ejs',
    filename: 'index.jsp',
    initialState,
  }],
};

export default webpackSettings;
