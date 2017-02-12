import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
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
    onRowOpen: () => { },
    style: {},
  };

  constructor(props) {
    super(props);

    const { stats, autoExpandCount } = this.props;
    this.state = {
      expandedProjects: _.take(_.map(stats, s => s.name), autoExpandCount),
      expandedItemIndices: {},
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
  handleNameClick(projectName, groupName) {
    return (e) => {
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

  render() {
    const { stats, style, timeIntervalPrevious, timeIntervalCurrent, timeIntervalPredicted,  } = this.props;
    const { expandedProjects, expandedItemIndices } = this.state;

    return (
      <table className="toplist resource" style={style}>
        <thead>
          <tr>
            <th
              rowSpan={2} style={{
                paddingLeft: '0.5em',
                textAlign: 'left',
                borderLeft: '2px solid #566f84',
              }}
            >Project/Group Name</th>
            <th className="subheader" colSpan={3} width="35%">CPU Utilization (%)</th>
            <th className="subheader" colSpan={3} width="35%">Availability (%)</th>
          </tr>
          <tr>
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
        {stats.map((data) => {
          const { groups } = data;
          const name = data.name;
          const expanded = _.indexOf(expandedProjects, name) >= 0;
          const expandedIndex = expandedItemIndices[name] || 0;
          const groupText = groups.length > 1 ? 'groups' : 'group';
          const title = `${data.name} (${groups.length} ${groupText})`;
          const elems = [
            (<tbody key={name}><ListRow
              key={name} name={title} data={data} isProject expanded={expanded}
              onRowClick={this.toggleProjectRow(name)} type="resource"
            /></tbody>),
          ];

          const lastIndex = expandedIndex + this.expandPageSize;
          const showLoadMore = groups.length > this.expandPageSize;
          const showNext = groups.length >= lastIndex;
          const showPrevious = expandedIndex > 0;
          const showAll = expandedIndex !== -1;
          const childElems = [];
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
            childElems.push((
              <ListRow
                key={`${group.name}`} name={title} data={group} expanded={expanded}
                onNameClick={this.handleNameClick(name, group.name)} type="resource"
              />
            ));
            return true;
          });

          if (showLoadMore) {
            childElems.push((
              <tr key={`${name}-more}`} className="more">
                <td colSpan={7}>
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

export default TopListResource;
