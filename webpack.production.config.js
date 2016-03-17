'use strict';

/*
 * 用于生成生产环境资源的Webpack配置文件。
 * 
 */

const AssetsManifestPlugin = require('./webpack/assets-manifest-plugin');

const config = require('./webpack.config');

config.output.publicPath = '/static/';

config.plugins[config.plugins.length - 1] =
   new AssetsManifestPlugin('./backend/manifest.json');

delete config.devServer;

module.exports = config;