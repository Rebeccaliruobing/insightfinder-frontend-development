/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import moment from 'moment';
import { get } from 'lodash';
import DatePicker from 'react-datepicker';
import { autobind } from 'core-decorators';
import { State } from '../../common/types';
import {
  parseQueryString,
  buildMatchLocation,
  buildUrl,
  getStartEndTimeRange,
} from '../../common/utils';
import { Container, Select } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import { BaseUrls } from '../app/Constants';
import { loadMetricHourlyEvents, loadMetricWeeklyAnomalies } from '../../common/metric/actions';
import HourlyHeatmap from '../../../components/statistics/hourly-heatmap';
import TopListAnomaly from '../../../containers/executive-dashboard/top-list-anomaly-metric';
import '../../../containers/executive-dashboard/executive-dashboard.less';

type Props = {
  projects: Array<Object>,
  currentHourlyEvents: ?Object,
  currentHourlyEventsLoading: boolean,
  currentWeeklyAnomalies: ?Object,
  currentErrorMessage: ?Object,
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  loadMetricHourlyEvents: Function,
  loadMetricWeeklyAnomalies: Function,
};

class MetricAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';
  }

  componentDidMount() {
    if (!this.applyParamsAndRedirect(this.props)) {
      this.reloadData(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.applyParamsAndRedirect(newProps)) {
      this.reloadData(newProps, this.props);
    }
  }

  applyParamsAndRedirect(props) {
    // Apply the default params if missing and redirect to new location if params changed.
    // The return value will indicate whether redirection happens, if yes, no need to reload data
    const { location, match, push, projects } = props;
    const query = parseQueryString(location.search);
    let { projectName, startTime, endTime, instanceGroup } = query;
    let redirect = false;

    // If no project is selected, choose the first project if exists.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    // If project changed, reset group to nul.
    if (projectName !== query.projectName) {
      instanceGroup = null;
    }

    // Limit start/end time in n days.
    const timeRange = getStartEndTimeRange(
      startTime,
      endTime,
      this.defaultNumberOfDays,
      this.dateFormat,
    );
    startTime = timeRange.startTime;
    endTime = timeRange.endTime;

    // If any parts is different, we need redirect to the now location.
    if (
      projectName !== query.projectName ||
      startTime !== query.startTime ||
      endTime !== query.endTime ||
      instanceGroup !== query.instanceGroup
    ) {
      redirect = true;
      const url = buildMatchLocation(match, {}, { projectName, startTime, endTime, instanceGroup });
      push(url);
    }

    return redirect;
  }

  reloadData(props, prevProps) {
    // Check whether the params are changed, if so reload the data.
    const params = parseQueryString(get(props, 'location.search'));
    const prevParams = parseQueryString(get(prevProps, 'location.search'));

    // If any params is different, reload the hourly events.
    if (!R.equals(params, prevParams)) {
      const { projectName, instanceGroup, startTime, endTime } = params;
      this.props.loadMetricHourlyEvents(projectName, instanceGroup, startTime, endTime);
    }

    // For weekly anomalies, we need to ignore the instanceGroup
    delete params.instanceGroup;
    delete prevParams.instanceGroup;
    if (!R.equals(params, prevParams)) {
      const { projectName, startTime, endTime } = params;
      this.props.loadMetricWeeklyAnomalies(projectName, startTime, endTime);
    }
  }

  @autobind handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { startTime, endTime } = params;
    // When project changed, set group to null.
    const instanceGroup = null;
    push(buildMatchLocation(match, {}, { projectName, startTime, endTime, instanceGroup }));
  }

  @autobind handleStartTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, instanceGroup } = params;

    const mNow = moment();
    const mStartTime = newDate.clone().startOf('day');
    let mEndTime = mStartTime.clone().add(this.defaultNumberOfDays - 1, 'day').endOf('day');

    if (mEndTime >= mNow) {
      mEndTime = mNow.endOf('day');
    }
    const startTime = mStartTime.format(this.dateFormat);
    const endTime = mEndTime.format(this.dateFormat);
    push(buildMatchLocation(match, {}, { projectName, startTime, endTime, instanceGroup }));
  }

  @autobind handleEndTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, instanceGroup } = params;

    const mNow = moment();
    let mStartTime = moment(params.startTime, this.dateFormat);
    let mEndTime = newDate.clone().endOf('day');

    if (mEndTime >= mNow) {
      mEndTime = mNow.endOf('day');
    }
    mStartTime = mEndTime.clone().subtract(this.defaultNumberOfDays - 1, 'day').startOf('day');
    const startTime = mStartTime.format(this.dateFormat);
    const endTime = mEndTime.format(this.dateFormat);

    push(buildMatchLocation(match, {}, { projectName, startTime, endTime, instanceGroup }));
  }

  @autobind handleAnomalyListRowClick(projectName, instanceGroup) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { startTime, endTime } = params;
    push(buildMatchLocation(match, {}, { projectName, startTime, endTime, instanceGroup }));
  }

  @autobind handleRefreshClick() {
    const { location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, startTime, endTime, instanceGroup } = params;
    this.reloadData({ projectName, startTime, endTime, instanceGroup });
  }

  @autobind handleListRowOpenDetectedAnomaly(projectName, instanceGroup, datetime) {
    this.handleListRowOpenAnomaly(projectName, instanceGroup, datetime);
  }

  @autobind handleListRowOpenPredictedAnomaly(projectName, instanceGroup, datetime) {
    this.handleListRowOpenAnomaly(projectName, instanceGroup, datetime, true);
  }

  @autobind handleListRowOpenAnomaly(projectName, instanceGroup, datetime, predicted = false) {
    const { location } = this.props;
    const params = parseQueryString(location.search);
    const { startTime, endTime } = params;
    const mStartTime = moment(startTime, this.dateFormat);
    const mEndTime = moment(endTime, this.dateFormat);
    const timezoneOffset = moment().utcOffset();

    const numberOfDays = mEndTime.diff(mStartTime, 'days') + 1;
    const query = {
      startTime: mStartTime.format(this.dateFormat),
      endTime: mEndTime.format(this.dateFormat),
      numberOfDays,
      timezoneOffset,
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

    window.open(buildUrl(BaseUrls.MetricEvents, {}, query), '_blank');
  }

  render() {
    const {
      intl,
      location,
      projects,
      currentHourlyEvents,
      currentHourlyEventsLoading,
      currentWeeklyAnomalies,
      currentErrorMessage,
    } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, startTime, endTime, instanceGroup } = params;

    const mNow = moment();
    const mStartTime = moment(startTime, this.dateFormat);
    const mMaxStartTime = mNow;
    const mEndTime = moment(endTime, this.dateFormat);
    const mMaxEndTime = mNow;
    const numberOfDays = mEndTime.diff(mStartTime, 'days') + 1;

    const startTimePrevious = mStartTime.clone().subtract(numberOfDays, 'day');
    const endTimePrevious = mEndTime.clone().subtract(numberOfDays, 'day');
    const startTimePredicted = mStartTime.clone().add(numberOfDays, 'day');
    const endTimePredicted = mEndTime.clone().add(numberOfDays, 'day');
    const timeIntervalPrevious = `${startTimePrevious.format('M/D')} - ${endTimePrevious.format('M/D')}`;
    const timeIntervalCurrent = `${mStartTime.format('M/D')} - ${mEndTime.format('M/D')}`;
    const timeIntervalPredicted = `${startTimePredicted.format('M/D')} - ${endTimePredicted.format('M/D')}`;

    return (
      <Container fullHeight withGutter className="flex-col metric-analysis">
        <Container breadcrumb>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.metricAnalysis)}</span>
            <span className="divider">/</span>
            <Select
              name="project"
              inline
              style={{ width: 200 }}
              options={R.map(p => ({ label: p.projectName, value: p.projectName }), projects)}
              value={projectName}
              onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
            />
            {!!instanceGroup && <span className="divider">/</span>}
            {!!instanceGroup && <span>{instanceGroup}</span>}
          </div>
          <div className="section float-right" style={{ fontSize: 12 }}>
            <span className="label">Start Date:</span>
            <div className="ui input">
              <DatePicker
                todayButton="Today"
                dateFormat={this.dateFormat}
                selected={mStartTime}
                maxDate={mMaxStartTime}
                onChange={this.handleStartTimeChange}
              />
            </div>
            <span className="label">End Date:</span>
            <div className="ui input">
              <DatePicker
                todayButton="Today"
                dateFormat={this.dateFormat}
                selected={mEndTime}
                maxDate={mMaxEndTime}
                onChange={this.handleEndTimeChange}
              />
            </div>
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              Refresh
            </div>
          </div>
        </Container>
        <Container fullHeight className="overflow-y-auto flex-col">
          {currentErrorMessage &&
            <Container fullHeight>
              <div
                className="ui error message"
                style={{ marginTop: 16 }}
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage(currentErrorMessage, { projectName }),
                }}
              />
            </Container>}
          {!currentErrorMessage &&
            currentHourlyEvents &&
            <Container className={`boxed ${currentHourlyEventsLoading ? 'loading' : ''}`}>
              <div className="heatmap-block">
                <h4 style={{ marginBottom: '0.5em' }}>Detected Events (Hourly)</h4>
                <HourlyHeatmap
                  statSelector={d => d.totalAnomalyScore}
                  numberOfDays={numberOfDays}
                  dataset={get(currentHourlyEvents, 'detected', {})}
                  onNameClick={this.handleListRowOpenDetectedAnomaly}
                />
              </div>
              <div className="heatmap-block">
                <h4 style={{ marginBottom: '0.5em' }}>Predicted Events (Hourly)</h4>
                <HourlyHeatmap
                  statSelector={d => d.totalAnomalyScore}
                  rightEdge
                  numberOfDays={numberOfDays}
                  dataset={get(currentHourlyEvents, 'predicted', {})}
                  onNameClick={this.handleListRowOpenPredictedAnomaly}
                />
              </div>
              <div style={{ color: 'grey', marginLeft: '2em' }}>
                <i className="icon circle info" />
                <span>
                  Only start time of the event is shown, hover the cell to see event duration and details.
                </span>
              </div>
            </Container>}
          {!currentErrorMessage &&
            currentWeeklyAnomalies &&
            <Container
              className="boxed flex-grow flex-col"
              style={{ marginTop: 0, minHeight: 200 }}
            >
              <h4 style={{ textAlign: 'center', marginBottom: '0.5em' }}>
                Anomaly Statistcs (Weekly)
              </h4>
              <TopListAnomaly
                timeIntervalPrevious={timeIntervalPrevious}
                timeIntervalCurrent={timeIntervalCurrent}
                timeIntervalPredicted={timeIntervalPredicted}
                autoExpandCount={1}
                stats={currentWeeklyAnomalies || []}
                onRowOpen={this.handleListRowOpenAnomaly}
                onRowClick={this.handleAnomalyListRowClick}
              />
            </Container>}
        </Container>
      </Container>
    );
  }
}

const MetricAnalysis = injectIntl(MetricAnalysisCore);
export default connect(
  (state: State) => {
    const {
      currentHourlyEvents,
      currentHourlyEventsLoading,
      currentWeeklyAnomalies,
      currentErrorMessage,
    } = state.metric;
    return {
      projects: R.filter(p => p.isMetric, state.app.projects),
      currentHourlyEvents,
      currentHourlyEventsLoading,
      currentWeeklyAnomalies,
      currentErrorMessage,
    };
  },
  { push, loadMetricHourlyEvents, loadMetricWeeklyAnomalies },
)(MetricAnalysis);
