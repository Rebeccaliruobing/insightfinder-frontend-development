import React from 'react';
import AWSCloudWatchSetting from './AWSCloudWatchSetting';
import cAdvisorSetting from './cAdvisorSetting';
import { projectWizardMessages } from '../../../../common/settings/messages';

const DataSourceSetting = () => (<div>[TODO]:Procedure for setting up the data source.</div>);

// UI shows the order of the data source based on the array order.
// The item is tuple with [name, description, matchRules, Component, manualConfig].
const dataSourcesMetadata = [
  ['AWS CloudWatch', projectWizardMessages.AWSCloudWatchIntro, 'Linux,AWS Cloud,', AWSCloudWatchSetting, false],
  ['Google Cloud Monitoring', projectWizardMessages.GoogleCloudMonitoringIntro, '*,,', DataSourceSetting, false],
  ['DataDog', projectWizardMessages.PublicCloudIntro, '*,,', DataSourceSetting, false],
  ['New Relic', projectWizardMessages.PublicCloudIntro, '*,,', DataSourceSetting, false],
  ['DataDog Agent', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['AWS EC2', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['cAdvisor', projectWizardMessages.cAdvisorIntro, '*,,', cAdvisorSetting, true],
  ['cgroup', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['collectd', projectWizardMessages.InsightAgentIntro, 'Linux,AWS Cloud,', DataSourceSetting, true],
  ['daemonset', projectWizardMessages.InsightAgentIntro, '*,Docker,', DataSourceSetting, true],
  ['Docker Remote API', projectWizardMessages.InsightAgentIntro, 'Linux,Docker,', DataSourceSetting, true],
  ['Elasticsearch/ELK', projectWizardMessages.InsightAgentIntro, 'Linux,,ELK', DataSourceSetting, true],
  ['Hypervisor (VMWare)', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['Jolokia', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['Kafka', projectWizardMessages.InsightAgentIntro, '*,,Kafka', DataSourceSetting, true],
  ['KVM', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['Log File Replay', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['Log Streaming', projectWizardMessages.InsightAgentIntro, 'Linux,AWS Cloud,', DataSourceSetting, true],
  ['Metric File Replay', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
  ['Proc', projectWizardMessages.InsightAgentIntro, 'Linux,AWS Cloud,*', DataSourceSetting, true],
  ['Splunk', projectWizardMessages.InsightAgentIntro, 'Linux,,Splunk', DataSourceSetting, true],
  ['syscall', projectWizardMessages.InsightAgentIntro, '*,,', DataSourceSetting, true],
];

export default dataSourcesMetadata;
