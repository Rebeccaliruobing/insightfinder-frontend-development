import React, {PropTypes as T} from 'react';

import CPUUtilization from './cpu-utilization';
import InstanceUptime from './instance-uptime';
import InstanceNumber from './instance-number';
import MetricNumber from './metric-number';
import AnalysisSummary from './analysis-summary';

const ProjectStatistics = ({data}) => (
  <div className="ui compact grid">
    <CPUUtilization average={data.statistics['AvgCPUUtilization']} />
    <InstanceUptime average={data.statistics['AvgInstanceUptime']} />
    <InstanceNumber total={data.statistics['NumberOfInstances']}
                    containerTotal={data.statistics['NumberOfContainers']} />
    <MetricNumber total={data.statistics['NumberOfMetrics']} />
    <AnalysisSummary data={data.summary}/>
  </div>
);

ProjectStatistics.propTypes = {
    data: T.object,
};

export default ProjectStatistics;
