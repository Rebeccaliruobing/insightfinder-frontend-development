'use strict';

/**
 * 用于生成生产环境资源的Webpack配置文件.
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

const settings = require('./common');
const {GetExternals, GetCdnManifest} = require('./utils');

module.exports = merge({}, {
  output: {
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

    new CleanWebpackPlugin(['frontend/manifest.json', 'static/'], {
      root: currentDir
    }),

    // 生成后端使用assets文件的映射表
    new AssetsManifestPlugin({
      output: '../frontend/manifest.json',
      cdn: GetCdnManifest(settings._cdnModules) 
    }),

    // 定义变量，用于在js模块中进行判断
    new webpack.DefinePlugin({ 
      'process.env': {
        'NODE_ENV': JSON.stringify('production'), // React production环境
        'USE_CDN': true
      }
    }),

    // TODO: 优化?
    new webpack.optimize.DedupePlugin()
  ]
},settings);