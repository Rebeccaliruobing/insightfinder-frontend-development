/* eslint-disable no-console */
import React, { PropTypes as T } from 'react';
import store from 'store';
import $ from 'jquery';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import moment from 'moment';
import { Console } from '../../artui/react';
import TopList from './top-list';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import DateTimePicker from '../../components/ui/datetimepicker';
import './executive-dashboard.less';
import { NumberOfDays, EventSummaryModelType } from '../../components/selections';
import normalizeStats from './normalize-stats';

const modelDateValidator = date => moment(date) <= moment();
const applyDefaultParams = params => ({
  endTime: +moment(),
  numberOfDays: 7,
  modelType: 'Holistic',
  ...params,
});

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
      loading: true,
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  @autobind
  refreshData() {
    const { location } = this.props;
    const query = applyDefaultParams(location.query);
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
  handleModelTypeChange(value, modelType) {
    const { location, router } = this.props;
    router.push({
      pathname: location.pathname,
      query: applyDefaultParams({
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
      query: applyDefaultParams({
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
      query: applyDefaultParams({ ...location.query, endTime }),
    });

    this.refreshData();
  }

  @autobind
  handleListRowOpen(projectName, groupName) {
    const { location } = this.props;
    const query = applyDefaultParams({
      ...location.query,
      projectName,
      groupName,
    });
    store.set('liveAnalysisProjectName', name);
    window.open(`/cloud/monitoring?${$.param(query)}`, '_target');
  }

  render() {
    const { location } = this.props;
    const { endTime, numberOfDays, modelType } = applyDefaultParams(location.query);
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
                  dateValidator={modelDateValidator}
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
            <TopList stats={eventStats} onRowOpen={this.handleListRowOpen} />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default withRouter(ExecutiveDashboard);
