'use strict';

/**
 * 用于发布前测试的Webpack配置文件.
 * 
**/

const config = require('./development');

config.output.publicPath = '/static/';

delete config.devServer;
module.exports = config;