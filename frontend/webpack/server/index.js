if (process.env.NODE_ENV === 'production') {
  throw new Error(
    'Do not start webpack HMR in production environment.' +
    'You are likely using wrong npm start script'
    );
}

require('babel-register');
require('./main');
