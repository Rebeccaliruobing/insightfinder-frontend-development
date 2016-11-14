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
  <div>
   <div className='ui compact equal width grid'>
    <StatsNumber title='Daily Anomaly Score' number={data.eventStats.avgDailyAnomalyScore} prevNumber={data.eventStats.prevAvgDailyAnomalyScore} label='avg' duration={dur+'d'} width='equal' />
    <StatsNumber title='Num of Abnormal Events' number={data.eventStats.numberOfEvents} duration={dur+'d'} width='equal' />
    <StatsNumber title='Avg Event Duration' number={data.eventStats.AvgEventDuration} label='Minutes' duration={dur+'d'} width='equal' />
    <CPUUtilization average={data.statistics['AvgCPUUtilization']} type='avg' duration={dur+'d'} width='equal' />
    <InstanceUptime average={data.statistics['AvgInstanceUptime']} type='avg' duration={dur+'d'} width='equal' />
    <InstanceNumber total={data.statistics['NumberOfInstances']}
                    containerTotal={data.statistics['NumberOfContainers']}  duration={dur+'d'} width='equal' />
    <MetricNumber total={data.statistics['NumberOfMetrics']}  duration={dur+'d'} width='equal' />
   </div>
   <div className='ui compact grid'>
    <StatsList title='Top Event Types (instance level)' list={data.eventStats.countByRootCause} topK={3} order='desc' duration={dur+'d'} valFormat='frequency' width='four' />
    <StatsList title='Top Anomalous Apps' list={data.eventStats.countByInstance} topK={3} order='desc' duration={dur+'d'} valFormat='duration' width='four' />
    <StatsList title='Top Underutilized Apps' list={data.eventStats.CPUUtilizationByInstance} topK={3} order='asc' normalValue={1} duration={dur+'d'} valFormat='percentage' width='four' />
    <StatsList title='Top Unavailable Apps' list={data.eventStats.AvailabilityByInstance} topK={3} order='asc' normalValue={1} duration={dur+'d'} valFormat='percentage' valMultiplier={100} width='four' />
    </div>
  </div>
);

ProjectStatistics.propTypes = {
    data: T.object,
};

export default ProjectStatistics;
