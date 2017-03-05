/*
 * Build webpack 'output' configuration.
**/

const output = (settings) => {
  const { isDev, paths, assetsRoot } = settings;

  let ret;

  // When HMR is enabled, file name cannot contains hash.
  if (isDev) {
    ret = {
      path: paths.build,
      publicPath: '/',
      pathinfo: true,
      filename: `${assetsRoot}/js/[name].js`,
      chunkFilename: `${assetsRoot}/js/[name].[id].js`,
    };
  } else {
    ret = {
      path: paths.build,
      publicPath: '/',
      filename: `${assetsRoot}/js/[name]-[chunkhash].js`,
      chunkFilename: `${assetsRoot}/js/[name].[id]-[chunkhash].js`,
    };
  }

  return ret;
};

export default output;
