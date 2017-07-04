/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import R from 'ramda';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import { push } from 'react-router-redux';
import { Tooltip } from 'pui-react-tooltip';
import { OverlayTrigger } from 'pui-react-overlay-trigger';

import { State } from '../../common/types';
import { parseQueryString, buildMatchLocation, buildUrl } from '../../common/utils';
import { Container, Select, Tile, Box } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import {
  loadLogIncidentList,
  loadLogIncident,
  loadLogEventList,
  loadLogSequenceEventList,
  selectLogPattern,
  selectLogPatternSequence,
  rerunLogDetection,
} from '../../common/log/actions';
import {
  LogClusters,
  LogFrequencyAnomalies,
  LogRareEvents,
  LogPatternSequences,
} from './components';
import './log.scss';

type Props = {
  intl: Object,
  match: Object,
  location: Object,
  push: Function,

  currentLoadingComponents: Object,
  projects: Array<Object>,
  incidentList: Array<Object>,
  incidentListParams: Object,
  incident: Object,
  incidentParams: Object,
  currentError: ?Object,
  viewsState: Object,

  rerunLogDetection: Function,
  loadLogIncidentList: Function,
  loadLogIncident: Function,
  selectLogPattern: Function,
  selectLogPatternSequence: Function,
  loadLogEventList: Function,
  loadLogSequenceEventList: Function,
};

class LogAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.pickNotNil = R.pickBy(a => !R.isNil(a));
    this.ifIn = (i, items) => items.indexOf(i) !== -1;

    // General the monthy option list for one year.
    this.monthCount = 5 * 12;

    // The default view when incident is displayed.
    this.defaultIncidentView = 'rare';

    this.monthFormat = 'YYYY-MM';

    // View name, key and React component used to create the view. The view component
    // will take the same props.
    this.viewInfos = [
      { key: 'rare', name: 'Rare Events', component: LogRareEvents },
      { key: 'cluster', name: 'Clusters Detected', component: LogClusters },
      { key: 'freq', name: 'Log Frequency Anomalies', component: LogFrequencyAnomalies },
      { key: 'seq', name: 'Frequent Pattern Sequences', component: LogPatternSequences },
    ];

    // Create the select options for month picker.
    this.monthOptions = R.map((offset) => {
      const month = moment();
      month.add(-offset, 'month').startOf('month');
      return {
        label: month.format('MMM YYYY'),
        value: month.format(this.monthFormat),
      };
    }, R.range(0, this.monthCount));
  }

  componentDidMount() {
    if (!this.applyParamsAndRedirect(this.props)) {
      this.reloadData(this.props, true);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.applyParamsAndRedirect(newProps)) {
      this.reloadData(newProps);
    }
  }

  applyParamsAndRedirect(props) {
    // Apply the default params if missing and redirect to new location if params changes.
    // When redirection happens, we should not need to reload the data. The return value
    // indicates whethre rediction happens.
    const { location, match, push, projects } = props;
    const params = parseQueryString(location.search);
    let { projectName, month, incidentId, view } = params;
    const isIncident = Boolean(incidentId);
    let redirect = false;

    // The project name might be emtpy, which will be handled by epic.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    month = month || moment().format(this.monthFormat);

    if (isIncident) {
      if (!view || !R.find(i => i.key === view, this.viewInfos)) {
        view = this.defaultIncidentView;
      }
    } else {
      incidentId = undefined;
      view = undefined;
    }

    // Remove the empty params, otherwise it will affect the comparation.
    const newParams = this.pickNotNil({ projectName, month, incidentId, view });

    // Compare the new params with the origin params, if changed, redirect to new location.
    if (!R.equals(newParams, params)) {
      redirect = true;
      push(buildMatchLocation(match, {}, newParams));
    }

    return redirect;
  }

  reloadData(props, force = false) {
    // We use incidentId to check whether we want to display list or incident.
    // In both case, we need to compare the new params with current params, if
    // it's not changed, we CANNOT load data, Otherwise, it might cause infinite loop.
    const params = this.pickNotNil(parseQueryString(get(props, 'location.search')));
    const { incidentListParams, incidentParams } = props;
    const { projectName, month, incidentId, view } = params;
    const isIncident = Boolean(incidentId);

    let refresh = force;
    if (!refresh) {
      refresh = isIncident
        ? !R.equals(this.pickNotNil({ projectName, month, incidentId, view }), incidentParams)
        : !R.equals(this.pickNotNil({ projectName, month }), incidentListParams);
    }

    if (refresh) {
      if (isIncident) {
        props.loadLogIncident(projectName, { month, incidentId, view }, force);
      } else {
        props.loadLogIncidentList(projectName, { month }, force);
      }
    }
  }

  @autobind handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { month } = params;

    // When project changed, remove incident related params.
    push(buildMatchLocation(match, {}, { projectName, month }));
  }

  @autobind handleMonthChange(newValue) {
    const month = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName } = params;

    // When month changed, remove incident related params.
    push(buildMatchLocation(match, {}, { projectName, month }));
  }

  @autobind handleIncidentChange(newValue) {
    const incidentId = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    push(buildMatchLocation(match, {}, { ...params, incidentId }));
  }

  @autobind handleViewChangeClick(view) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, push, location } = this.props;
      const params = parseQueryString(location.search);
      push(buildMatchLocation(match, {}, { ...params, view }));
    };
  }

  @autobind handleIncidentClick(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, push, location } = this.props;
      const params = parseQueryString(location.search);
      push(buildMatchLocation(match, {}, { ...params, incidentId }));
    };
  }

  @autobind handleIncidentOpen(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, location } = this.props;
      const params = parseQueryString(location.search);
      const url = buildUrl(match.path, {}, { ...params, incidentId });
      window.open(url, '_blank');
    };
  }

  @autobind handleRedectionClick(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { location, rerunLogDetection } = this.props;
      const params = parseQueryString(location.search);
      const { projectName } = params;

      rerunLogDetection(projectName, incidentId);
    };
  }

  @autobind handleRefreshClick() {
    this.reloadData(this.props, true);
  }

  render() {
    const {
      intl,
      match,
      projects,
      incidentList,
      incident,
      currentError,
      viewsState,
      selectLogPattern,
      selectLogPatternSequence,
      loadLogSequenceEventList,
      loadLogEventList,
      currentLoadingComponents,
    } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, incidentId, view } = params;

    const hasError = Boolean(currentError);
    const viewInfo = R.find(info => info.key === view, this.viewInfos);
    const viewInfoData = get(incident, view);

    const showIncident = Boolean(incidentId);
    const incidentInfo = incidentId ? R.find(i => i.id === incidentId, incidentList) : {};

    // Select renderer to generate link to month.
    const monthValueRender = (option) => {
      const url = buildMatchLocation(match, {}, { projectName, month: option.value });
      return <Select.Link to={url} className="label">{option.label}</Select.Link>;
    };
    const incidentCountBy = (i) => {
      if (view === 'rare') {
        return `${i.name}      (${i.rareEventsCount.toString()})`;
      } else if (view === 'cluster') {
        return `${i.name}      (${i.clusterCount.toString()})`;
      }
      return i.name;
    };

    return (
      <Container fullHeight withGutter className="flex-col log-live">
        <Container breadcrumb>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.logAnalysis)}</span>
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
              name="month"
              inline
              style={{ width: 140 }}
              placeholder="Select Month"
              options={this.monthOptions}
              value={month}
              onChange={this.handleMonthChange}
              {...(showIncident ? { valueRenderer: monthValueRender } : {})}
            />
            {showIncident && <span className="divider">/</span>}
            {showIncident &&
              <Select
                name="incident"
                inline
                style={{ width: 200 }}
                options={R.map(
                  i => ({ label: `${incidentCountBy(i)}`, value: i.id }),
                  incidentList,
                )}
                value={incidentId}
                onChange={this.handleIncidentChange}
              />}
          </div>
          <div className="section float-right" style={{ fontSize: 12 }}>
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              Refresh
            </div>
          </div>
        </Container>
        {hasError &&
          <Container fullHeight>
            <div
              className="ui error message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(currentError, { projectName }),
              }}
            />
          </Container>}
        {!hasError &&
          !showIncident &&
          incidentList.length === 0 &&
          <Container fullHeight>
            <div
              className="ui warning message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: 'No log entries found during this period, please select other month to view.',
              }}
            />
          </Container>}
        {!hasError &&
          !showIncident &&
          incidentList.length > 0 &&
          <Container fullHeight className="overflow-y-auto">
            <Tile isParent isFluid style={{ paddingLeft: 0, paddingRight: 0 }}>
              {incidentList.map(ic => (
                <Tile
                  key={`${projectName}-${ic.incidentKey}`}
                  className="incident-tile"
                  onClick={this.handleIncidentClick(ic.id)}
                >
                  <Box isLink>
                    <div className="actions">
                      <OverlayTrigger
                        placement="top"
                        delayShow={300}
                        overlay={<Tooltip>Rerun Detection</Tooltip>}
                      >
                        <i onClick={this.handleRedectionClick(ic.id)} className="repeat icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        delayShow={300}
                        overlay={<Tooltip>Open in New Window</Tooltip>}
                      >
                        <i
                          onClick={this.handleIncidentOpen(ic.id)}
                          className="link external icon"
                        />
                      </OverlayTrigger>
                    </div>
                    <div className="content">
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>Start Time:</div>
                        <div style={{ float: 'right' }}>
                          {moment(ic.incidentStartTime).format('YYYY/MM/DD hh:mm')}
                        </div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>End Time:</div>
                        <div style={{ float: 'right' }}>
                          {moment(ic.incidentEndTime).format('YYYY/MM/DD hh:mm')}
                        </div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>
                          Total Events:
                        </div>
                        <div style={{ float: 'right' }}>{ic.totalEventsCount}</div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>Clusters:</div>
                        <div style={{ float: 'right' }}>{ic.clusterCount}</div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>
                          Rare Events:
                        </div>
                        <div style={{ float: 'right' }}>{ic.rareEventsCount}</div>
                      </div>
                    </div>
                  </Box>
                </Tile>
              ))}
            </Tile>
          </Container>}
        {!hasError &&
          showIncident &&
          <Container className="flex-grow flex-col">
            <Container className="boxed flex-grow flex-col">
              <div className="ui pointing secondary menu">
                {R.map(
                  info => (
                    <a
                      key={info.key}
                      className={`${info.key === view ? 'active' : ''} item`}
                      onClick={this.handleViewChangeClick(info.key)}
                    >
                      {info.name}
                    </a>
                  ),
                  this.viewInfos,
                )}
              </div>
              {viewInfoData &&
                <div className="flex-grow" style={{ overflowY: 'hidden' }}>
                  {React.createElement(viewInfo.component, {
                    data: viewInfoData,
                    projectName,
                    selectLogPattern,
                    selectLogPatternSequence,
                    loadLogEventList,
                    loadLogSequenceEventList,
                    currentLoadingComponents,
                    ...get(viewsState, view, {}),
                    startTimeMillis: moment(incidentInfo.incidentStartTime).valueOf(),
                    endTimeMillis: moment(incidentInfo.incidentEndTime).valueOf(),
                  })}
                </div>}
            </Container>
          </Container>}
      </Container>
    );
  }
}

const LogAnalysis = injectIntl(LogAnalysisCore);
export default connect(
  (state: State) => {
    const { projects, currentLoadingComponents } = state.app;
    const {
      incidentList,
      incidentListParams,
      incident,
      incidentParams,
      currentError,
      eventList,
      viewsState,
    } = state.log;
    return {
      projects: R.filter(p => p.isLog, projects),
      incidentList,
      incidentListParams,
      incident,
      incidentParams,
      currentError,
      eventList,
      viewsState,
      currentLoadingComponents,
    };
  },
  {
    push,
    loadLogIncidentList,
    loadLogIncident,
    selectLogPattern,
    selectLogPatternSequence,
    loadLogEventList,
    loadLogSequenceEventList,
    rerunLogDetection,
  },
)(LogAnalysis);
