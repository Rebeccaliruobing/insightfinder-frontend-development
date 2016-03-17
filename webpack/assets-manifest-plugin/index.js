var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var Format = require('./format');

/**
 * 创建一个包括Webpack编译生成文件的信息的manifest文件。
 * 该文件中包括生成文件与对应包含hash值文件名的映射信息。
 * https://github.com/nickjj/manifest-revision-webpack-plugin
 *
 * @param {string} output - 保存manifest的文件路径
 * @param {object} options - 配置参数
 */
var AssetsManifestPlugin = function (output, options) {
    this.output = output;
    this.options = options || {}

    this.options.rootAssetPath = this.options.rootAssetPath || './frontend';
    this.options.format = this.options.format || 'general';
};

/**
 * When given a logical asset path, produce an array that contains the logical
 * path of the asset without the cache hash included as the first element.
 * The second element contains the cached version of the asset name.

 * @param {string} logicalAssetPath - The path of the asset without the root.
 * @param {string} cachedAsset - The file name of the asset with the cache hash.
 * @returns {Array}
 */
AssetsManifestPlugin.prototype.mapAsset = function (logicalAssetPath, cachedAsset) {
    if (logicalAssetPath.charAt(0) === '/') {
        logicalAssetPath = logicalAssetPath.substr(1);
    }

    return [logicalAssetPath, cachedAsset];
};

/**
 * Take in the modules array from the webpack stats and produce an object that
 * only includes assets that matter to us. The key is the asset logical path
 * and the value is the logical path but with the cached asset name.
 *
 * You would use this as a lookup table in your web server.

 * @param {string} data - Array of webpack modules.
 * @returns {Object}
 */
AssetsManifestPlugin.prototype.parsedAssets = function (data) {
    var assets = {};

    for (var i = 0, length = data.length; i < length; i++) {
        var item = data[i];

        // 只处理本地的assets.
        if (item.name.indexOf('./') === 0 &&
            item.name.indexOf('~/') === -1 &&
            fs.lstatSync(item.name).isFile() &&
            item.hasOwnProperty('assets') &&
            item.assets.length > 0) {

            var nameWithoutRoot = item.name.replace(
                this.options.rootAssetPath + '/', '');
            var mappedAsset = this.mapAsset(nameWithoutRoot,
                item.assets.slice(-1)[0]);
            assets[mappedAsset[0]] = mappedAsset[1];
        }
    }

    return assets;
};

AssetsManifestPlugin.prototype.apply = function (compiler) {

    var self = this;
    var output = this.output;

    // 从webpack的stats中获得所需的信息，通过options过滤不需要的信息。
    var options = {};
    options.assets = true;
    options.version = false;
    options.timings = false;
    options.chunks = true;
    options.chunkModules = false;
    options.cached = true;
    options.source = false;
    options.reasons = false;
    options.errorDetails = false;
    options.chunkOrigins = false;

    compiler.plugin('done', function (stats) {
        var data = stats.toJson(options);
        var parsedAssets = self.parsedAssets(data.modules);
        var outputData = null;

        if (typeof self.options.format === 'string' ||
            self.options.format instanceof String) {

            var format = new Format(data, parsedAssets);
            outputData = format[self.options.format]();
        }
        else {
            outputData = self.options.format(data, parsedAssets);
        }

        fs.writeFileSync(output, JSON.stringify(outputData, null, '\t'));
    });
};

module.exports = AssetsManifestPlugin;
