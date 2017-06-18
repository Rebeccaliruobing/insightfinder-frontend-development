import React, { PropTypes as T } from 'react';
import { autobind, debounce } from 'core-decorators';
import Measure from 'react-measure';
import _ from 'lodash';
import ListRow from './top-list-row';
import CausalGraphModal from '../../components/incidents/causalGraphModal';

class TopListAnomaly extends React.Component {
  static propTypes = {
    stats: T.array,
    autoExpandCount: T.number,
    onRowOpen: T.func,
    onRowClick: T.func,
    timeIntervalPrevious: T.string,
    timeIntervalCurrent: T.string,
    timeIntervalPredicted: T.string,
    style: T.object,
  };

  static defaultProps = {
    autoExpandCount: 0,
    stats: [],
    style: {},
    onRowOpen: () => { },
    onRowClick: () => { },
    timeIntervalPrevious: '',
    timeIntervalCurrent: '',
    timeIntervalPredicted: '',
  };

  constructor(props) {
    super(props);

    const { stats, autoExpandCount } = this.props;
    this.state = {
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
      expandedItemIndices: {},
      showCausalGraphModal: false,
      causalGraphProject: null,
      causalGraphProjectGroup: null,
      containerHeight: 100,
    };
    this.expandPageSize = 10;
  }

