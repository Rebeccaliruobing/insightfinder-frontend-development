/* eslint-disable no-console */
import React from 'react';
import { autobind } from 'core-decorators';
import moment from 'moment';
import _ from 'lodash';
import { Console } from '../../artui/react';
import { HourlyHeatmap, AutoFixHistory }
  from '../../components/statistics';
import TopList from './top-list';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import './executive-dashboard.less';

const normalizeStats = (stats = {}) => {
  const ret = [];
  const orderedStats = _.reverse(_.sortBy(
    _.toPairs(stats),
    o => o[1].All.predicted.avgDailyAnomalyScore,
  ));

  _.forEach(orderedStats, (o) => {
    const name = o[0];
    const stat = o[1];

    // Use the all stat as the group stat.
    const { All: allStats, ...subStats } = stat;
    const project = {
      name,
      stats: allStats,
      groups: [],
    };

    // Order the group stat
    const orderedSubStats = _.reverse(_.sortBy(
      _.toPairs(subStats),
      o => o[1].predicted.avgDailyAnomalyScore,
    ));

    _.forEach(orderedSubStats, (subObj) => {
      const subName = subObj[0];
      const subStats = subObj[1];

      project.groups.push({
        name: subName,
        stats: subStats,
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
    };
  }

  componentDidMount() {
    const endTimestamp = moment().endOf('day').valueOf();
    const modelType = 'Holistic';
    retrieveExecDBStatisticsData(modelType, endTimestamp, '1')
      .then((data) => {
        this.setState({
          eventStats: normalizeStats(data),
        });
      }).catch((msg) => {
        console.log(msg);
      });
  }

  render() {
    const { eventStats } = this.state;

    return (
      <Console.Content className="executive-dashboard">
        <div className="ui main tiny container">
          <div className="ui vertical segment">
            <h3>Detected/Predicted Anomaly Overview</h3>
            <TopList stats={eventStats} />
          </div>
          <div className="ui vertical segment">
            <h3>Hourly Heatmap of Anomalies Detected & Predicted</h3>
          </div>
          <div className="ui vertical segment">
            <h3>AutoFix Action History</h3>
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default ExecutiveDashboard;
