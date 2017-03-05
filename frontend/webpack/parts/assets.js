/*
 * Webpack module/rules configuration for static assets files.
 *
 * Dependant packages:
 * $ yarn add -D file-loader url-loader
**/
const assets = (settings) => {
  const { paths, assetsRoot } = settings;

  return [{
    // images
    resource: {
      test: /\.(gif|jpg|png|svg)(\?.*)?$/,
      exclude: paths.node_modules,
    },
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: `${assetsRoot}/imgs/[name]-[hash:12].[ext]`,
      },
    }],
  }, {
    // favicon
    resource: {
      test: /favicon\.ico$/,
    },
    use: [{
      loader: 'file-loader',
      options: {
        name: `${assetsRoot}/imgs/[name]-[hash:12].[ext]`,
      },
    }],
  }, {
    // fonts
    resource: {
      test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
    },
    use: [{
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: `${assetsRoot}/fonts/[name]-[hash:12].[ext]`,
      },
    }],
  }, {
    // media
    resource: {
      test: /\.(mp4|mpeg|webm|ogv|swf)(\?\S*)?$/,
      exclude: paths.node_modules,
    },
    use: {
      loader: 'file-loader',
      options: {
        name: `${assetsRoot}/medias/[name]-[hash:12].[ext]`,
      },
    },
  }];
};

export default assets;
