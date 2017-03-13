/*
 * Build webpack 'output' configuration.
**/

const output = (settings) => {
  const { isDev, paths, assetsRoot, publicPath } = settings;

  let ret;

  // When HMR is enabled, file name cannot contains hash.
  if (isDev) {
    ret = {
      path: paths.build,
      publicPath,
      pathinfo: true,
      filename: `${assetsRoot}[name].js`,
      chunkFilename: `${assetsRoot}[name].[id].js`,
    };
  } else {
    ret = {
      path: paths.build,
      publicPath,
      filename: `${assetsRoot}[name]-[chunkhash].js`,
      chunkFilename: `${assetsRoot}[name].[id]-[chunkhash].js`,
    };
  }

  return ret;
};

export default output;
