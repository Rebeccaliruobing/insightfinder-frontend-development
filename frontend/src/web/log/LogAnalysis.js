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

import { State } from '../../common/types';
import { parseQueryString, buildMatchLocation, buildUrl } from '../../common/utils';
import { Container, Select, Tile, Box } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import { loadLogStreamingList, loadLogStreamingIncident } from '../../common/log/actions';
import { Selectors } from '../app/components';
import LogAnalysisCharts from '../../../components/log/loganalysis/LogAnalysisCharts';
import './log.scss';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  streamingIncidentInfos: Object,
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  currentErrorMessage: ?Object,
  loadLogStreamingList: Function,
  loadLogStreamingIncident: Function,
};

class LogAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultParams = {
      rareEventThreshold: '3',
      derivedPvalue: '0.9',
    };
    this.monthCount = 12;
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
    let { projectName, month, incidentId, rareEventThreshold, derivedPvalue } = query;
    let redirect = false;

    // If no project is selected, choose the first project if exists. The project might
    // be empty, which will be handled by API epic.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    // If no mont, set to this month
    if (!month) {
      month = moment().format('YYYY-MM');
    }

    // Set default params for incident query. If it's not for incident, reset all.
    if (incidentId) {
      rareEventThreshold = rareEventThreshold || this.defaultParams.rareEventThreshold;
      derivedPvalue = derivedPvalue || this.defaultParams.derivedPvalue;
    } else {
      incidentId = undefined;
      rareEventThreshold = undefined;
      derivedPvalue = undefined;
    }

    // If any parts is different, we need redirect to the now location.
    if (
      projectName !== query.projectName ||
      month !== query.month ||
      incidentId !== query.incidentId ||
      rareEventThreshold !== query.rareEventThreshold ||
      derivedPvalue !== query.derivedPvalue
    ) {
      redirect = true;
      const url = buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      );
      push(url);
    }

    return redirect;
  }

  reloadData(props, prevProps) {
    // Check params changes and reload the data based on the params.
    const params = parseQueryString(get(props, 'location.search'));
    const prevParam = parseQueryString(get(prevProps, 'location.search'));
    const { projectName, month, incidentId, rareEventThreshold, derivedPvalue } = params;

    // If no incidentId, load all incidents for the project and month, otherwise
    // load the incident data.
    if (!incidentId) {
      if (projectName !== prevParam.projectName || month !== prevParam.month) {
        this.props.loadLogStreamingList(projectName, month);
      }
    } else if (
      projectName !== prevParam.projectName ||
      month !== prevParam.month ||
      incidentId !== prevParam.incidentId ||
      rareEventThreshold !== prevParam.rareEventThreshold ||
      derivedPvalue !== prevParam.derivedPvalue
    ) {
      this.props.loadLogStreamingIncident(
        projectName,
        month,
        incidentId,
        rareEventThreshold,
        derivedPvalue,
      );
    }
  }

  @autobind handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { month } = params;

    // When project changed, reset incident related params.
    const incidentId = undefined;
    const rareEventThreshold = undefined;
    const derivedPvalue = undefined;

    push(
      buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      ),
    );
  }

  @autobind handleMonthChange(newValue) {
    const month = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName } = params;

    // When month changed, reset incident related params.
    const incidentId = undefined;
    const rareEventThreshold = undefined;
    const derivedPvalue = undefined;

    push(
      buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      ),
    );
  }

  @autobind handleIncidentChange(newValue) {
    const incidentId = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, rareEventThreshold, derivedPvalue } = params;
    push(
      buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      ),
    );
  }

  @autobind handleRareEventSensitivityChange(newValue) {
    const rareEventThreshold = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, incidentId, derivedPvalue } = params;
    push(
      buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      ),
    );
  }

  @autobind handleFrequencyAnomalySensitivity(newValue) {
    const derivedPvalue = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, incidentId, rareEventThreshold } = params;
    push(
      buildMatchLocation(
        match,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      ),
    );
  }

  @autobind handleRefreshClick() {
    this.reloadData(this.props);
  }

  @autobind handleIncidentClick(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, push, location } = this.props;
      const params = parseQueryString(location.search);
      const { projectName, month, rareEventThreshold, derivedPvalue } = params;
      push(
        buildMatchLocation(
          match,
          {},
          { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
        ),
      );
    };
  }

  @autobind handleIncidentOpen(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, location } = this.props;
      const params = parseQueryString(location.search);
      const { projectName, month, rareEventThreshold, derivedPvalue } = params;
      const url = buildUrl(
        match.path,
        {},
        { projectName, month, incidentId, rareEventThreshold, derivedPvalue },
      );
      window.open(url, '_blank');
    };
  }

  render() {
    const {
      intl,
      projects,
      streamingInfos,
      match,
      location,
      currentErrorMessage,
      streamingIncidentInfos,
    } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, incidentId, rareEventThreshold, derivedPvalue } = params;
    const incident = get(streamingIncidentInfos, incidentId, null);
    console.log('render', projectName);

    // General the monthy option list for one year.
    const monthOptions = R.map((offset) => {
      const month = moment();
      month.add(-offset, 'month').startOf('month');
      return {
        label: month.format('MMM YYYY'),
        value: month.format('YYYY-MM'),
      };
    }, R.range(0, this.monthCount));

    const projectValueRenderer = (option) => {
      const url = buildMatchLocation(match, {}, { projectName: option.value });
      return <Select.Link to={url} className="label">{option.label}</Select.Link>;
    };

    return (
      <Container fullHeight withGutter className="flex-col log-live">
        <Container breadcrumb>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.streamLogAnalysis)}</span>
            <span className="divider">/</span>
            <Select
              name="project"
              inline
              style={{ width: 200 }}
              options={R.map(p => ({ label: p.projectName, value: p.projectName }), projects)}
              value={projectName}
              onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
              {...(incident ? { valueRenderer: projectValueRenderer } : {})}
            />
            <span className="divider">/</span>
            <Select
              name="month"
              inline
              style={{ width: 140 }}
              options={monthOptions}
              value={month}
              onChange={this.handleMonthChange}
            />
            {incident && <span className="divider">/</span>}
            {incident &&
              <Select
                name="incident"
                inline
                clearable
                style={{ width: 248 }}
                placeholder="Select Month"
                options={R.map(i => ({ label: i.name, value: i.id }), streamingInfos)}
                value={incidentId || null}
                onChange={this.handleIncidentChange}
              />}
          </div>
          <div className="section float-right">
            {incident &&
              <span className="label" style={{ fontSize: 12 }}>
                Rare Event Detection Sensitivity
              </span>}
            {incident &&
              <Selectors.RareEventSensitivity
                value={rareEventThreshold || 3}
                onChange={this.handleRareEventSensitivityChange}
              />}
            {incident &&
              <span className="label" style={{ fontSize: 12 }}>
                Frequency Anomaly Detection Sensitivity
              </span>}
            {incident &&
              <Selectors.AnomalyThresholdSensitivity
                value={derivedPvalue || 0.9}
                onChange={this.handleFrequencyAnomalySensitivity}
              />}
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              Refresh
            </div>
          </div>
        </Container>
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
          streamingInfos.length > 0 &&
          <Container fullHeight className="overflow-y-auto">
            <Tile isParent isFluid style={{ paddingLeft: 0, paddingRight: 0 }}>
              {streamingInfos.map(ic => (
                <Tile
                  key={`${projectName}-${ic.id}`}
                  className="incident-tile"
                  onClick={this.handleIncidentClick(ic.id)}
                >
                  <Box isLink>
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
                        <div className="label" style={{ display: 'inline-block' }}>Clusters:</div>
                        <div style={{ float: 'right' }}>{(ic.cluster || []).length}</div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>
                          Rare Events:
                        </div>
                        <div style={{ float: 'right' }}>{ic.rareEventsSize}</div>
                      </div>
                    </div>
                  </Box>
                </Tile>
              ))}
            </Tile>
          </Container>}
        {!currentErrorMessage &&
          incident &&
          <Container className="log-charts"><LogAnalysisCharts data={incident} /></Container>}
      </Container>
    );
  }
}

const LogAnalysis = injectIntl(LogAnalysisCore);
export default connect(
  (state: State) => {
    const { streamingInfos, streamingIncidentInfos, currentErrorMessage } = state.log;
    return {
      projects: R.filter(p => p.isLogStreaming, state.app.projects),
      streamingInfos,
      streamingIncidentInfos,
      currentErrorMessage,
    };
  },
  { push, loadLogStreamingList, loadLogStreamingIncident },
)(LogAnalysis);
