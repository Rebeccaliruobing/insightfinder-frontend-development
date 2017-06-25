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
});

export default settingsMessages;
