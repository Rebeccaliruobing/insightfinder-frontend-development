import React from 'react';
import AWSCloudWatchSetting from './AWSCloudWatchSetting';

const DataSourceSetting = () => (<div>TODO</div>);

// UI shows the order of the data source based on the array order.
// The item is tuple with [id, name, group, Component].
const dataSourcesMetadata = [
  ['AWS CloudWatch', 'Public Cloud', AWSCloudWatchSetting],
  ['Google Cloud Monitoring', 'Public Cloud', DataSourceSetting],
  ['DataDog', 'Public Cloud', DataSourceSetting],
  ['New Relic', 'Public Cloud', DataSourceSetting],
  ['DataDog', 'DataDog', 'Insight Agent', DataSourceSetting],
  ['AWSEC2', 'AWS EC2', 'Insight Agent', DataSourceSetting],
  ['cAdvisor', 'Insight Agent', DataSourceSetting],
  ['cgroup', 'Insight Agent', DataSourceSetting],
  ['collectd', 'Insight Agent', DataSourceSetting],
  ['daemonset', 'Insight Agent', DataSourceSetting],
  ['Docker Remote API', 'Insight Agent', DataSourceSetting],
  ['Elasticsearch/ELK', 'Insight Agent', DataSourceSetting],
  ['Hypervisor (VMWare)', 'Insight Agent', DataSourceSetting],
  ['Jolokia', 'Insight Agent', DataSourceSetting],
  ['Kafka', 'Insight Agent', DataSourceSetting],
  ['KVM', 'Insight Agent', DataSourceSetting],
  ['Log File Replay', 'Insight Agent', DataSourceSetting],
  ['Log Streaming', 'Insight Agent', DataSourceSetting],
  ['Metric File Replay', 'Insight Agent', DataSourceSetting],
  ['Proc', 'Insight Agent', DataSourceSetting],
  ['Splunk', 'Insight Agent', DataSourceSetting],
  ['syscall', 'Insight Agent', DataSourceSetting],
];

export default dataSourcesMetadata;
