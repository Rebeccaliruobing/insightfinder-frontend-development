import {CPUUtilization} from '../statistics';

const ProjectStatistics = ({data}) => (
  <div className="ui small statistics">
    <CPUUtilization average={10}/>
  </div>
);

export default ProjectStatistics;
