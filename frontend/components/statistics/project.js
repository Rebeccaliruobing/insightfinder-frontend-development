import React, {PropTypes as T} from 'react';

import CPUUtilization from './cpu-utilization';
import InstanceUptime from './instance-uptime';
import InstanceNumber from './instance-number';
import MetricNumber from './metric-number';
import AnalysisSummary from './analysis-summary';

const ProjectStatistics = ({data, dur}) => (
  <div className="ui compact grid">
    <CPUUtilization average={data.statistics['AvgCPUUtilization']} type='avg' duration={dur+'d'} />
    <InstanceUptime average={data.statistics['AvgInstanceUptime']} duration={dur+'d'} />
    <InstanceNumber total={data.statistics['NumberOfInstances']}
                    containerTotal={data.statistics['NumberOfContainers']}  duration={dur+'d'} />
    <MetricNumber total={data.statistics['NumberOfMetrics']}  duration={dur+'d'} />
    <AnalysisSummary data={data.summary} latestDataTimestamp={data.latestDataTimestamp} duration={dur+'d'} />
  </div>
);

ProjectStatistics.propTypes = {
    data: T.object,
};

export default ProjectStatistics;
