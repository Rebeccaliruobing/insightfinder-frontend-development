import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import store from 'store';

const normalizeValue = (val) => {
  if (_.isFinite(val)) {
    if (val > 0) {
      return (<span className="total"><b>{val.toFixed(1).toString()}</b></span>);
    }
    return (<span className="total">{val.toFixed(1).toString()}</span>);
  }
  return <span className="total">-</span>;
};

const ListRow = ({ data, onRowToggle, onClick, isProject = false, expanded = true }) => {
  const { name, stats, color } = data;
  console.log(color);
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
        <span className="name" onClick={onClick} >{name}</span>
      </td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyScore'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'current.totalAnomalyScore'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyScore'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyEventCount'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'current.totalAnomalyEventCount'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyEventCount'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyDuration'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'current.totalAnomalyDuration'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyDuration'))}</td>

      <td className="number">{normalizeValue(_.get(stats, 'previous.totalAnomalyCount'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'current.totalAnomalyCount'))}</td>
      <td className="number">{normalizeValue(_.get(stats, 'predicted.totalAnomalyCount'))}</td>
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
            <th
              rowSpan={2} style={{
                paddingLeft: '0.5em',
                textAlign: 'left',
                borderLeft: '2px solid #566f84',
              }}
            >Project/Group Name</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Score</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Event</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Duration</th>
            <th className="subheader" colSpan={3} width="20%">Anomaly Count</th>
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
