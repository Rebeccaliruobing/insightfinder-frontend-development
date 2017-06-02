import React from 'react';
import AWSCloudWatchSetting from './AWSCloudWatchSetting';

const DataSourceSetting = () => (<div>[TODO]:Procedure for setting up the data source.</div>);

// UI shows the order of the data source based on the array order.
// The item is tuple with [name, description, matchRules, Component, manualConfig].
const dataSourcesMetadata = [
  ['AWS CloudWatch', 'Public Cloud', 'Linux,AWS Cloud,', AWSCloudWatchSetting, false],
  ['Google Cloud Monitoring', 'Public Cloud', '*,,', DataSourceSetting, false],
  ['DataDog', 'Public Cloud', '*,,', DataSourceSetting, false],
  ['New Relic', 'Public Cloud', '*,,', DataSourceSetting, false],
  ['DataDog Agent', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['AWS EC2', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['cAdvisor', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['cgroup', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['collectd', 'Insight Agent', 'Linux,AWS Cloud,', DataSourceSetting, true],
  ['daemonset', 'Insight Agent', '*,Docker,', DataSourceSetting, true],
  ['Docker Remote API', 'Insight Agent', 'Linux,Docker,', DataSourceSetting, true],
  ['Elasticsearch/ELK', 'Insight Agent', 'Linux,,ELK', DataSourceSetting, true],
  ['Hypervisor (VMWare)', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['Jolokia', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['Kafka', 'Insight Agent', '*,,Kafka', DataSourceSetting, true],
  ['KVM', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['Log File Replay', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['Log Streaming', 'Insight Agent', 'Linux,AWS Cloud,', DataSourceSetting, true],
  ['Metric File Replay', 'Insight Agent', '*,,', DataSourceSetting, true],
  ['Proc', 'Insight Agent', 'Linux,AWS Cloud,*', DataSourceSetting, true],
  ['Splunk', 'Insight Agent', 'Linux,,Splunk', DataSourceSetting, true],
  ['syscall', 'Insight Agent', '*,,', DataSourceSetting, true],
];

export default dataSourcesMetadata;
