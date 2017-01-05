import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';

const normalizeValue = (val, fractionDigits = 0) => {
  if (_.isFinite(val)) {
    if (val > 0) {
      return (<span className="total"><b>{val.toFixed(fractionDigits).toString()}</b></span>);
    }
    return (<span className="total">{val.toFixed(fractionDigits).toString()}</span>);
  }
  return <span className="total">-</span>;
};

const getArrowStyles = (left, right, reverse = false) => {
  const up = {
    transform: 'rotate(-90deg)',
    color: 'red',
  };
  const down = {
    transform: 'rotate(90deg)',
    color: 'green',
  };

  if (left !== undefined && right !== undefined) {
    if (left > right) {
      return !reverse ? down : up;
    } else if (left === right) {
      return { visibility: 'hidden' };
    }
    return !reverse ? up : down;
  }

  return { visibility: 'hidden' };
};

const ListRow = ({ data, onRowToggle, onClick, isProject = false, expanded = true }) => {
  const { name, stats, color } = data;
  return (
    <tr
      style={{
        display: !isProject && !expanded ? 'none' : '',
        borderLeft: `2px solid rgb(${color})`,
      }}
      className={isProject ? 'project' : 'group'}
      {...isProject ? { onClick: onRowToggle } : {}}
    >
      <td>
        {isProject && expanded && <i className="angle down icon" />}
        {isProject && !expanded && <i className="angle right icon" />}
        {!isProject && <i className="icon" />}
        {!isProject && <i className="icon" />}
        <span className="name" onClick={onClick} >{name}</span>
      </td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.avgDailyAnomalyScore'))}</td>
      <td className="number trend">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.avgDailyAnomalyScore'),
            _.get(stats, 'current.avgDailyAnomalyScore'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.avgDailyAnomalyScore'))}
      </td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.avgDailyAnomalyScore'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyDuration'))}</td>
      <td className="number trend">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.totalAnomalyDuration'),
            _.get(stats, 'current.totalAnomalyDuration'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.totalAnomalyDuration'))}
      </td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyDuration'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyCount'))}</td>
      <td className="number trend">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.totalAnomalyCount'),
            _.get(stats, 'current.totalAnomalyCount'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.totalAnomalyCount'))}
      </td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyCount'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyEventCount'))}</td>
      <td className="number trend">
        <i
          className="long arrow right icon"
          style={getArrowStyles(
            _.get(stats, 'previous.totalAnomalyEventCount'),
            _.get(stats, 'current.totalAnomalyEventCount'),
          )}
        />
        {normalizeValue(_.get(stats, 'current.totalAnomalyEventCount'))}
      </td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyEventCount'))}</td>

    </tr>
  );
};

ListRow.propTypes = {
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
    autoExpandCount: 1,
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
            <th className="subheader" colSpan={3} width="20%">Anomaly Score ( Daily Avg )</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Duration ( Minute )</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Count</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Events</th>
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
            <th>Predicted</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((data) => {
            const name = data.name;
            const expanded = _.indexOf(expandedProjects, name) >= 0;
            const elems = [
              (<ListRow
                key={name} data={data} isProject expanded={expanded}
                onRowToggle={this.toggleProjectRow(name)}
                onClick={this.handleProjectClick(name)}
              />),
            ];

            const { groups } = data;
            groups.forEach((group, index) => {
              elems.push(
                (<ListRow
                  key={`${name}-${index}`} data={group} expanded={expanded}
                  onClick={this.handleProjectClick(name, group.name)}
                />),
              );
            });

            return elems;
          })}
        </tbody>
      </table>
    );
  }
}

export default TopList;
