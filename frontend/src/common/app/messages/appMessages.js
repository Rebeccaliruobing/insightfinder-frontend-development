/* @flow */

import { defineMessages } from 'react-intl';

const appMessages = defineMessages({
  errorsServer: {
    defaultMessage: 'Sorry, we\'ve had a server error, Please refresh and try again.',
    id: 'app.errors.server',
  },
  errorsNetwork: {
    defaultMessage: 'Connection timeout, please network connection.',
    id: 'app.errors.network',
  },
  errorsNotFound: {
    defaultMessage: 'The requested resource not exists',
    id: 'app.errors.notFound',
  },
  errorsBadRequest: {
    defaultMessage: 'The request parameters are incorrect, please check your input.',
    id: 'app.errors.badRequest',
  },
  errorsInvalidData: {
    defaultMessage: 'The data is invalid, please try again.',
    id: 'app.errors.invalidData',
  },
});

export default appMessages;
