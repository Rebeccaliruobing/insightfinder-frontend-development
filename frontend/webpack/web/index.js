if (process.env.NODE_ENV === 'production') {
  throw new Error(
    'Do not start webpack HMR in production environment, ' +
    'run "yarn run web" to start development environment');
}

require('babel-register'); // Hook node's require to compile code with Babel.
require('./main');
