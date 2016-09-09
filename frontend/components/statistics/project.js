import React, {PropTypes as T} from 'react';

import CPUUtilization from './cpu-utilization';
import InstanceUptime from './instance-uptime';
import InstanceNumber from './instance-number';
import MetricNumber from './metric-number';
import AnomalyDegree from './anomaly-degree';

const ProjectStatistics = ({data}) => (
  <div className="ui statistics">
    <CPUUtilization average={data.AvgCPUUtilization} />
    <InstanceUptime average={data.AvgInstanceUptime}/>
    <InstanceNumber total={data.NumberOfInstances} containerTotal={data.NumberOfContainers} />
    <MetricNumber total={data.NumberOfMetrics} />
    <AnomalyDegree />
  </div>
);

ProjectStatistics.propTypes = {
    data: T.object,
};

export default ProjectStatistics;
