import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

const normalizeValue = (val, fractionDigits = 0, needTotal = true) => {
  const className = needTotal ? 'total' : '';
  if (_.isFinite(val)) {
    if (val > 0) {
      return (<span className={className}><b>{val.toFixed(fractionDigits).toString()}</b></span>);
    }
    return (<span className={className}>{val.toFixed(fractionDigits).toString()}</span>);
  }
  return <span className={className}>-</span>;
};

const getArrowStyles = (left, right, reverseColor = false, reverseDirection = false) => {
  let up = {
    transform: 'rotate(-90deg)',
    color: 'red',
  };
  let down = {
    transform: 'rotate(90deg)',
    color: 'green',
  };
  if(reverseColor){
    up.color='green';
    down.color='red';
  }

  if (left !== undefined && right !== undefined) {
    if (left > right) {
      return !reverseDirection ? down : up;
    } else if (left === right) {
      return { visibility: 'hidden' };
    }
    return !reverseDirection ? up : down;
  }

  return { visibility: 'hidden' };
};

const ListRow = ({ name, data, onRowToggle, onClick, isProject = false, expanded = true }) => {
  const { stats, color } = data;
  const projectStyle = isProject ? { fontWeight: 'bold' } : {};
  return (
    <tr
      style={{
        borderLeft: `2px solid rgb(${color})`,
      }}
      className={isProject ? 'project' : 'group'}
      {...isProject ? { onClick: onRowToggle } : {}}
    >
      <td className="name">
        {isProject && expanded && <i className="angle down icon" />}
        {isProject && !expanded && <i className="angle right icon" />}
        {!isProject && <i className="icon" />}   
        {!isProject && <i className="icon" />}   
        <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>{name}</Tooltip>}>
          <span
            className="name"
            onClick={onClick} style={projectStyle}
          >{name}</span>
        </OverlayTrigger>
      </td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.avgDailyAnomalyScore'))}</td>
      <td className="number current">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.avgDailyAnomalyScore'),
            _.get(stats, 'current.avgDailyAnomalyScore'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.avgDailyAnomalyScore'), 0, false)}
      </td>
      <td className="number predicted">{normalizeValue(_.get(stats, 'predicted.avgDailyAnomalyScore'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyDuration'))}</td>
      <td className="number current">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.totalAnomalyDuration'),
            _.get(stats, 'current.totalAnomalyDuration'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.totalAnomalyDuration'), 0, false)}
      </td>
      <td className="number predicted">{normalizeValue(_.get(stats, 'predicted.totalAnomalyDuration'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyEventCount'))}</td>
      <td className="number current">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.totalAnomalyEventCount'),
            _.get(stats, 'current.totalAnomalyEventCount'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.totalAnomalyEventCount'), 0, false)}
      </td>
      <td className="number predicted">{normalizeValue(_.get(stats, 'predicted.totalAnomalyEventCount'))}</td>


      <td className="number">{normalizeValue(_.get(stats, 'previous.AvgCPUUtilization'), 1)}</td>
      <td className="number current">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.AvgCPUUtilization'),
            _.get(stats, 'current.AvgCPUUtilization'), 
            true,
          )}
        />
        {normalizeValue(_.get(stats, 'current.AvgCPUUtilization'), 1, false)}
      </td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.AvgInstanceUptime') * 100, 1)}</td>
      <td className="number current">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.AvgInstanceUptime'),
            _.get(stats, 'current.AvgInstanceUptime'),
            true,
          )}
        />
        {normalizeValue(_.get(stats, 'current.AvgInstanceUptime') * 100, 1, false)}
      </td>

    </tr>
  );
};

ListRow.propTypes = {
  name: T.string,
  data: T.object,
  expanded: T.bool,
  isProject: T.bool,
  onRowToggle: T.func,
  onClick: T.func,
};

class TopList extends React.Component {
  static propTypes = {
    stats: T.array,
    autoExpandCount: T.number,
    onRowOpen: T.func,
  };

  static defaultProps = {
    autoExpandCount: 0,
    stats: [],
  };

  constructor(props) {
    super(props);

    const { stats, autoExpandCount } = this.props;
    this.state = {
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { stats, autoExpandCount } = nextProps;
    this.setState({
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
    });
  }

  @autobind
  toggleProjectRow(name) {
    return () => {
      let { expandedProjects } = this.state;
      if (_.indexOf(expandedProjects, name) >= 0) {
        expandedProjects = _.filter(expandedProjects, n => n !== name);
      } else {
        expandedProjects = [name, ...expandedProjects];
      }
      this.setState({ expandedProjects });
    };
  }

  @autobind
  handleProjectClick(projectName, groupName) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onRowOpen(projectName, groupName);
    };
  }

  chopString(str, n) {
    if (str.length <= n + 2) {
      return str;
    } else {
      return `${str.slice(0, n)}..`;
    }
  }

  render() {
    const { stats } = this.props;
    const { expandedProjects } = this.state;

    return (
      <table className="toplist">
        <thead>
          <tr>
            <th
              rowSpan={2} style={{
                paddingLeft: '0.5em',
                textAlign: 'left',
                borderLeft: '2px solid #566f84',
              }}
            >Project/Group Name</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Score (Daily Avg)</th>
            <th className="subheader" colSpan={3} width="18%">Anomaly Duration (Minute)</th>
            <th className="subheader" colSpan={3} width="18%">Consolidated Abnormal Events</th>
            <th className="subheader" colSpan={2} width="12%">CPU Utilization (%)</th>
            <th className="subheader" colSpan={2} width="12%">Availability (%)</th>
          </tr>
          <tr>
            <th>Previous</th>
            <th>Current<i className="dropdown icon" /></th>
            <th>Predicted</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Predicted</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Predicted</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Previous</th>
            <th>Current</th>
          </tr>
        </thead>
          {stats.map((data) => {
            const { groups, thisStat } = data;
            const name = data.name;
            const expanded = _.indexOf(expandedProjects, name) >= 0;
            let groupText = "group";
            if(groups.length>1){
              groupText = "groups";
            }
            const title = `${data.name} (${groups.length} ${groupText})`;
            const elems = [
              (<tbody key={name}><ListRow
                key={name} name={title} data={data} isProject expanded={expanded}
                onRowToggle={this.toggleProjectRow(name)}
              /></tbody>),
            ];

            const childElems = groups.map((group, index) => {
              let numberOfInstances = _.get(group.stats, 'current.NumberOfInstances');
              let numberOfMetrics = _.get(group.stats, 'current.NumberOfMetrics');
              let title = group.name;
              let suffix = "";
              if(numberOfInstances!=undefined){
                suffix += numberOfInstances + " instance" + (numberOfInstances>1?"s":"");
              }
              if(numberOfMetrics!=undefined){
                if(suffix.length>0){
                  suffix += ", ";
                }
                suffix += numberOfMetrics + " metric" + (numberOfMetrics>1?"s":"");
              }
              if(suffix.length>0){
                suffix = " (" + suffix + ")";
              }
              title += suffix;
              return (
                <ListRow
                  key={`${name}-${index}`} name={title} data={group} expanded={expanded}
                  onClick={this.handleProjectClick(name, group.name)}
                />
              );
            });
            elems.push((
              <tbody
                style={{ display: !expanded ? 'none' : '' }}
                key={`${name}-children`}
              >{childElems}</tbody>
            ));

            return elems;
          })}
      </table>
    );
  }
}

export default TopList;
