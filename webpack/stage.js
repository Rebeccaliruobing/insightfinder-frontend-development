'use strict';

/**
 * 用于发布前测试的Webpack配置文件.
 * 
**/

const merge = require('lodash/merge');
const webpack = require('webpack');

const currentDir = process.cwd();

// Plugins
const AssetsManifestPlugin = require('./assets-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const settings = require('./common');
const utils = require('./utils');
const GetExternals = utils.GetExternals;
const GetCdnManifest = utils.GetCdnManifest;

module.exports = merge({}, {
  output: {
    pathinfo: true,
    publicPath: '/static/'
  },
  externals: GetExternals(settings._cdnModules),
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

    // 清空生成的文件
    new CleanWebpackPlugin(['frontend/manifest-dev.json', 'static/'], {
      root: currentDir
    }),

    // 生成后端使用assets文件的映射表
    new AssetsManifestPlugin({
      output: '../frontend/manifest-dev.json',
      cdn: GetCdnManifest(settings._cdnModules) 
    }),
    
    // 定义变量，用于在js模块中进行判断
    new webpack.DefinePlugin({
      'process.env': {
        'USE_CDN': true
      }
    }),

    // 生成HTML页面
    new HtmlWebpackPlugin({
        title: 'InsightFinder',
        filename: 'index.jsp',
        template: './templates/index.ejs',
        inject: false,
        alwaysWriteToDisk: true
    })
  ],
  devtool: '#inline-source-map'
},settings);