  @autobind
  toggleProjectRow(name) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      /* Not collapse
      let { expandedProjects } = this.state;
      if (_.indexOf(expandedProjects, name) >= 0) {
        expandedProjects = _.filter(expandedProjects, n => n !== name);
      } else {
        expandedProjects = [name, ...expandedProjects];
      }
      this.setState({ expandedProjects }, () => {
        this.props.onRowClick(name, null);
      });
      */
      this.props.onRowClick(name, null);
    };
  }

  @autobind
  handleProjectActionClick(name, groupName) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (name) {
        this.setState({
          showCausalGraphModal: true,
          causalGraphProject: name,
          causalGraphProjectGroup: groupName,
        });
      }
    };
  }

  @autobind
  handleNameClick(projectName, groupName) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onRowOpen(projectName, groupName);
    };
  }

  @autobind
  handleProjectClick(projectName, groupName) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onRowClick(projectName, groupName);
    };
  }

  @autobind
  handleExpandMore(projectName, type) {
    return () => {
      const { expandedItemIndices } = this.state;
      const index = expandedItemIndices[projectName] || 0;
      let changed = false;
      if (type === 'all' && index !== -1) {
        expandedItemIndices[projectName] = -1;
        changed = true;
      } else if (type === 'up') {
        expandedItemIndices[projectName] = Math.max(0, index - this.expandPageSize);
        changed = true;
      } else if (type === 'down') {
        if (index === -1) {
          expandedItemIndices[projectName] = 0;
        } else {
          expandedItemIndices[projectName] = index + this.expandPageSize;
        }
        changed = true;
      } else if (type === 'less') {
        expandedItemIndices[projectName] = 0;
        changed = true;
      }

      if (changed) {
        this.setState({
          expandedItemIndices,
        });
      }
    };
  }

  @autobind
  @debounce(300)
  handleOnResize(dimensions) {
    this.setState({
      containerHeight: dimensions.height,
    });
  }

  render() {
    const {
      stats, style, timeIntervalPrevious, timeIntervalCurrent, timeIntervalPredicted,
    } = this.props;
    const { containerHeight } = this.state;
    const { expandedProjects, expandedItemIndices } = this.state;
    let tbodyStyle = {
      width: '100%',
      overflow: 'auto',
      display: 'block',
    };
    if (containerHeight && containerHeight > 0) {
      tbodyStyle = {
        ...tbodyStyle,
        height: containerHeight - 74,
      };
    }

    return (
      <Measure onMeasure={this.handleOnResize}>
        <div className="flex-grow" style={{ overflow: 'hidden' }}>
          {this.state.showCausalGraphModal &&
            <CausalGraphModal
              projectName={this.state.causalGraphProject}
              instanceGroup={this.state.causalGraphProjectGroup}
              onClose={() => this.setState({ showCausalGraphModal: false })}
              onCancel={() => this.setState({ showCausalGraphModal: false })}
            />
          }
          <table className="anomaly toplist" style={style}>
            <thead>
              <tr>
                <th
                  style={{
                    paddingLeft: '0.5em',
                    textAlign: 'left',
                    borderLeft: '2px solid #566f84',
                    width: '28%',
                  }}
                >Project/Group Name</th>
                <th className="subheader" colSpan={3}>Anomaly Score (Daily Avg)</th>
                <th className="subheader" colSpan={3}>Anomaly Duration (Minute)</th>
                <th className="subheader" colSpan={3}>Consolidated Abnormal Events</th>
              </tr>
              <tr>
                <th
                  style={{
                    paddingLeft: '0.5em',
                    textAlign: 'left',
                    borderLeft: '2px solid #566f84',
                    width: '28%',
                  }}
                >&nbsp;</th>
                <th><span>Previous</span>
                  <span className="interval">{timeIntervalPrevious}</span></th>
                <th><span>Current<i className="dropdown icon" /></span>
                  <span className="interval">{timeIntervalCurrent}</span></th>
                <th><span>Predicted</span>
                  <span className="interval">{timeIntervalPredicted}</span></th>
                <th><span>Previous</span>
                  <span className="interval">{timeIntervalPrevious}</span></th>
                <th><span>Current</span>
                  <span className="interval">{timeIntervalCurrent}</span></th>
                <th><span>Predicted</span>
                  <span className="interval">{timeIntervalPredicted}</span></th>
                <th><span>Previous</span>
                  <span className="interval">{timeIntervalPrevious}</span></th>
                <th><span>Current</span>
                  <span className="interval">{timeIntervalCurrent}</span></th>
                <th><span>Predicted</span>
                  <span className="interval">{timeIntervalPredicted}</span></th>
              </tr>
            </thead>
            <tbody style={tbodyStyle}>
              {stats.map((data) => {
                const { groups } = data;
                const name = data.name;
                // const expanded = _.indexOf(expandedProjects, name) >= 0;
                const expanded = true;
                const expandedIndex = expandedItemIndices[name] || 0;
                const groupText = groups.length > 1 ? 'groups' : 'group';
                const title = `${data.name} (${groups.length} ${groupText})`;
                const elems = [
                  <ListRow
                    key={name} name={title} data={data} isProject expanded={expanded}
                    onRowClick={this.toggleProjectRow(name)} type="anomaly"
                  />,
                ];

                const lastIndex = expandedIndex + this.expandPageSize;
                const showLoadMore = groups.length > this.expandPageSize;
                const showNext = groups.length >= lastIndex;
                const showPrevious = expandedIndex > 0;
                const showAll = expandedIndex !== -1;
                let filteredGroups = groups;
                if (expandedIndex !== -1) {
                  filteredGroups = groups.slice(expandedIndex, Math.min(groups.length, lastIndex));
                }

                filteredGroups.every((group) => {
                  const numberOfInstances = _.get(group.stats, 'current.NumberOfInstances');
                  const numberOfMetrics = _.get(group.stats, 'current.NumberOfMetrics');
                  let title = group.name;
                  let suffix = '';
                  if (numberOfInstances !== undefined) {
                    suffix += `${numberOfInstances} instance${numberOfInstances > 1 ? 's' : ''}`;
                  }
                  if (numberOfMetrics !== undefined) {
                    if (suffix.length > 0) {
                      suffix += ', ';
                    }
                    suffix += `${numberOfMetrics} metric${numberOfMetrics > 1 ? 's' : ''}`;
                  }
                  if (suffix.length > 0) {
                    suffix = ` (${suffix})`;
                  }
                  title += suffix;
                  elems.push((
                    <ListRow
                      key={`${name}-${group.name}`}
                      name={title} data={group} expanded={expanded} type="anomaly"
                      style={{ display: !expanded ? 'none' : '' }}
                      onNameClick={this.handleNameClick(name, group.name)}
                      onRowClick={this.handleProjectClick(name, group.name)}
                      onActionClick={this.handleProjectActionClick(name, group.name)}
                    />
                  ));
                  return true;
                });

                if (showLoadMore) {
                  elems.push((
                    <tr key={`${name}-more}`} className="more" style={{ display: !expanded ? 'none' : '' }}>
                      <td colSpan={10}>
                        {showPrevious &&
                          <span onClick={this.handleExpandMore(name, 'up')}>{`Previous ${this.expandPageSize}`}
                            <i className="angle double up icon" />
                          </span>
                        }
                        {showNext && showAll &&
                          <span onClick={this.handleExpandMore(name, 'down')}>{`Next ${this.expandPageSize}`}
                            <i className="angle double down icon" />
                          </span>
                        }
                        {showAll &&
                          <span onClick={this.handleExpandMore(name, 'all')}>All</span>
                        }
                        {!showAll &&
                          <span onClick={this.handleExpandMore(name, 'less')}>Less</span>
                        }
                      </td>
                    </tr>
                  ));
                }

                return elems;
              })}
            </tbody>
          </table>
        </div>
      </Measure>
    );
  }
}

export default TopListAnomaly;
