'use strict';

/*
 * webpack config file.
 * This config file used in development environment.
 */

const path = require('path');
const webpack = require('webpack');

// Plugins
const AssetsManifestPlugin = require('./webpack/assets-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const currentDir = process.cwd();
const sourceDir = path.join(currentDir, 'frontend');
const outputDir = path.join(currentDir, 'static');

module.exports = {
  context: sourceDir,
  entry: {
    commons: './commons',
    assets: './assets',
    commons_css: './commons.scss',

    home: './home',
    home_css: './home.scss',

    signin: './signin',
    signin_css: './signin.scss',
  },
  output: {
    path: outputDir,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name].[id]-[chunkhash].js',
    publicPath: 'http://0.0.0.0:10086/static/',
  },
  module: {
    loaders: [{
      // 将ES6/7语法，及React JSX转换成js。
      test: /\.(js|jsx)?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1', 'react'],
        cacheDirectory: true,
      },
      include: [sourceDir],
      exclude: [path.join(currentDir, 'node_modules')],
    }, {
      // 将初始chunk中的css以css文件的方式，其他chunk采取css嵌入在js中的方式。
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less?sourceMap'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
    }, {
      test: /\.(png|jpe?g|gif|svg|ico)$/,
      loader: 'file?name=imgs/[name]-[hash:20].[ext]',
    }, {
      test: /\.(woff)$/,
      loader: 'file?name=fonts/[name]-[hash:20].[ext]',
    }, {
      test: /\.(woff2|ttf|eot|svg)$/,
      loader: 'file?name=fonts/[name]-[hash:20].[ext]',
    }, {
      test: /\.(mp4|mpeg|webm|ogv)$/,
      loader: 'file?name=video/[name]-[hash:20].[ext]',
    }]
  },
  resolve: {
    // 如第三方库的package.json的main为minified版本的文件，则需要添加alias
    // 来指定未minified的源代码，以便webpack正确编译。
    alias: {
    },
    // require('file')时自动添加的扩展名，仅添加js相关的扩展名。
    // 其他类型如img，css等需显示指定，以避免同名的冲突，如index.js, index.css。
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // 有错误时停止生成文件
    new webpack.NoErrorsPlugin(),

    // 用文件的md5替换chunkhash，以避免共用js内容未变化时hash变化。
    new WebpackMd5Hash(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['commons'],
      minChunks: Infinity,
    }),

    // 给js中剥离的css的文件指定名称
    new ExtractTextPlugin('[name]-[contenthash].css'),

    // 使用变量时,自动装载对应模块.
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),

    new AssetsManifestPlugin('./backend/manifest-dev.json'),
  ],
  devServer: {
    port: 10086,
    host: '0.0.0.0',
    inline: true,
  }
};
