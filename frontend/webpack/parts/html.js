/*
 * Webpack plugins configuration for generating static html files.
**/

import path from 'path';
import R from 'ramda';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const html = (settings) => {
  const { paths, htmls } = settings;

  // If no settings, generate a default html page.
  const plugins = htmls ?
    R.map(s => new HtmlWebpackPlugin({
      environment: process.env.NODE_ENV,
      template: path.join(paths.htmls, s.template),
      filename: s.filename,
      initialState: JSON.stringify(s.initialState || {}),
    }), htmls) :
    new HtmlWebpackPlugin({});

  return {
    plugins,
  };
};

export default html;
