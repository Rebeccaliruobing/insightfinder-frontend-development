'use strict';

/**
 * 开发环境的Webpack配置文件
**/

const path = require('path');
const merge = require('lodash/merge');
const webpack = require('webpack');

const currentDir = process.cwd();

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('./html-webpack-harddisk-plugin');
const AssetsManifestPlugin = require('./assets-manifest-plugin');

const settings = require('./common');

module.exports = merge({}, {
  output: {
    pathinfo: true,

    // TODO: 应使用js变量来替换
    publicPath: 'http://0.0.0.0:10086/static/'
  },
  plugins: [
    
    // 有错误时不刷新页面
    new webpack.NoErrorsPlugin(),

    // 用文件的md5替换chunkhash，以避免共用js内容未变化时hash变化。
    new WebpackMd5Hash(),

    new webpack.optimize.CommonsChunkPlugin({
      names: settings._commonsChunk,
      minChunks: Infinity
    }),

    // 给js中剥离的css的文件指定名称
    new ExtractTextPlugin('[name]-[contenthash].css'),

    // 使用变量时,自动装载对应模块.
    new webpack.ProvidePlugin(settings.providePlugin),

    // 生成后端使用assets文件的映射表
    new AssetsManifestPlugin({
      output: '../frontend/manifest-dev.json'
    }),

    new HtmlWebpackPlugin({
        title: 'InsightFinder',
        filename: 'dev/index.html',
        template: './templates/index.ejs',
        inject: false,
        alwaysWriteToDisk: true
    }),
    new HtmlWebpackPlugin({
      title: 'InsightFinder',
      filename: 'dev/auth.html',
      template: './templates/auth.ejs',
      inject: false,
      alwaysWriteToDisk: true
    }),

    new HtmlWebpackHarddiskPlugin({
        outputDir: settings.output.path
    })

  ],
  devtool: '#inline-source-map',
  devServer: {
    hot: true,
    port: 10086,
    host: '0.0.0.0',
    inline: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": false 
    }
  }
}, settings);