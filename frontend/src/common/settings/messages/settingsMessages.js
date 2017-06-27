/* @flow */

import { defineMessages } from 'react-intl';

const settingsMessages = defineMessages({
  alertNoProject: {
    defaultMessage: 'There is no project, please create new one.',
    id: 'settings.alert.noProject',
  },
  errorEmptySelection: {
    defaultMessage: 'This setting cannot be empty, please select from options.',
    id: 'settings.error.emptySelection',
  },
  errorEmptyInput: {
    defaultMessage: 'This setting cannot be empty, please input value.',
    id: 'settings.error.emptyInput',
  },
  errorNotNumberInput: {
    defaultMessage: 'This setting value is invalid, please input number value.',
    id: 'settings.error.notNumberInput',
  },
  errorNoProjectModel: {
    defaultMessage: 'There is no model found for <b>{projectName}</b>, please change start/end date or choose other groups.',
    id: 'settings.error.noProjectModel',
  },
});

export default settingsMessages;
