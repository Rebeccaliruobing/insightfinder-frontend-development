/* @flow */

import { defineMessages } from 'react-intl';

const logMessages = defineMessages({
  errorNoIncident: {
    defaultMessage: 'The incident cannot find, please refresh and try again.',
    id: 'log.error.errorNoIncident',
  },
  infoRerunTriggerred: {
    defaultMessage: 'Rerun detection for this log incident has been triggerred.',
    id: 'log.error.infoRerunTriggerred',
  },
});

export default logMessages;
