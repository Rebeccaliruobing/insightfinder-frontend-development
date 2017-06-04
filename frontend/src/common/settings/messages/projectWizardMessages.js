/* @flow */

import { defineMessages } from 'react-intl';

const step1Introduction = `
<b>[TODO]Revise needed:</b> A project is the scope of the data analyse, all data in the same project will be analyzed together. 
If data has no relations with each others, we might add different data sources into different projects 
to improve the performance. <br>
If you are collaborating with other users, you may invite them to view data associated with your Projects.
`;

const step2Introduction = `
<b>[TODO]Revise needed:</b> Project is created, now you need to add some data sources for this project.
You can filter the data sources by the OS, platform or application and select the data sources you want to add. 
<br> You can skip this step and add the data sources in the project settings.
`;

const step3Introduction = `
<b>[TODO]Revise needed:</b> Following the precedure to config settings or install agent for all the selected data sources. 
Mark it "Completed" if you finished the needed precedures.
`;

const step4Introduction = `
<b>[TODO]Revise needed:</b> Congratulation, you have setup the project. If you have added data source for this project, it might
take several minutes for the data source agent to work, you can check the status of the data source in the <a href="/settings/projects">Project Settings</a>.
`;

const PublicCloudIntro = `
<b>[TODO:] Revise ME!</b> Uses public Cloud APIs to monitor and report system metrics for your Google instances.
`;

const InsightAgentIntro = `
<b>[TODO:] Revise ME!</b> Uses InsightAgent to monitor and report system metrics for your Google instances.
`;

const AWSCloudWatchIntro = `
Uses the AWS API to monitor and report metric for your AWS cloud instances.
`;

const GoogleCloudMonitoringIntro = `
Uses Google Cloud APIs to monitor and report system metrics for your Google instances.'
`;

const projectWizardMessages = defineMessages({
  step1Introduction: {
    defaultMessage: step1Introduction,
    id: 'settings.projectWizard.step1Introduction',
  },
  step2Introduction: {
    defaultMessage: step2Introduction,
    id: 'settings.projectWizard.step2Introduction',
  },
  step3Introduction: {
    defaultMessage: step3Introduction,
    id: 'settings.projectWizard.step3Introduction',
  },
  step4Introduction: {
    defaultMessage: step4Introduction,
    id: 'settings.projectWizard.step4Introduction',
  },
  PublicCloudIntro: {
    defaultMessage: PublicCloudIntro,
    id: 'settings.projectWizard.PublicCloudIntro',
  },
  InsightAgentIntro: {
    defaultMessage: InsightAgentIntro,
    id: 'settings.projectWizard.InsightAgentIntro',
  },
  AWSCloudWatchIntro: {
    defaultMessage: AWSCloudWatchIntro,
    id: 'settings.projectWizard.AWSCloudWatchIntro',
  },
  GoogleCloudMonitoringIntro: {
    defaultMessage: GoogleCloudMonitoringIntro,
    id: 'settings.projectWizard.GoogleCloudMonitoringIntro',
  },
});

export default projectWizardMessages;
