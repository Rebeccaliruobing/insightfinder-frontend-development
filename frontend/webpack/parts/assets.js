/*
 * Webpack module/rules configuration for static assets files.
 *
 * Dependant packages:
 * $ npm i -D file-loader url-loader json-loader
**/

const assets = (settings) => {
  const { paths } = settings;

  return [{
    // json
    resource: {
      test: /\.json$/,
      exclude: paths.node_modules,
    },
    use: {
      loader: 'json-loader',
    },
  }, {
    // images
    resource: {
      test: /\.(gif|jpg|png|svg)(\?.*)?$/,
      exclude: paths.node_modules,
    },
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/imgs/[name]-[hash:12].[ext]',
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
        name: 'assets/imgs/[name]-[hash:12].[ext]',
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
        name: 'assets/fonts/[name]-[hash:12].[ext]',
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
        name: 'assets/medias/[name]-[hash:12].[ext]',
      },
    },
  }];
};

export default assets;
