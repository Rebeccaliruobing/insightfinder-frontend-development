'use strict';

/**
 * 开发环境的Webpack配置文件
 **/

const path = require('path');
const merge = require('lodash/merge');
const webpack = require('webpack');

const currentDir = process.cwd();

// Plugins
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('./html-webpack-harddisk-plugin');

const settings = require('./common');

const port = '10087';

module.exports = merge({}, {
  output: {
    pathinfo: true,

    // TODO: 应使用js变量来替换
    publicPath: 'http://0.0.0.0:' + port + '/static/'
  },
  plugins: [

    new HappyPack({ id: 'js' }),

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

    new HtmlWebpackPlugin({
      title: 'InsightFinder',
      filename: 'dev/index.jsp',
      template: './templates/index_dev.ejs',
      inject: false,
      alwaysWriteToDisk: true
    }),

    new HtmlWebpackHarddiskPlugin({
      outputDir: settings.output.path
    })

  ],
  devtool: '#eval-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: port,
    inline: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": false
    }
  }
}, settings);