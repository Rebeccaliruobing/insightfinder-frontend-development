/* @flow */

import { defineMessages } from 'react-intl';

const step2Introduction = `
Project can have multiple data sources. In the wizard, we only create 
the first one. To add more data source, go to project settings. You can also skip 
this step and create it later. <b>[TODO]</b>
`;

const projectWizardMessages = defineMessages({
  step2Introduction: {
    defaultMessage: step2Introduction,
    id: 'settings.projectWizard.step2Introduction',
  },
});

export default projectWizardMessages;
