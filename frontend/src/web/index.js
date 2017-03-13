/**
 * Bootstrap environment.
**/
const onWindowInit = () => {
  // polyfill will increase about 100K for the production build, enable
  // it if really need it.
  // https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3#.94u3kht1z
  // require('babel-polyfill');

  window.Promise = require('../common/configureBluebird');

  const { addLocaleData } = require('react-intl');
  const en = require('react-intl/locale-data/en');
  const zh = require('react-intl/locale-data/zh');
  [en, zh].forEach(locale => addLocaleData(locale));

  require('./main');
};

// Intl.js and Browserify/webpack
// github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
if (!window.Intl) {
  // Import intl.js if needed
  import('../common/polyfillIntl.js').then(() => {
    onWindowInit();
  });
} else {
  onWindowInit();
}
