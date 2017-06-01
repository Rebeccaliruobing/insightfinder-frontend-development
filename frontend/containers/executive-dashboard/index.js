/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React, { PropTypes as T } from 'react';
import store from 'store';
import $ from 'jquery';
import R from 'ramda';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import withRouter from '../withRouter';
import { Console } from '../../artui/react';
import TopListAnomaly from './top-list-anomaly';
import TopListResource from './top-list-resource';
import HourlyHeatmap from '../../components/statistics/hourly-heatmap';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import retrieveHeatmapData from '../../apis/retrieve-heatmap-data';
import './executive-dashboard.less';
import normalizeStats from './normalize-stats';
import { hideAppLoader } from '../../src/common/app/actions';
import { aggregateToMultiHourData } from './heatmap-data';

class ExecutiveDashboard extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  static propTypes = {
    location: T.object,
    hideAppLoader: T.func,
    viewport: T.object,
    router: T.shape({
      push: T.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

    const query = props.location.query || {};
    const startTime = (query.startTime ? moment(query.startTime, this.dateFormat) :
      moment().subtract(this.defaultNumberOfDays - 1, 'days')).startOf('day');
    let endTime = (query.endTime ? moment(query.endTime, this.dateFormat) :
      moment()).endOf('day');
    const diffDays = endTime.diff(startTime, 'days');

    if (diffDays > (this.defaultNumberOfDays - 1) || diffDays < 0) {
      endTime = startTime.clone().add(this.defaultNumberOfDays - 1, 'days').endOf('day');
    }
    const curTime = moment();
    if (endTime > curTime) {
      endTime = curTime.endOf('day');
    }

    this.state = {
      loading: true,
      anomalyEventStats: [],
      resourceEventStats: [],
      heatmapData: {},
      heatmapLoading: false,
      heatmapProject: null,
      heatmapGroup: null,
      view: 'anomaly',
      startTime,
      endTime,
      timezoneOffset: moment().utcOffset(),
      modelType: 'Holistic',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  @autobind
  handleRefreshClick() {
    this.refreshData();
  }

  @autobind
  refreshData(params) {
    const { hideAppLoader } = this.props;
    const { startTime, endTime, modelType, timezoneOffset } = { ...this.state, ...params };
    const diffDays = endTime.diff(startTime, 'days');
    const numberOfDays = diffDays + 1;
    const predictedEndTime = endTime.clone().add(diffDays, 'days').endOf('day');

    const curTime = moment();
    const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();

    // Change the url first
    const { location, router } = this.props;
    router.push({
      pathname: location.pathname,
      query: {
        startTime: startTime.format(this.dateFormat),
        endTime: endTime.format(this.dateFormat),
      },
    });

    this.setState({
      loading: true,
      heatmapLoading: true,
      heatmapData: {},
    }, () => {
      let heatmapData = {};
      let anomalyEventStats = [];
      let resourceEventStats = [];

      const heatmapPromise = retrieveHeatmapData(
        modelType, predictedEndTime.valueOf(),
        (diffDays * 2) + 1, timezoneOffset, 'loadHourly',
      ).then((data) => {
        heatmapData = aggregateToMultiHourData(data, realEndTime, numberOfDays);
      });

      const anomalyStatsPromise = retrieveExecDBStatisticsData(
        modelType, realEndTime, numberOfDays, timezoneOffset, 'loadAnomalyAll',
      ).then((data) => {
        anomalyEventStats = data;
      });

      const resourceStatsPromise = retrieveExecDBStatisticsData(
        modelType, realEndTime, numberOfDays, timezoneOffset, 'loadResourceAll',
      ).then((data) => {
        // resourceEventStats = normalizeStats(data, 'current.AvgCPUUtilization');
        resourceEventStats = data;
      });

      Promise.all([heatmapPromise, anomalyStatsPromise, resourceStatsPromise])
        .then(() => {
          // Merge instance/group from resource into anomaly
          R.forEachObjIndexed((resource, name) => {
            R.forEachObjIndexed((stats, group) => {
              const anomaly = anomalyEventStats[name][group];
              anomaly.current.NumberOfInstances = stats.current.NumberOfInstances;
              anomaly.current.NumberOfMetrics = stats.current.NumberOfMetrics;
            }, resource);
          }, resourceEventStats);

          this.setState({
            startTime: startTime.clone(), endTime: endTime.clone(),
            heatmapData,
            anomalyEventStats: normalizeStats(anomalyEventStats),
            resourceEventStats: normalizeStats(resourceEventStats, 'current.AvgCPUUtilization'),
            loading: false,
            heatmapLoading: false,
          }, () => {
            hideAppLoader();
          });
        })
        .catch((msg) => {
          console.log(msg);
        });
    });
  }

  @autobind
  handleStartTimeChange(newDate) {
    const curTime = moment();
    const startTime = newDate.clone().startOf('day');
    let endTime = startTime.clone().add(this.defaultNumberOfDays - 1, 'day').endOf('day');

    if (endTime >= curTime) {
      endTime = curTime.endOf('day');
    }
    this.refreshData({ startTime, endTime });
  }

  @autobind
  handleEndTimeChange(newDate) {
    const curTime = moment();
    let { startTime } = this.state;
    let endTime = newDate.clone().endOf('day');

    if (endTime >= curTime) {
      endTime = curTime.endOf('day');
    }
    startTime = endTime.clone().subtract(this.defaultNumberOfDays - 1, 'day').startOf('day');
    this.refreshData({ startTime, endTime });
  }

  @autobind
  handleListRowOpenDetectedAnomaly(projectName, instanceGroup, datetime) {
    this.handleListRowOpenAnomaly(projectName, instanceGroup, datetime);
  }

  @autobind
  handleListRowOpenPredictedAnomaly(projectName, instanceGroup, datetime) {
    this.handleListRowOpenAnomaly(projectName, instanceGroup, datetime, true);
  }

  @autobind
  handleListRowOpenAnomaly(projectName, instanceGroup, datetime, predicted = false) {
    const { startTime, endTime, timezoneOffset } = this.state;
    const numberOfDays = endTime.diff(startTime, 'days') + 1;
    const query = {
      startTime: startTime.format(this.dateFormat),
      endTime: endTime.format(this.dateFormat),
      numberOfDays, timezoneOffset,
      projectName,
      instanceGroup,
    };

    if (datetime) {
      query.startTime = datetime.clone().startOf('day').format(this.dateFormat);
      query.endTime = datetime.clone().endOf('day').format(this.dateFormat);
      query.numberOfDays = 1;
    }
    if (predicted) {
      query.predicted = true;
    }

    store.set('liveAnalysisProjectName', projectName);
    window.open(`/cloud/monitoring?${$.param(query)}`, '_blank');
  }

  @autobind
  handleAnomalyListRowClick(projectName, instanceGroup) {
    const { heatmapProject, heatmapGroup,
      modelType, timezoneOffset, startTime, endTime } = this.state;

    const diffDays = endTime.diff(startTime, 'days');
    const numberOfDays = diffDays + 1;
    const predictedEndTime = endTime.clone().add(diffDays, 'days').endOf('day');

    const curTime = moment();
    const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();

    if (heatmapProject !== projectName || heatmapGroup !== instanceGroup) {
      this.setState({
        heatmapLoading: true,
        heatmapData: {},
        heatmapProject: projectName,
        heatmapGroup: instanceGroup,
      }, () => {
        retrieveHeatmapData(
          modelType, predictedEndTime.valueOf(),
          (diffDays * 2) + 1, timezoneOffset, 'loadHourly',
          projectName, instanceGroup,
        ).then((data) => {
          this.setState({
            heatmapData: aggregateToMultiHourData(data, realEndTime, numberOfDays),
            heatmapLoading: false,
          });
        }).catch((msg) => {
          console.log(msg);
        });
      });
    }
  }

  @autobind
  handleListRowOpenResource(projectName, instanceGroup) {
    const { startTime, endTime, timezoneOffset } = this.state;
    const numberOfDays = endTime.diff(startTime, 'days') + 1;
    const query = {
      startTime: startTime.format(this.dateFormat),
      endTime: endTime.format(this.dateFormat),
      numberOfDays, timezoneOffset,
      projectName, instanceGroup,
    };
    store.set('liveAnalysisProjectName', projectName);
    window.open(`/cloud/app-forecast?${$.param(query)}`, '_blank');
  }

  render() {
    const { viewport } = this.props;
    const { startTime, endTime, loading, anomalyEventStats, resourceEventStats,
      heatmapLoading, heatmapData } = this.state;
    const numberOfDays = endTime.diff(startTime, 'days') + 1;

    let anomalyContainerHeight = null;
    const top = 100;
    const resourceContainerHeight = viewport.height - top;

    if (this.$heapmapBlock) {
      const height = this.$heapmapBlock.height();
      anomalyContainerHeight = viewport.height - top - height - 24;
    }

    const startTimePrevious = startTime.clone().subtract(numberOfDays, 'day');
    const endTimePrevious = endTime.clone().subtract(numberOfDays, 'day');
    const startTimePredicted = startTime.clone().add(numberOfDays, 'day');
    const endTimePredicted = endTime.clone().add(numberOfDays, 'day');
    const curTime = moment();
    const maxEndTime = curTime;
    const maxStartTime = curTime;
    const timeIntervalPrevious = `${startTimePrevious.format('M/D')} - ${endTimePrevious.format('M/D')}`;
    const timeIntervalCurrent = `${startTime.format('M/D')} - ${endTime.format('M/D')}`;
    const timeIntervalPredicted = `${startTimePredicted.format('M/D')} - ${endTimePredicted.format('M/D')}`;
    const { view } = this.state;

    return (
      <Console.Content
        className={`executive-dashboard  ${loading ? 'ui form loading' : ''}`}
        style={{ paddingLeft: 0 }}
      >
        <div className="ui main tiny container">
          <div
            className="ui right aligned vertical inline segment"
            ref={(c) => { this.$toolbar = $(c); }}
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field view-switch" style={{ float: 'left' }}>
              <div
                className={`ui ${view === 'anomaly' ? 'grey active' : 'orange'} button`}
                {...view === 'anomaly' ? {} : {
                  onClick: () => this.setState({ view: 'anomaly' }),
                }}
              >Anomaly View</div>
              <div
                className={`ui ${view === 'resource' ? 'grey active' : 'orange'} button`}
                {...view === 'resource' ? {} : {
                  onClick: () => this.setState({ view: 'resource' }),
                }}
              >Resource View</div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Start Date:</label>
              <div className="ui input">
                <DatePicker
                  selected={startTime}
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  maxDate={maxStartTime}
                  onChange={this.handleStartTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End Date:</label>
              <div className="ui input">
                <DatePicker
                  selected={endTime}
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  maxDate={maxEndTime}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.handleRefreshClick}
              >Refresh</div>
            </div>
          </div>
          <div
            ref={(c) => { this.$heapmapBlock = $(c); }}
            className={`ui vertical segment ${heatmapLoading ? 'loading' : ''}`}
            {...view === 'anomaly' || view === 'all' ? {} : { style: { display: 'none' } }}
          >
            <div className="heatmap-block">
              <h3>Detected Events</h3>
              <HourlyHeatmap
                statSelector={d => d.totalAnomalyScore}
                numberOfDays={numberOfDays} dataset={heatmapData.detected}
                onNameClick={this.handleListRowOpenDetectedAnomaly}
              />
            </div>
            <div className="heatmap-block">
              <h3>Predicted Events</h3>
              <HourlyHeatmap
                statSelector={d => d.totalAnomalyScore} rightEdge
                numberOfDays={numberOfDays} dataset={heatmapData.predicted}
                onNameClick={this.handleListRowOpenPredictedAnomaly}
              />
            </div>
            <div style={{ color: 'grey', marginLeft: '2em' }}>
              <i className="icon circle info" />
              <span>Only start time of the event is shown, hover the cell to see event duration and details.</span>
            </div>
          </div>
          <div
            className="ui vertical segment flex-item"
            {...view === 'anomaly' || view === 'all' ? {} : { style: { display: 'none' } }}
          >
            <TopListAnomaly
              containerHeight={anomalyContainerHeight}
              timeIntervalPrevious={timeIntervalPrevious}
              timeIntervalCurrent={timeIntervalCurrent}
              timeIntervalPredicted={timeIntervalPredicted}
              stats={anomalyEventStats}
              onRowOpen={this.handleListRowOpenAnomaly}
              onRowClick={this.handleAnomalyListRowClick}
            />
          </div>
          <div
            className="ui vertical segment flex-item"
            {...view === 'resource' || view === 'all' ? {} : { style: { display: 'none' } }}
          >
            <TopListResource
              containerHeight={resourceContainerHeight}
              timeIntervalPrevious={timeIntervalPrevious}
              timeIntervalCurrent={timeIntervalCurrent}
              timeIntervalPredicted={timeIntervalPredicted}
              stats={resourceEventStats}
              onRowOpen={this.handleListRowOpenResource}
            />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default connect(
  state => ({
    viewport: state.app.viewport,
  }),
  { hideAppLoader },
)(withRouter(ExecutiveDashboard));
