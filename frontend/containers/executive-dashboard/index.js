/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React, { PropTypes as T } from 'react';
import store from 'store';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import moment from 'moment';
import { Console } from '../../artui/react';
import { TopListAnomaly, TopListResource } from './top-list';
import HourlyHeatmap from '../../components/statistics/hourly-heatmap';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import retrieveHeatmapData from '../../apis/retrieve-heatmap-data';
import DateTimePicker from '../../components/ui/datetimepicker';
import './executive-dashboard.less';
import { NumberOfDays } from '../../components/selections';
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

    this.state = {
      eventStats: [],
      heatmapData: {},
      loading: true,
      heatmapLoading: true,
      view: 'anomaly',
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  modelDateValidator(date) {
    return moment(date) <= moment();
  }

  applyDefaultParams(params) {
    return {
      endTime: moment().endOf('day').format('YYYY-MM-DD'),
      numberOfDays: 7,
      modelType: 'Holistic',
      period: 3,
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
    const endTimeOfDay = moment(query.endTime).endOf('day');
    const curTime = moment();
    const realEndTime = (endTimeOfDay > curTime ? curTime : endTimeOfDay).valueOf();

    this.setState({
      loading: true,
      heatmapLoading: true,
      heatmapData: {},
    }, () => {
      retrieveExecDBStatisticsData(query.modelType, realEndTime, query.numberOfDays)
        .then((data) => {
          this.setState({
            eventStats: normalizeStats(data),
            loading: false,
          });
        }).catch((msg) => {
          console.log(msg);
        });

      retrieveHeatmapData(query.modelType, realEndTime, query.numberOfDays, 'loadHourly')
        .then((data) => {
          this.setState({
            heatmapData: aggregateToMultiHourData(data, realEndTime, query.numberOfDays),
            heatmapLoading: false,
          });
        }).catch((msg) => {
          console.log(msg);
        });
    });
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query, modelType,
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshData(query);
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query, numberOfDays: numberOfDays.toString(),
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshData(query);
  }

  @autobind
  handleEndTimeChange(value) {
    const { location, router } = this.props;
    const endTime = moment(value).endOf('day').format('YYYY-MM-DD');
    const query = this.applyDefaultParams({ ...location.query, endTime });
    if (location.query.endTime !== endTime) {
      router.push({
        pathname: location.pathname,
        query,
      });

      this.refreshData(query);
    }
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
    const { endTime, numberOfDays, heatmap } = this.applyDefaultParams(location.query);
    const { loading, eventStats, view, heatmapData, heatmapLoading } = this.state;

    return (
      <Console.Content className="executive-dashboard" style={{ paddingLeft: 0 }}>
        <div className="ui main tiny container">
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field" style={{ float: 'left' }}>
              <div
                className={`ui ${view === 'anomaly' ? 'grey' : 'orange'} button`}
                style={{
                  borderRadius: 0,
                  marginRight: 0,
                  ...{
                    cursor: `${view === 'anomaly' ? 'default' : 'pointer'}`,
                    fontWeight: `${view === 'anomaly' ? 'bolder' : 'lighter'}`,
                  },
                }}
                {...view === 'anomaly' ? {} : {
                  onClick: () => this.setState({ view: 'anomaly' }),
                }}
              >Anomaly View</div>
              <div
                className={`ui ${view === 'resource' ? 'grey' : 'orange'} button`}
                style={{
                  borderRadius: 0,
                  marginRight: 0,
                  ...{
                    cursor: `${view === 'resource' ? 'default' : 'pointer'}`,
                    fontWeight: `${view === 'resource' ? 'bolder' : 'lighter'}`,
                  },
                }}
                {...view === 'resource' ? {} : {
                  onClick: () => this.setState({ view: 'resource' }),
                }}
              >Resource View</div>
            </div>
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
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.handleRefreshClick}
              >Refresh</div>
            </div>
          </div>
          <div className={`ui vertical segment ${loading ? 'loading form' : ''}`}>
            <TopListAnomaly
              stats={eventStats}
              onRowOpen={this.handleListRowOpenAnomaly}
              {...view === 'anomaly' ? { } : { style: { display: 'none' } }}
            />
            <TopListResource
              stats={eventStats}
              onRowOpen={this.handleListRowOpenResource}
              {...view === 'resource' ? { } : { style: { display: 'none' } }}
            />
          </div>
          {heatmap === '1' &&
            <div className={`ui vertical segment ${heatmapLoading ? 'loading form' : ''}`}>
              <HourlyHeatmap duration={numberOfDays} endTime={endTime} dataset={heatmapData} />
            </div>
          }
        </div>
      </Console.Content>
    );
  }
}

export default withRouter(ExecutiveDashboard);
