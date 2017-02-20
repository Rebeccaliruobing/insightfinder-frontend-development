/**
 * Extend the default webpack settings.
 */
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) => {
  const cfg = genDefaultConfig(config, env);
  return cfg;
};
