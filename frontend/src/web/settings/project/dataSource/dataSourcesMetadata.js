import React from 'react';
import AWSCloudWatchSetting from './AWSCloudWatchSetting';

const DataSourceSetting = () => (<div>TODO</div>);

// UI shows the order of the data source based on the array order.
// The item is tuple with [name, description, matchRules, Component].
const dataSourcesMetadata = [
  ['AWS CloudWatch', 'Public Cloud', 'Linux,AWS Cloud,', AWSCloudWatchSetting],
  ['Google Cloud Monitoring', 'Public Cloud', '*,,', DataSourceSetting],
  ['DataDog', 'Public Cloud', '*,,', DataSourceSetting],
  ['New Relic', 'Public Cloud', '*,,', DataSourceSetting],
  ['DataDog Agent', 'Insight Agent', '*,,', DataSourceSetting],
  ['AWS EC2', 'Insight Agent', '*,,', DataSourceSetting],
  ['cAdvisor', 'Insight Agent', '*,,', DataSourceSetting],
  ['cgroup', 'Insight Agent', '*,,', DataSourceSetting],
  ['collectd', 'Insight Agent', 'Linux,AWS Cloud,', DataSourceSetting],
  ['daemonset', 'Insight Agent', '*,Docker,', DataSourceSetting],
  ['Docker Remote API', 'Insight Agent', 'Linux,Docker,', DataSourceSetting],
  ['Elasticsearch/ELK', 'Insight Agent', 'Linux,,ELK', DataSourceSetting],
  ['Hypervisor (VMWare)', 'Insight Agent', '*,,', DataSourceSetting],
  ['Jolokia', 'Insight Agent', '*,,', DataSourceSetting],
  ['Kafka', 'Insight Agent', '*,,Kafka', DataSourceSetting],
  ['KVM', 'Insight Agent', '*,,', DataSourceSetting],
  ['Log File Replay', 'Insight Agent', '*,,', DataSourceSetting],
  ['Log Streaming', 'Insight Agent', 'Linux,AWS Cloud,', DataSourceSetting],
  ['Metric File Replay', 'Insight Agent', '*,,', DataSourceSetting],
  ['Proc', 'Insight Agent', 'Linux,AWS Cloud,*', DataSourceSetting],
  ['Splunk', 'Insight Agent', 'Linux,,Splunk', DataSourceSetting],
  ['syscall', 'Insight Agent', '*,,', DataSourceSetting],
];

export default dataSourcesMetadata;
