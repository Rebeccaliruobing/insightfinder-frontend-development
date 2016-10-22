import React, {PropTypes as T} from 'react';

import CPUUtilization from './cpu-utilization';
import InstanceUptime from './instance-uptime';
import InstanceNumber from './instance-number';
import MetricNumber from './metric-number';
import AnalysisSummary from './analysis-summary';
import StatsNumber from './stats-number';
import StatsList from './stats-list';

    // <StatsNumber title='Number of Detected Anomalies' number='20' duration={dur+'d'} />
    // <StatsList title='Top 3 Event Types' listText='- cpu\n- memory' duration={dur+'d'} />
    // <StatsList title='Top 3 Anomalous Applications' listText='-aaaa\n-bbbb\n-ccccc' duration={dur+'d'} />
    // <AnalysisSummary data={data.summary} latestDataTimestamp={data.latestDataTimestamp} duration={dur+'d'} />

const ProjectStatistics = ({data, dur}) => (
  <div className="ui compact grid">
    <CPUUtilization average={data.statistics['AvgCPUUtilization']} type='avg' duration={dur+'d'} />
    <InstanceUptime average={data.statistics['AvgInstanceUptime']} duration={dur+'d'} />
    <InstanceNumber total={data.statistics['NumberOfInstances']}
                    containerTotal={data.statistics['NumberOfContainers']}  duration={dur+'d'} />
    <MetricNumber total={data.statistics['NumberOfMetrics']}  duration={dur+'d'} />
    <StatsNumber title='Number of Anomalies' number={data.eventStats.numberOfAnomalies} duration={dur+'d'} />
    <StatsList title='Top 3 Event Types' list={data.eventStats.countByRootCause} topK={3} duration={dur+'d'} />
    <StatsList title='Top 3 Anomalous Applications' list={data.eventStats.countByInstance} topK={3} duration={dur+'d'} />
  </div>
);

ProjectStatistics.propTypes = {
    data: T.object,
};

export default ProjectStatistics;
