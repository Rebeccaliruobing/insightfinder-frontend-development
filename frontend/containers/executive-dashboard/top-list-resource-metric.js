import React, { PropTypes as T } from 'react';
import { autobind, debounce } from 'core-decorators';
import Measure from 'react-measure';
import _ from 'lodash';
import ListRow from './top-list-row';

class TopListResource extends React.Component {
  static propTypes = {
    stats: T.array,
    autoExpandCount: T.number,
    onRowOpen: T.func,
    style: T.object,
  };

  static defaultProps = {
    autoExpandCount: 0,
    stats: [],
    onRowOpen: () => {},
    style: {},
  };

  constructor(props) {
    super(props);

    const { stats, autoExpandCount } = this.props;
    this.state = {
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
      expandedItemIndices: {},
      containerHeight: 200,
    };
    this.expandPageSize = 10;
  }

  componentWillReceiveProps(nextProps) {
    const { stats, autoExpandCount } = nextProps;
    this.setState({
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
      expandedItemIndices: {},
    });
  }

  @autobind
  toggleProjectRow(name) {
    return e => {
      e.stopPropagation();
      e.preventDefault();

      /* Not collapse
      let { expandedProjects } = this.state;
      if (_.indexOf(expandedProjects, name) >= 0) {
        expandedProjects = _.filter(expandedProjects, n => n !== name);
      } else {
        expandedProjects = [name, ...expandedProjects];
      }
      this.setState({ expandedProjects });
      */
    };
  }

  @autobind
  handleNameClick(projectName, groupName) {
    return e => {
      e.stopPropagation();
      e.preventDefault();
      this.props.onRowOpen(projectName, groupName);
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
      stats,
      style,
      timeIntervalPrevious,
      timeIntervalCurrent,
      timeIntervalPredicted,
    } = this.props;
    const { expandedProjects, expandedItemIndices, containerHeight } = this.state;
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
          <table className="toplist resource" style={{ ...style, ...{ maxWidth: 'initial' } }}>
            <thead>
              <tr>
                <th
                  style={{
                    paddingLeft: '0.5em',
                    textAlign: 'left',
                    borderLeft: '2px solid #566f84',
                    width: '30%',
                  }}
                >
                  Project/Group Name
                </th>
                <th className="subheader" colSpan={3}>
                  CPU Utilization
                </th>
                <th className="subheader" colSpan={3}>
                  Availability
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    paddingLeft: '0.5em',
                    textAlign: 'left',
                    borderLeft: '2px solid #566f84',
                    width: '30%',
                  }}
                />
                <th>
                  <span>Current</span>
                  <span className="interval">
                    {timeIntervalCurrent}
                  </span>
                </th>
                <th style={{ fontSize: 12 }}>
                  <span>Target Instance Number</span>
                  <span className="interval">(50% CPU Utilization)</span>
                </th>
                <th style={{ fontSize: 12 }}>
                  <span>Target Instance Number</span>
                  <span className="interval">(80% CPU Utilization)</span>
                </th>
                <th>
                  <span>Previous</span>
                  <span className="interval">
                    {timeIntervalPrevious}
                  </span>
                </th>
                <th>
                  <span>Current</span>
                  <span className="interval">
                    {timeIntervalCurrent}
                  </span>
                </th>
                <th>
                  <span>Predicted</span>
                  <span className="interval">
                    {timeIntervalPredicted}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody style={tbodyStyle}>
              {stats.map(data => {
                const { groups } = data;
                const name = data.name;
                const expanded = _.indexOf(expandedProjects, name) >= 0;
                const expandedIndex = expandedItemIndices[name] || 0;
                const groupText = groups.length > 1 ? 'groups' : 'group';
                const title = `${data.name} (${groups.length} ${groupText})`;
                const elems = [
                  <ListRow
                    key={name}
                    name={title}
                    data={data}
                    isProject
                    expanded={expanded}
                    onRowClick={this.toggleProjectRow(name)}
                    type="resource"
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

                filteredGroups.every(group => {
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
                  elems.push(
                    <ListRow
                      key={`${group.name}`}
                      name={title}
                      data={group}
                      expanded={expanded}
                      style={{ display: !expanded ? 'none' : '' }}
                      onNameClick={this.handleNameClick(name, group.name)}
                      type="resource"
                    />,
                  );
                  return true;
                });

                if (showLoadMore) {
                  elems.push(
                    <tr
                      key={`${name}-more}`}
                      className="more"
                      style={{ display: !expanded ? 'none' : '' }}
                    >
                      <td colSpan={7}>
                        {showPrevious &&
                          <span onClick={this.handleExpandMore(name, 'up')}>
                            {`Previous ${this.expandPageSize}`}
                            <i className="angle double up icon" />
                          </span>}
                        {showNext &&
                          showAll &&
                          <span onClick={this.handleExpandMore(name, 'down')}>
                            {`Next ${this.expandPageSize}`}
                            <i className="angle double down icon" />
                          </span>}
                        {showAll && <span onClick={this.handleExpandMore(name, 'all')}>All</span>}
                        {!showAll &&
                          <span onClick={this.handleExpandMore(name, 'less')}>Less</span>}
                      </td>
                    </tr>,
                  );
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

export default TopListResource;
