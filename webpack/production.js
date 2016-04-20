'use strict';

/**
 * 用于生成生产环境资源的Webpack配置文件.
 * 
**/

const webpack = require('webpack');

const AssetsManifestPlugin = require('./assets-manifest-plugin');
const config = require('./development');

config.output.publicPath = '/static/';
config.plugins[config.plugins.length - 1] = new AssetsManifestPlugin();
config.plugins.push(
  new webpack.DefinePlugin({ 
    'process.env': {'NODE_ENV': JSON.stringify('production')} 
  })
);
config.plugins.push(new webpack.optimize.DedupePlugin());

delete config.devServer;
module.exports = config;