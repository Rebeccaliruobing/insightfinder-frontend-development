/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React, { PropTypes as T } from 'react';
import store from 'store';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Console } from '../../artui/react';
import { TopListAnomaly, TopListResource } from './top-list';
import HourlyHeatmap from '../../components/statistics/hourly-heatmap';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import retrieveHeatmapData from '../../apis/retrieve-heatmap-data';
import './executive-dashboard.less';
import normalizeStats from './normalize-stats';
import { aggregateToMultiHourData } from './heatmap-data';

class ExecutiveDashboard extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  static propTypes = {
    location: T.object,
    router: T.shape({
      push: T.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

    this.state = {
      loading: true,
      eventStats: [],
      heatmapData: {},
      heatmapLoading: true,
      view: 'anomaly',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  @autobind
  applyDefaultParams(params) {
    return {
      startTime: moment().subtract(this.defaultNumberOfDays - 1, 'days')
        .startOf('day').format(this.dateFormat),
      endTime: moment().endOf('day').format(this.dateFormat),
      modelType: 'Holistic',
      heatmap: 0,
      ...params,
    };
  }

  @autobind
  handleRefreshClick() {
    this.refreshData();
  }

  @autobind
  refreshData(params) {
    const { location } = this.props;
    const query = params || this.applyDefaultParams(location.query);
    const { modelType, heatmap } = query;
    const endTime = moment(query.endTime).endOf('day');
    const startTime = moment(query.startTime).startOf('day');

    const curTime = moment();
    const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();
    const numberOfDays = endTime.diff(startTime, 'days') + 1;

    this.setState({
      loading: true,
      heatmapLoading: (heatmap === '1'),
      heatmapData: {},
    }, () => {
      retrieveExecDBStatisticsData(modelType, realEndTime, numberOfDays)
        .then((data) => {
          this.setState({
            eventStats: normalizeStats(data),
            loading: false,
          });
        }).catch((msg) => {
          console.log(msg);
        });

      if(heatmap === '1'){
        retrieveHeatmapData(modelType, realEndTime, numberOfDays, 'loadHourly')
          .then((data) => {
            this.setState({
              heatmapData: aggregateToMultiHourData(data, realEndTime, numberOfDays),
              heatmapLoading: false,
            });
          }).catch((msg) => {
            console.log(msg);
          });
      }
    });
  }

  @autobind
  refreshDataByTime(startTime, endTime) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query,
      startTime: startTime.format(this.dateFormat),
      endTime: endTime.format(this.dateFormat),
    });

    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshData(query);
  }

  @autobind
  handleStartTimeChange(newDate) {
    const { location } = this.props;
    const curTime = moment();

    const startTime = newDate.clone().startOf('day');
    let endTime = moment(location.query.endTime).endOf('day');

    const diffDays = endTime.diff(startTime, 'days');
    if (diffDays >= this.defaultNumberOfDays - 1 || diffDays <= 0) {
      endTime = startTime.clone().add(this.defaultNumberOfDays - 1, 'day');
    }
    if (endTime >= curTime) {
      endTime = curTime.endOf('day');
    }

    this.refreshDataByTime(startTime, endTime);
  }

  @autobind
  handleEndTimeChange(newDate) {
    const { location } = this.props;

    const endTime = newDate.clone().endOf('day');
    let startTime = moment(location.query.startTime).startOf('day');

    const diffDays = endTime.diff(startTime, 'days');
    if (diffDays >= this.defaultNumberOfDays - 1 || diffDays <= 0) {
      startTime = endTime.clone().subtract(this.defaultNumberOfDays - 1, 'day');
    }

    this.refreshDataByTime(startTime, endTime);
  }

  @autobind
  handleListRowOpenAnomaly(projectName, instanceGroup) {
    const { location } = this.props;
    const query = this.applyDefaultParams({
      ...location.query,
      projectName,
      instanceGroup,
    });
    store.set('liveAnalysisProjectName', projectName);
    window.open(`/cloud/monitoring?${$.param(query)}`, '_blank');
  }

  @autobind
  handleListRowOpenResource(projectName, instanceGroup) {
    const query = this.applyDefaultParams({
      projectName,
      instanceGroup,
    });
    store.set('liveAnalysisProjectName', projectName);
    window.open(`/cloud/app-forecast?${$.param(query)}`, '_blank');
  }

  render() {
    const { location } = this.props;
    const params = this.applyDefaultParams(location.query);
    let { startTime, endTime, heatmap } = params;
    const { loading, eventStats, heatmapLoading, heatmapData } = this.state;

    // Convert startTime, endTime to moment object
    startTime = moment(startTime, this.dateFormat);
    endTime = moment(endTime, this.dateFormat);
    const numberOfDays = endTime.diff(startTime, 'days') + 1;

    const startTimePrevious = moment(startTime).subtract(numberOfDays, 'day');
    const endTimePrevious = moment(endTime).subtract(numberOfDays, 'day');
    const startTimePredicted = moment(startTime).add(numberOfDays, 'day');
    const endTimePredicted = moment(endTime).add(numberOfDays, 'day');
    const curTime = moment();
    const maxEndTime = curTime;
    const maxStartTime = curTime;
    const timeIntervalPrevious = `${startTimePrevious.format('M/D')} - ${endTimePrevious.format('M/D')}`;
    const timeIntervalCurrent = `${startTime.format('M/D')} - ${endTime.format('M/D')}`;
    const timeIntervalPredicted = `${startTimePredicted.format('M/D')} - ${endTimePredicted.format('M/D')}`;
    // const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();

    const { view } = this.state;

    return (
      <Console.Content
        className={`executive-dashboard  ${loading || heatmapLoading ? 'ui form loading' : ''}`}
        style={{ paddingLeft: 0 }}
      >
        <div className="ui main tiny container">
          <div
            className="ui right aligned vertical inline segment"
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
          {heatmap === '1' &&
            <div
              className="ui vertical segment"
              {...view === 'anomaly' || view === 'all' ? {} : { style: { display: 'none' } }}
            >
              <div className="heatmap-block">
                <h3>Hourly Anomaly Score</h3>
                <HourlyHeatmap
                  statSelector={d => d.totalAnomalyScore}
                  numberOfDays={numberOfDays} endTime={endTime} dataset={heatmapData}
                />
              </div>
              <div className="heatmap-block">
                <h3>Hourly Anomaly Events</h3>
                <HourlyHeatmap
                  statSelector={d => d.numberOfEvents}
                  numberOfDays={numberOfDays} endTime={endTime} dataset={heatmapData}
                />
              </div>
            </div>
          }
          <div
            className="ui vertical segment"
            {...view === 'anomaly' || view === 'all' ? {} : { style: { display: 'none' } }}
          >
            <TopListAnomaly
              timeIntervalPrevious={timeIntervalPrevious}
              timeIntervalCurrent={timeIntervalCurrent}
              timeIntervalPredicted={timeIntervalPredicted}
              stats={eventStats}
              onRowOpen={this.handleListRowOpenAnomaly}
            />
          </div>
          <div
            className="ui vertical segment"
            {...view === 'resource' || view === 'all' ? {} : { style: { display: 'none' } }}
          >
            <TopListResource
              timeIntervalPrevious={timeIntervalPrevious}
              timeIntervalCurrent={timeIntervalCurrent}
              timeIntervalPredicted={timeIntervalPredicted}
              stats={eventStats}
              onRowOpen={this.handleListRowOpenResource}
            />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default withRouter(ExecutiveDashboard);
