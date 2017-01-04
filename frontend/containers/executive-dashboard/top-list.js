import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import store from 'store';

const normalizeValue = val => (_.isFinite(val) ? val.toFixed(1).toString() : '-');

const ListRow = ({ data, onRowToggle, onClick, isProject = false, expanded = true }) => {
  const { name, stats } = data;
  return (
    <tr
      style={{ display: !isProject && !expanded ? 'none' : '' }}
      className={isProject ? 'project' : 'group'}
      {...isProject ? { onClick: onRowToggle } : {}}
    >
      <td>
        {isProject && expanded && <i className="angle down icon" />}
        {isProject && !expanded && <i className="angle right icon" />}
        {!isProject && <i className="icon" />}
        <span className="name" onClick={onClick} >{name}</span>
      </td>

      <td className="number">
        <span className="avg">{normalizeValue(stats.previous.avgDailyAnomalyScore)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.previous.totalAnomalyScore)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.current.avgDailyAnomalyScore)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.current.totalAnomalyScore)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.predicted.avgDailyAnomalyScore)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.predicted.totalAnomalyScore)}</span>
      </td>

      <td className="number">
        <span className="avg">{normalizeValue(stats.previous.avgDailyAnomalyEventCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.previous.totalAnomalyEventCount)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.current.avgDailyAnomalyEventCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.current.totalAnomalyEventCount)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.predicted.avgDailyAnomalyEventCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.predicted.totalAnomalyEventCount)}</span>
      </td>

      <td className="number">
        <span className="avg">{normalizeValue(stats.previous.avgDailyAnomalyDuration)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.previous.totalAnomalyDuration)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.current.avgDailyAnomalyDuration)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.current.totalAnomalyDuration)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.predicted.avgDailyAnomalyDuration)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.predicted.totalAnomalyDuration)}</span>
      </td>

      <td className="number">
        <span className="avg">{normalizeValue(stats.previous.avgDailyAnomalyCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.previous.totalAnomalyCount)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.current.avgDailyAnomalyCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.current.totalAnomalyCount)}</span>
      </td>
      <td className="number">
        <span className="avg">{normalizeValue(stats.predicted.avgDailyAnomalyCount)}</span>
        <span className="divider">/</span>
        <span className="total">{normalizeValue(stats.predicted.totalAnomalyCount)}</span>
      </td>
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
      console.log(expandedProjects);
      this.setState({ expandedProjects });
    };
  }

  @autobind
  handleProjectClick(name, groupName) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      store.set('liveAnalysisProjectName', name);
      store.set('currentProjectGroup', groupName);
      window.open('/cloud/monitoring', '_target');
    };
  }

  render() {
    const { stats } = this.props;
    const { expandedProjects } = this.state;

    return (
      <table className="toplist">
        <thead>
          <tr>
            <th rowSpan={2} style={{ paddingLeft: '0.5em', textAlign: 'left' }}>Project/Group Name</th>
            <th className="subheader" colSpan={3} width="18%">Anomaly Score  (Avg/Total)</th>
            <th className="subheader" colSpan={3} width="18%">Anomaly Event  (Avg/Total)</th>
            <th className="subheader" colSpan={3} width="18%">Anomaly Duration  (Avg/Total)</th>
            <th className="subheader" colSpan={3} width="18%">Anomaly Count  (Avg/Total)</th>
          </tr>
          <tr>
            <th>Previous</th>
            <th>Current</th>
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
