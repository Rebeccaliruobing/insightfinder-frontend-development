/* eslint-disable no-console */
import React from 'react';
import { autobind } from 'core-decorators';
import moment from 'moment';
import _ from 'lodash';
import { Console } from '../../artui/react';
import TopList from './top-list';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import './executive-dashboard.less';
import { calculateRGBByAnomaly } from '../../components/utils';

const normalizeStats = (stats = {}, orderBy) => {
  const ret = [];
  const orderedStats = _.reverse(_.sortBy(
    _.toPairs(stats),
    o => _.get(o[1].All, orderBy),
  ));

  // Get the max/min score for all project
  const maxScore = orderedStats.length > 0 ?
    _.get(orderedStats[0][1].All, orderBy) : 0;
  let minScore = orderedStats.length > 0 ?
    _.get(orderedStats[orderedStats.length - 1][1].All, orderBy) : 0;
  minScore = maxScore === minScore ? 0.0 : minScore;
  console.log(minScore);
  console.log(maxScore);

  _.forEach(orderedStats, (o) => {
    const name = o[0];
    const stat = o[1];

    // Use the all stat as the group stat.
    const { All: allStats, ...subStats } = stat;
    const score = _.get(allStats, orderBy);
    const color = calculateRGBByAnomaly(score, maxScore, minScore);
    const project = {
      name,
      stats: allStats,
      groups: [],
      color,
    };

    // Order the group stat
    const orderedSubStats = _.reverse(_.sortBy(
      _.toPairs(subStats),
      o => _.get(o[1], orderBy),
    ));

    _.forEach(orderedSubStats, (subObj) => {
      const subName = subObj[0];
      const subStats = subObj[1];

      project.groups.push({
        name: subName,
        stats: subStats,
        color,
      });
    });
    ret.push(project);
  });

  return ret;
};

class ExecutiveDashboard extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      eventStats: [],
      loading: true,
    };
  }

  componentDidMount() {
    const endTimestamp = moment().endOf('day').valueOf();
    const modelType = 'Holistic';
    retrieveExecDBStatisticsData(modelType, endTimestamp, '1')
      .then((data) => {
        this.setState({
          eventStats: normalizeStats(data, 'current.totalAnomalyScore'),
          loading: false,
        });
      }).catch((msg) => {
        console.log(msg);
      });
  }

  render() {
    const { loading, eventStats } = this.state;

    return (
      <Console.Content
        className={`executive-dashboard ${loading ? 'ui form loading' : ''}`}
      >
        <div className="ui main tiny container" style={{ display: loading && 'none' }}>
          <div className="ui vertical segment">
            <h3>Detected/Predicted Anomaly Overview</h3>
            <TopList stats={eventStats} />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default ExecutiveDashboard;
