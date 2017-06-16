/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import $ from 'jquery';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import moment from 'moment';
import { get } from 'lodash';
import DatePicker from 'react-datepicker';
import { autobind } from 'core-decorators';
import { State } from '../../common/types';
import { parseQueryString, buildMatchLocation, getStartEndTimeRange } from '../../common/utils';
import { Container, Select } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages, appMessages } from '../../common/app/messages';
import { showAppAlert } from '../../common/app/actions';
import { loadMetricHourlyEvents, loadMetricWeeklyAnomalies } from '../../common/metric/actions';
import HourlyHeatmap from '../../../components/statistics/hourly-heatmap';
import TopListAnomaly from '../../../containers/executive-dashboard/top-list-anomaly-metric';
import '../../../containers/executive-dashboard/executive-dashboard.less';

type Props = {
  projects: Array<Object>,
  currentHourlyEvents: Object,
  currentHourlyEventsLoading: bool,
  currentWeeklyAnomalies: Object,
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  showAppAlert: Function,
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
    const params = this.applyParamsAndRedirect(this.props);
    this.reloadData(params);
  }

  componentWillReceiveProps(newProps) {
    const { match, location } = this.props;
    const query = parseQueryString(location.search) || {};
    const params = this.applyParamsAndRedirect(newProps);

    this.reloadData(params, {
      projectId: match.params.projectId,
      startTime: query.startTime,
      endTime: query.endTime,
      instanceGroup: query.instanceGroup,
    });
  }

  reloadData(params, prevParams) {
    // Check whether the params are changed, if so reload the data.
    const { projectId, startTime, instanceGroup, endTime } = params || {};
    const { projectId: prevProjectId, instanceGroup: prevInstanceGroup,
      startTime: prevStartTime, endTime: prevEndTime } = prevParams || {};

    // If the projectId not exists, show error message.
    if (projectId && projectId !== prevProjectId) {
      const { projects, showAppAlert } = this.props;
      if (!R.find(p => p.projectId === projectId, projects)) {
        showAppAlert('error', appMessages.errorsProjectNotFound, { projectName: projectId });
      }
    }

    if (projectId && (
      projectId !== prevProjectId || instanceGroup !== prevInstanceGroup ||
      startTime !== prevStartTime || endTime !== prevEndTime)) {
      this.props.loadMetricHourlyEvents(projectId, instanceGroup, startTime, endTime);
    }

    if (projectId && (
      projectId !== prevProjectId ||
      startTime !== prevStartTime || endTime !== prevEndTime)) {
      this.props.loadMetricWeeklyAnomalies(projectId, startTime, endTime);
    }
  }

  applyParamsAndRedirect(props) {
    // Apply the default params if missing and redirect to new location if params
    // changed.
    const { match, location, push, projects } = props;
    const query = parseQueryString(location.search) || {};

    let { projectId } = match.params;
    let { startTime, endTime } = query;
    const { instanceGroup } = query;

    if (!projectId && projects.length > 0) {
      projectId = projects[0].projectId;
    }

    const timeRange = getStartEndTimeRange(
      startTime, endTime, this.defaultNumberOfDays, this.dateFormat);
    startTime = timeRange.startTime;
    endTime = timeRange.endTime;

    if (projectId !== match.params.projectId ||
      startTime !== query.startTime || endTime !== query.endTime
    ) {
      const url = buildMatchLocation(match, { projectId }, {
        startTime, endTime, instanceGroup });
      push(url);
    }
    return {
      projectId, startTime, endTime, instanceGroup,
    };
  }

  @autobind
  handleProjectChange(newValue) {
    const projectId = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const { startTime, endTime } = parseQueryString(location.search);

    const url = buildMatchLocation(match, { projectId }, {
      startTime, endTime, instanceGroup: null,
    });
    push(url);
  }

  @autobind
  handleStartTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const mNow = moment();
    const mStartTime = newDate.clone().startOf('day');
    let mEndTime = mStartTime.clone().add(this.defaultNumberOfDays - 1, 'day').endOf('day');

    if (mEndTime >= mNow) {
      mEndTime = mNow.endOf('day');
    }

    const url = buildMatchLocation(match, match.params, {
      ...params,
      startTime: mStartTime.format(this.dateFormat),
      endTime: mEndTime.format(this.dateFormat),
      instanceGroup: params.instanceGroup,
    });
    push(url);
  }

  @autobind
  handleEndTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const mNow = moment();
    let mStartTime = moment(params.startTime, this.dateFormat);
    let mEndTime = newDate.clone().endOf('day');

    if (mEndTime >= mNow) {
      mEndTime = mNow.endOf('day');
    }
    mStartTime = mEndTime.clone().subtract(this.defaultNumberOfDays - 1, 'day').startOf('day');
    const url = buildMatchLocation(match, match.params, {
      ...params,
      startTime: mStartTime.format(this.dateFormat),
      endTime: mEndTime.format(this.dateFormat),
      instanceGroup: params.instanceGroup,
    });
    push(url);
  }

  @autobind
  handleAnomalyListRowClick(projectName, instanceGroup) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { startTime, endTime } = params;

    const url = buildMatchLocation(match, { projectId: projectName }, {
      startTime, endTime, instanceGroup,
    });
    push(url);
  }

  @autobind
  handleRefreshClick() {
    const { match, location } = this.props;
    const { projectId } = match.params;
    const { startTime, endTime, instanceGroup } = parseQueryString(location.search) || {};
    this.reloadData({
      projectId, startTime, endTime, instanceGroup,
    });
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
    const { location } = this.props;
    const { startTime, endTime } = parseQueryString(location.search) || {};
    const mStartTime = moment(startTime, this.dateFormat);
    const mEndTime = moment(endTime, this.dateFormat);
    const timezoneOffset = moment().utcOffset();

    const numberOfDays = mEndTime.diff(mStartTime, 'days') + 1;
    const query = {
      startTime: mStartTime.format(this.dateFormat),
      endTime: mEndTime.format(this.dateFormat),
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

    window.open(`/cloud/monitoring?${$.param(query)}`, '_blank');
  }

  render() {
    const { intl, match, location, projects,
      currentHourlyEvents, currentHourlyEventsLoading, currentWeeklyAnomalies } = this.props;
    const query = parseQueryString(location.search) || {};

    const { projectId } = match.params;
    const { startTime, endTime, instanceGroup } = query;

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
              name="project" inline style={{ width: 200 }}
              options={R.map(p => ({ label: p.projectId, value: p.projectName }), projects)}
              value={projectId} onChange={this.handleProjectChange}
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
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>Refresh</div>
          </div>
        </Container>
        <Container fullHeight className="overflow-y-auto flex-col">
          <Container className={`boxed ${currentHourlyEventsLoading ? 'loading' : ''}`}>
            <div className="heatmap-block">
              <h4 style={{ marginBottom: '0.5em' }}>Detected Events (Hourly)</h4>
              <HourlyHeatmap
                statSelector={d => d.totalAnomalyScore}
                numberOfDays={numberOfDays} dataset={get(currentHourlyEvents, 'detected', {})}
                onNameClick={this.handleListRowOpenDetectedAnomaly}
              />
            </div>
            <div className="heatmap-block">
              <h4 style={{ marginBottom: '0.5em' }}>Predicted Events (Hourly)</h4>
              <HourlyHeatmap
                statSelector={d => d.totalAnomalyScore} rightEdge
                numberOfDays={numberOfDays} dataset={get(currentHourlyEvents, 'predicted', {})}
                onNameClick={this.handleListRowOpenPredictedAnomaly}
              />
            </div>
            <div style={{ color: 'grey', marginLeft: '2em' }}>
              <i className="icon circle info" />
              <span>Only start time of the event is shown, hover the cell to see event duration and details.</span>
            </div>
          </Container>
          { currentWeeklyAnomalies &&
          <Container className="boxed flex-grow flex-col" style={{ marginTop: 0, minHeight: 200 }}>
            <h4 style={{ textAlign: 'center', marginBottom: '0.5em' }}>Anomaly Statistcs (Weekly)</h4>
            <TopListAnomaly
              timeIntervalPrevious={timeIntervalPrevious}
              timeIntervalCurrent={timeIntervalCurrent}
              timeIntervalPredicted={timeIntervalPredicted}
              autoExpandCount={1}
              stats={currentWeeklyAnomalies || []}
              onRowOpen={this.handleListRowOpenAnomaly}
              onRowClick={this.handleAnomalyListRowClick}
            />
          </Container>
          }
        </Container>
      </Container>
    );
  }
}

const MetricAnalysis = injectIntl(MetricAnalysisCore);
export default connect(
  (state: State) => {
    const { currentHourlyEvents, currentHourlyEventsLoading,
      currentWeeklyAnomalies,
    } = state.metric;
    return {
      projects: R.filter(p => p.isMetric, state.app.projects),
      currentHourlyEvents, currentHourlyEventsLoading,
      currentWeeklyAnomalies,
    };
  },
  { push, showAppAlert, loadMetricHourlyEvents, loadMetricWeeklyAnomalies },
)(MetricAnalysis);
