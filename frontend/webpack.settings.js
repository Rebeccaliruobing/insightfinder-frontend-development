/*
 * Settings used to build webpack configuration.
**/

import path from 'path';
import webpack from 'webpack';

const currentDir = path.normalize(__dirname);
const nodeModulesDir = path.join(currentDir, 'node_modules');
const sourceDir = path.join(currentDir, 'src');
const htmlsDir = path.join(sourceDir, 'web/app/htmls');
const buildDir = path.join(currentDir, 'build');
const distDir = path.join(currentDir, '../static');

// Webpack settings used to build the webpack configuration.
const webpackSettings = {
  paths: {
    root: currentDir,
    source: sourceDir,
    htmls: htmlsDir,
    build: buildDir,
    dist: distDir,
    node_modules: nodeModulesDir,
  },

  // The folder path use to store the generated assets. The subfolder
  // is the type of the assets, like ./assets/imgs/
  assetsRoot: '',

  publicPath: '/static/',

  // Define the starting points of app, use object syntax.
  // https://webpack.js.org/concepts/entry-points/#object-syntax
  entries: {
    app: './web/index',
  },

  // Common entry to make vendor/library bundle
  commonEntry: { common: './web/common' },

  // The port of hot dev server in development
  hotPort: 3060,

  // Default html page for HMR in development.
  hotDefaultPage: 'index.jsp',

  // Html files, template file is related with the path.htmls folder,
  // the filename is the output path related with the path.build folder.
  htmls: [{
    template: 'index.ejs',
    template_dev: 'index_dev.ejs',
    filename: 'index.jsp',
    initialState: {},
  }],

  // Webpack config which is merged by webpack-merge
  // https://webpack.js.org/configuration/
  webpackConfig: {
    module: {
      rules: [{
        test: require.resolve('dygraphs/dygraph-combined-dev'),
        loader: 'exports-loader?Dygraph',
      }],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  },
};

export default webpackSettings;
