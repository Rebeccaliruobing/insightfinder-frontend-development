import {CPUUtilization, InstanceUptime, InstanceNumber, MetricNumber, AnomalyDegree} from '../statistics';

const ProjectStatistics = ({data}) => (
  <div className="ui statistics">
    <CPUUtilization average={10.3} />
    <InstanceUptime />
    <InstanceNumber total={489} anomaly={117}/>
    <MetricNumber total={9388} anomaly={1289} />
    <AnomalyDegree />
  </div>
);

export default ProjectStatistics;
