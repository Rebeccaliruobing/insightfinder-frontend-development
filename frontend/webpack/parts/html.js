/*
 * Webpack plugins configuration for generating static html files.
**/

import path from 'path';
import map from 'lodash/map';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const html = (settings) => {
  const { paths, htmls } = settings;

  const plugins = htmls ?
    map(htmls, s =>
      new HtmlWebpackPlugin({
        environment: process.env.NODE_ENV,
        template: path.join(paths.htmls, s.template),
        filename: s.filename,
        initialState: JSON.stringify(s.initialState || {}),
      }),
    ) :
    // If no settings, generate a default html page.
    new HtmlWebpackPlugin({});

  return {
    plugins,
  };
};

export default html;
