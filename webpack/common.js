'use strict';

/**
 * 公用的Webpack配置文件
**/

const path = require('path');
const merge = require('lodash/merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const settings = require('../webpack.settings');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, 'frontend');
const outputDir = path.join(currentDir, 'static');

module.exports = merge({}, {
  context: sourceDir,
  output: {
    path: outputDir,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name].[id]-[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      loader: 'babel',
      include: [sourceDir],
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        // plugins: ['transform-runtime'],
        plugins: ['transform-decorators-legacy' ],
        compact: true,
        comments: false,
        cacheDirectory: true
      },
      happy: { id: 'js' }
    }, {
      test: /\.json$/, loader: 'json'
    } , {
      test: require.resolve("react-addons-perf"),
      loader: "expose?Perf" 
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css?' + JSON.stringify({discardComments: {removeAll: true}}))
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less?sourceMap')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap')
    }, {
      test: /\.(png|jpe?g|gif|svg|ico)(\?\S*)?$/,
      loader: 'file?name=imgs/[name]-[hash:20].[ext]'
    }, {
      test: /\.(woff|woff2|ttf|eot)(\?\S*)?$/,
      loader: 'file?name=fonts/[name]-[hash:20].[ext]'
    }, {
      test: /\.(mp4|mpeg|webm|ogv|swf)(\?\S*)?$/,
      loader: 'file?name=video/[name]-[hash:20].[ext]'
    }]
  },
  resolve: {
    // require('file')时自动添加的扩展名，仅添加js相关的扩展名。
    // 其他类型如img，css等需显示指定，以避免同名的冲突，如index.js, index.css。
    extensions: ['', '.js', '.jsx']
  }
}, settings);