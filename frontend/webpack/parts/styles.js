/*
 * Webpack module/rules configuration for styles
 *
 * Dependant packages:
 * $ npm i -D file-loader url-loader
 * $ npm i -D css-loader postcss-loader style-loader
 * $ npm i -D node-sass sass-loader less less-loader
 * $ npm i -D extract-text-webpack-plugin@2.0.0-beta.4
 **/

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const assets = (settings) => {
  const { isDev } = settings;

  const styleLoaders = (loaders) => {
    if (isDev) {
      return [{
        loader: 'style-loader',
      }].concat(loaders);
    }

    return ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: loaders,
    });
  };

  const cssLoaders = [{
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
    },
  }, {
    loader: 'postcss-loader',
  }];

  return [{
    // normal css
    test: /\.css$/,
    loaders: styleLoaders(cssLoaders),
  }, {
    // Sass
    test: /\.scss$/,
    loaders: styleLoaders(cssLoaders.concat({
      loader: 'sass-loader',
      options: {
        sourceMap: isDev,
      },
    })),
  }, {
    // Less
    test: /\.less$/,
    loaders: styleLoaders(cssLoaders.concat({
      loader: 'less-loader',
      options: {
        sourceMap: isDev,
      },
    })),
  }];
};

export default assets;
