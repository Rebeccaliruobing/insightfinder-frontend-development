/* @flow */

import { defineMessages } from 'react-intl';

const appMessages = defineMessages({
  errorsServer: {
    defaultMessage: "Sorry, we've had a server error, Please refresh and try again.",
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
  errorsGeneral: {
    defaultMessage: 'There is something wrong, please try again.',
    id: 'app.errors.general',
  },
  errorsProjectNotFound: {
    defaultMessage: "The project <b>{projectName}</b> doesn' exists.",
    id: 'app.errors.projectNotFound',
  },
  errorsNoMetricProject: {
    defaultMessage: 'There is no metric project, please go to <a href="/settings/project-wizard">Settings</a> to register one.',
    id: 'app.errors.noMetricProject',
  },
  errorsNoLogProject: {
    defaultMessage: 'There is no log project, please go to <a href="/settings/project-wizard">Settings</a> to register one.',
    id: 'app.errors.noLogProject',
  },
});

export default appMessages;
