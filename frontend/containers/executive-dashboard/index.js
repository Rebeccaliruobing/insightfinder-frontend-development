/* eslint-disable no-console */
import React from 'react';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import { Console } from '../../artui/react';
import TopList from './top-list';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import DateTimePicker from '../../components/ui/datetimepicker';
import './executive-dashboard.less';
import { calculateRGBByAnomaly } from '../../components/utils';
import { NumberOfDays, EventSummaryModelType } from '../../components/selections';

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
    this.refreshData();
  }

  @autobind
  refreshData() {
    const { location } = this.props;
    const query = this.applyDefaultParams(location.query);
    const endTime = moment(query.endTime).valueOf();
    this.setState({
      loading: true,
    }, () => {
      retrieveExecDBStatisticsData(query.modelType, endTime, query.numberOfDays)
        .then((data) => {
          this.setState({
            eventStats: normalizeStats(data, 'current.totalAnomalyScore'),
            loading: false,
          });
        }).catch((msg) => {
          console.log(msg);
        });
    });
  }

  @autobind
  modelDateValidator(date) {
    const timestamp = moment(date);
    const curTimestamp = moment();
    return timestamp <= curTimestamp;
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    const { location, router } = this.props;
    router.push({
      pathname: location.pathname,
      query: this.applyDefaultParams({
        ...location.query, modelType,
      }),
    });

    this.refreshData();
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    const { location, router } = this.props;
    router.push({
      pathname: location.pathname,
      query: this.applyDefaultParams({
        ...location.query, numberOfDays: numberOfDays.toString(),
      }),
    });

    this.refreshData();
  }

  @autobind
  handleEndTimeChange(value) {
    const endTime = moment(value).endOf('day').format('YYYY-MM-DD');
    const { location, router } = this.props;
    router.push({
      pathname: location.pathname,
      query: this.applyDefaultParams({ ...location.query, endTime }),
    });

    this.refreshData();
  }

  @autobind
  applyDefaultParams(params) {
    return {
      endTime: +moment(),
      numberOfDays: 7,
      modelType: 'Holistic',
      ...params,
    };
  }

  render() {
    const { location } = this.props;
    const { endTime, numberOfDays, modelType } = this.applyDefaultParams(location.query);
    const { loading, eventStats } = this.state;

    return (
      <Console.Content
        className={`executive-dashboard ${loading ? 'ui form loading' : ''}`}
      >
        <div className="ui main tiny container" style={{ display: loading && 'none' }}>
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End date:</label>
              <div className="ui input">
                <DateTimePicker
                  className="ui input" style={{ width: '50%' }}
                  dateValidator={this.modelDateValidator}
                  dateTimeFormat="YYYY-MM-DD" value={endTime}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Number of Days:</label>
              <NumberOfDays
                style={{ width: 120 }}
                value={numberOfDays} onChange={this.handleDayChange}
              />
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Model Type:</label>
              <EventSummaryModelType
                style={{ width: 120 }}
                value={modelType} onChange={this.handleModelTypeChange}
              />
            </div>
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.refreshData}
              >Refresh</div>
            </div>
          </div>
          <div className="ui vertical segment">
            <h3>Detected/Predicted Anomaly Overview</h3>
            <TopList stats={eventStats} />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default withRouter(ExecutiveDashboard);
