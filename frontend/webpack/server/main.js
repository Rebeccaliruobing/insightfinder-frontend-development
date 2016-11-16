import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware-webpack-2';
import webpackHot from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware';
import path from 'path'
import webpackSettings from '../../webpack.settings';
import makeConfig from '../makeConfig';

const app = express();
const config = makeConfig();
const compiler = webpack(config);

app.use(webpackDev(compiler, {
  publicPath: config.output.publicPath,
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

if (webpackSettings.apiServerUrl) {
  app.use(proxyMiddleware('/api', {
    target: webpackSettings.apiServerUrl,
  }));
}

// Return the default html page if routing not match.
app.use('*', (req, res, next) => {
  const fname = path.join(
    compiler.outputPath,
    webpackSettings.hotDefaultHtml || 'index.html',
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

app.listen(webpackSettings.hotPort);
