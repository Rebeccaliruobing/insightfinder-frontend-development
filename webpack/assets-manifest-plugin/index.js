/**
 * 创建一个包括Webpack编译生成文件的信息的manifest文件。
 * 该文件中包括生成文件与对应包含hash值文件名的映射信息。
 * 
 * https://github.com/webdeveric/webpack-assets-manifest
**/

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

/*
 * @param {object} output - 配置信息
 * @constructor
 */
var AssetsManifestPlugin = function (options) {
  var defaults = {
    output: '../frontend/manifest.json',
    replacer: null,
    space: '\t',
    cdn: {}
  };
  
  options = _.pick(
    _.merge({}, defaults, options || {}),
    _.keys(defaults)
  );
  
  _.merge(this, options);
  
  this.moduleAssets = {};
};

AssetsManifestPlugin.prototype.getStatsData = function(stats) {
  return stats.toJson({
    assets: true,
    modulesSort: true,
    chunksSort: true,
    assetsSort: true,

    hash: false,
    version: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: false,
    chunkOrigins: false 
  });
};

AssetsManifestPlugin.prototype.getExtension = function(filename, num)
{
  if (! filename) {
    return '';
  }

  num = (num || 1) | 0;

  var parts = path.basename(filename).split(/\./);
  parts.shift(); // Remove the filename

  return parts.length ? '.' + parts.slice(-num).join('.') : '';
};

AssetsManifestPlugin.prototype.processAssets = function(assets)
{
  for (var name in assets) {
    var filenames = assets[name];

    if (! Array.isArray(filenames)) {
      filenames = [ filenames ];
    }

    for (var i = 0, l = filenames.length; i < l ; ++i ) {
      var filename = name + this.getExtension(filenames[ i ], 2);
      this.moduleAssets[filename] = filenames[ i ];
    }
  }
  return this.moduleAssets;
};

AssetsManifestPlugin.prototype.toString = function()
{
  return JSON.stringify({
    assets: this.moduleAssets,
    cdn: this.cdn
  }, this.replacer, this.space);
};

/**
 * 处理webpack Done事件
 * @param output
 * @param stats
 */
AssetsManifestPlugin.prototype.handleDone = function(output, stats) {

  var fs   = require('fs-extra');
  this.processAssets(this.getStatsData(stats).assetsByChunkName);
  var json = this.toString();

  fs.mkdirsSync( path.dirname(output) );
  fs.writeFileSync(output, json);
};

/**
 * Webpack 编译插件入口.
 * @param (object) compiler - Webpack 编译器对象
 */
AssetsManifestPlugin.prototype.apply = function (compiler) {

  var self = this;
  var basedir = compiler.context;
  var output = path.resolve(basedir, this.output);
  
  compiler.plugin('compilation', function(compilation){
    compilation.plugin('module-asset', function(module, hashedFile) {
      var logicalPath = path.relative(basedir, module.userRequest);
      self.moduleAssets[logicalPath] = hashedFile;
    })
  });

  compiler.plugin('done', this.handleDone.bind(this, output));
};

module.exports = AssetsManifestPlugin;
