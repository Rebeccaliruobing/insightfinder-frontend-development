/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import chalk from 'chalk';
import webpackSettings from '../../webpack.settings';
import makeConfig from '../makeConfig';

const app = express();
const config = makeConfig(webpackSettings);
const compiler = webpack(config);

// Add webpack dev and hot middlewares.
app.use(webpackDev(compiler, {
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
  },
  stats: {
    colors: true,
    version: false,
    timings: true,
    hash: true,
    chunks: false,
    chunkModules: false,
  },
}))
  .use(webpackHot(compiler));

// Return the default html page if routing not match.
app.use('*', (req, res, next) => {
  const fname = path.join(
    compiler.outputPath,
    webpackSettings.hotDefaultPage || 'index.html',
  );

  compiler.outputFileSystem.readFile(fname, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    }
  });
});

app.listen(webpackSettings.hotPort, (err) => {
  if (err) {
    console.error(`${chalk.red('error')} ${err}`);
  } else {
    const url = `http://localhost:${webpackSettings.hotPort}`;
    console.log(`✨  Listening at ${chalk.green(url)}`);
  }
});
