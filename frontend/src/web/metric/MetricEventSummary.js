/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import DatePicker from 'react-datepicker';
import { autobind } from 'core-decorators';

import { State } from '../../common/types';
import { appFieldsMessages, appMenusMessages, appButtonsMessages } from '../../common/app/messages';
import { parseQueryString, buildMatchLocation, getStartEndTimeRange } from '../../common/utils';
import { loadMetricEventSummary } from '../../common/metric/actions';
import { Container, Select, AutoSizer } from '../../lib/fui/react';
import EventLegend from './components/EventLegend';
import EventList from './components/EventList';

type Props = {
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  projects: Array<Object>,
  instanceGroupList: Array<String>,
  eventSummary: Object,
  eventSummaryParams: Object,
  loadMetricEventSummary: Function,
};

class MetricEventSummaryCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultInstanceGroup = 'All';
    this.views = ['detected', 'predicted'];
    this.viewInfos = [
      { key: 'detected', name: 'Detected Events' },
      { key: 'predicted', name: 'Predicted Events' },
    ];
    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

    this.pickNotNil = R.pickBy(a => !R.isNil(a));
    this.ifIn = (i, items) => items.indexOf(i) !== -1;
  }

  componentDidMount() {
    if (!this.applyParamsAndRedirect(this.props)) {
      this.reloadData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.applyParamsAndRedirect(nextProps)) {
      this.reloadData(nextProps);
    }
  }

  applyParamsAndRedirect(props) {
    const { location, match, push, projects } = props;
    const params = parseQueryString(location.search);
    let { projectName, startTime, endTime, instanceGroup, view } = params;
    let redirect = false;

    // The project name might be emtpy, which will be handled by epic.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    // If project changed, reset instanceGroup and view.
    if (projectName !== params.projectName) {
      view = this.viewInfos[0].key;
      instanceGroup = this.defaultInstanceGroup;
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

    instanceGroup = instanceGroup || this.defaultInstanceGroup;
    view =
      view && this.ifIn(view, R.map(v => v.key, this.viewInfos)) ? view : this.viewInfos[0].key;

    const newParams = { projectName, startTime, endTime, instanceGroup, view };
    if (!R.equals(this.pickNotNil(params), this.pickNotNil(newParams))) {
      redirect = true;
      push(buildMatchLocation(match, {}, newParams));
    }

    return redirect;
  }

  reloadData(props, force = false) {
    const { location, eventSummaryParams, loadMetricEventSummary } = props;
    const params = parseQueryString(location.search);
    const { projectName, instanceGroup, startTime, endTime, view } = params;

    // Get the stored params for the view to compare with current params.
    const storedParams = get(eventSummaryParams, view);

    let refresh = force;
    if (!refresh) {
      // If params are different, need to reload the data
      refresh = !R.equals(this.pickNotNil(storedParams), this.pickNotNil(R.omit(['view'], params)));
    }

    if (refresh) {
      loadMetricEventSummary(projectName, instanceGroup, { startTime, endTime, view }, force, true);
    }
  }

  @autobind
  handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    // Reset the instanceGroup and view to default
    const instanceGroup = this.defaultInstanceGroup;
    const view = this.viewInfos[0].key;
    push(buildMatchLocation(match, {}, { ...params, projectName, instanceGroup, view }));
  }

  @autobind
  handleInstanceGroupChange(newValue) {
    const instanceGroup = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    push(buildMatchLocation(match, {}, { ...params, instanceGroup }));
  }

  @autobind
  handleStartTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const nowObj = moment();
    const startTimeObj = newDate.clone().startOf('day');
    let endTimeObj = startTimeObj.clone().add(this.defaultNumberOfDays - 1, 'day').endOf('day');

    if (endTimeObj >= nowObj) {
      endTimeObj = nowObj.endOf('day');
    }
    const startTime = startTimeObj.format(this.dateFormat);
    const endTime = endTimeObj.format(this.dateFormat);
    push(buildMatchLocation(match, {}, { ...params, startTime, endTime }));
  }

  @autobind
  handleEndTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const nowObj = moment();
    let startTimeObj = moment(params.startTime, this.dateFormat);
    let endTimeObj = newDate.clone().endOf('day');

    if (endTimeObj >= nowObj) {
      endTimeObj = nowObj.endOf('day');
    }
    startTimeObj = endTimeObj.clone().subtract(this.defaultNumberOfDays - 1, 'day').startOf('day');
    const startTime = startTimeObj.format(this.dateFormat);
    const endTime = endTimeObj.format(this.dateFormat);

    push(buildMatchLocation(match, {}, { ...params, startTime, endTime }));
  }

  @autobind
  handleViewChangeClick(view) {
    return e => {
      e.preventDefault();
      e.stopPropagation();

      const { match, push, location } = this.props;
      const params = parseQueryString(location.search);
      push(buildMatchLocation(match, {}, { ...params, view }));
    };
  }

  @autobind
  handleRefreshClick() {
    this.reloadData(this.props, true);
  }

  render() {
    const { intl, projects, instanceGroupList, eventSummary } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, startTime, endTime, instanceGroup, view } = params;

    const showDetected = view === 'detected';
    const showPredicted = view === 'predicted';
    const viewData = get(eventSummary, view, {});
    const eventList = viewData.eventList || [];
    const { maxAnomalyRatio, minAnomalyRatio } = viewData;

    const nowObj = moment();
    const startTimeObj = moment(startTime, this.dateFormat);
    const endTimeObj = moment(endTime, this.dateFormat);

    return (
      <Container fullHeight withGutter className="flex-col metric-analysis">
        <Container breadcrumb>
          <div className="section">
            <span className="label">
              {intl.formatMessage(appMenusMessages.metricAnalysis)}
            </span>
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
            <span className="divider">/</span>
            <Select
              name="group"
              inline
              style={{ width: 200 }}
              options={R.map(g => ({ label: g, value: g }), instanceGroupList)}
              value={instanceGroup}
              onChange={this.handleInstanceGroupChange}
              placeholder="Select Group"
            />
          </div>
          <div className="section float-right" style={{ fontSize: 12 }}>
            <span className="label">
              {intl.formatMessage(appFieldsMessages.startDate)}
            </span>
            <div className="ui input">
              <DatePicker
                todayButton="Today"
                dateFormat={this.dateFormat}
                selected={startTimeObj}
                maxDate={nowObj}
                onChange={this.handleStartTimeChange}
              />
            </div>
            <span className="label">
              {intl.formatMessage(appFieldsMessages.endDate)}
            </span>
            <div className="ui input">
              <DatePicker
                todayButton="Today"
                dateFormat={this.dateFormat}
                selected={endTimeObj}
                maxDate={nowObj}
                onChange={this.handleEndTimeChange}
              />
            </div>
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              {intl.formatMessage(appButtonsMessages.refresh)}
            </div>
          </div>
        </Container>
        <Container
          className="flex-grow flex-col overflow-y-auto"
          style={{ paddingTop: 8, paddingBottom: 8 }}
        >
          <Container className="boxed flex-grow flex-row" style={{ margin: 0, minHeight: 400 }}>
            <Container className="flex-col" style={{ width: 620 }}>
              <div
                className="ui tiny orange button"
                style={{ position: 'absolute', left: 320, top: 5 }}
                title="Causal Analysis"
                onClick={e => {
                  e.stopPropagation();
                  this.setState({ showCausalGraphModal: true });
                }}
              >
                Causal Analysis
              </div>
              <div
                className="ui tiny orange button"
                style={{ position: 'absolute', left: 450, top: 5 }}
                title="Overall Chart"
                onClick={e => {
                  e.stopPropagation();
                  this.showInstanceChart();
                }}
              >
                Overall Chart
              </div>
              <div className="ui pointing secondary menu" style={{ marginTop: 0, marginBottom: 4 }}>
                {R.map(
                  info =>
                    <a
                      key={info.key}
                      className={`${info.key === view ? 'active' : ''} item`}
                      onClick={this.handleViewChangeClick(info.key)}
                    >
                      {info.name}
                    </a>,
                  this.viewInfos,
                )}
              </div>
              {showDetected &&
                <Container className="flex-grow">
                  <AutoSizer>
                    {({ width, height }) =>
                      <EventList
                        width={width}
                        height={height}
                        incidents={eventList}
                        maxAnomalyRatio={maxAnomalyRatio}
                        minAnomalyRatio={minAnomalyRatio}
                      />}
                  </AutoSizer>
                </Container>}
              {showPredicted &&
                <Container className="flex-grow">
                  <AutoSizer>
                    {({ width, height }) =>
                      <EventList
                        width={width}
                        height={height}
                        incidents={eventList}
                        maxAnomalyRatio={maxAnomalyRatio}
                        minAnomalyRatio={minAnomalyRatio}
                      />}
                  </AutoSizer>
                </Container>}
              <EventLegend />
            </Container>
            <Container className="flex-grow">fsdfds</Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

const MetricEventSummary = injectIntl(MetricEventSummaryCore);
export default connect(
  (state: State) => {
    const { eventSummaryParams, eventSummary } = state.metric;
    const { projects, currentProjectGroupList } = state.app;
    return {
      projects: R.filter(p => p.isMetric, projects),
      instanceGroupList: currentProjectGroupList,
      eventSummaryParams,
      eventSummary,
    };
  },
  { push, loadMetricEventSummary },
)(MetricEventSummary);
