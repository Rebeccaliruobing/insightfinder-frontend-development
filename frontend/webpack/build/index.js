import path from 'path';
import gutil from 'gulp-util';
import webpack from 'webpack';
import makeConfig from '../makeConfig';
import webpackSettings from '../../webpack.settings';

const build = (done) => {
  const config = makeConfig();

  webpack(config, (fatalError, stats) => {
    const jsonStats = stats.toJson();

    // We can save jsonStats to be analyzed with
    // github.com/robertknight/webpack-bundle-size-analyzer.
    // $ webpack-bundle-size-analyzer ./bundle-stats.json
    const mkdirp = require('mkdirp');
    const fs = require('fs');

    mkdirp.sync(webpackSettings.paths.build);
    fs.writeFileSync(
      path.join(webpackSettings.paths.build, 'bundle-stats.json'),
      JSON.stringify(jsonStats));

    const buildError = fatalError || jsonStats.errors[0]
      || jsonStats.warnings[0];

    if (buildError) {
      throw new gutil.PluginError('webpack', buildError);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    }));

    done();
  });
};

export default build;
