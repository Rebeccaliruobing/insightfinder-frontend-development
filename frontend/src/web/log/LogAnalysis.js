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
import { loadLogStreamingList, loadLogStreamingIncident } from '../../common/log/actions';
import LogAnalysisCharts from '../../../components/log/loganalysis/LogAnalysisCharts';
import './log.scss';

type Props = {
  intl: Object,
  match: Object,
  location: Object,
  push: Function,
  projects: Array<Object>,
  streamingInfos: Array<Object>,
  streamingInfosParams: Object,
  streamingIncidentInfo: Object,
  streamingIncidentInfoParams: Object,
  streamingErrorMessage: ?Object,
  loadLogStreamingList: Function,
  loadLogStreamingIncident: Function,
};

const VIEW_CLUSTER = 'cluster';
const VIEW_RARE = 'rare';

class LogAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultView = VIEW_CLUSTER;
    this.pickNotNil = R.pickBy(a => !R.isNil(a));

    // General the monthy option list for one year.
    this.monthCount = 12;
    this.monthOptions = R.map((offset) => {
      const month = moment();
      month.add(-offset, 'month').startOf('month');
      return {
        label: month.format('MMM YYYY'),
        value: month.format('YYYY-MM'),
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
    const query = parseQueryString(location.search);
    let { projectName, month, incidentId, view } = query;
    let redirect = false;

    // If no project is selected, choose the first project if exists. The project might
    // be empty, which will be handled by epic.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    // If no month, set to current month
    month = month || moment().format('YYYY-MM');

    // Set default incident params, if not show incident, set to undefined to keep url clean.
    if (incidentId) {
      view = view || this.defaultView;
    } else {
      incidentId = undefined;
      view = undefined;
    }

    const newParams = {
      projectName,
      month,
      incidentId,
      view,
    };

    // Compare the new params with the origin params, if changed, redirect to new location.
    // We need to remove the undefined and null value before comparing.
    if (!R.equals(this.pickNotNil(newParams), this.pickNotNil(query))) {
      redirect = true;
      const url = buildMatchLocation(match, {}, newParams);
      push(url);
    }

    return redirect;
  }

  reloadData(props, force = false) {
    // If incidentId is not empty, which means load incident data.
    // Compare the current params with saved params, if it's different, dispatch action.
    const params = parseQueryString(get(props, 'location.search'));
    const { streamingInfosParams, streamingIncidentInfoParams } = props;
    const { projectName, month, incidentId, view } = params;

    // IMPORTANT: Need to check the new params with last params, otherwise it will
    // cause infinite loop.
    if (force || !R.equals({ projectName, month }, streamingInfosParams)) {
      console.log('list', props, force, streamingInfosParams);
      this.props.loadLogStreamingList(projectName, month);
    }

    if (
      incidentId &&
      (force || !R.equals({ projectName, incidentId, view }, streamingIncidentInfoParams))
    ) {
      console.log('incident', props, force, streamingInfosParams);
      this.props.loadLogStreamingIncident(projectName, incidentId, view);
    }
  }

  @autobind handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { month } = params;

    // When project changed, remove incident related params.
    const incidentId = undefined;
    const view = undefined;

    push(buildMatchLocation(match, {}, { projectName, month, incidentId, view }));
  }

  @autobind handleMonthChange(newValue) {
    const month = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectName } = params;

    // When month changed, remove incident related params.
    const incidentId = undefined;
    const view = undefined;

    push(buildMatchLocation(match, {}, { projectName, month, incidentId, view }));
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

  @autobind handleRefreshClick() {
    this.reloadData(this.props, true);
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

  render() {
    const {
      intl,
      match,
      location,
      projects,
      streamingInfos,
      streamingIncidentInfo,
      streamingErrorMessage,
    } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, month, incidentId, view } = params;
    const showIncident = !!incidentId && streamingIncidentInfo;

    // Select renderer to generate link to month.
    const monthValueRender = (option) => {
      const url = buildMatchLocation(match, {}, { projectName, month: option.value });
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
              streamingInfos.length > 0 &&
              <Select
                name="incident"
                inline
                style={{ width: 140 }}
                options={R.map(i => ({ label: i.name, value: i.id }), streamingInfos)}
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
        {streamingErrorMessage &&
          <Container fullHeight>
            <div
              className="ui error message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(streamingErrorMessage, { projectName }),
              }}
            />
          </Container>}
        {!streamingErrorMessage &&
          !showIncident &&
          streamingInfos.length === 0 &&
          <Container fullHeight>
            <div
              className="ui warning message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: 'No log entries found, please select other month to view.',
              }}
            />
          </Container>}
        {!streamingErrorMessage &&
          !showIncident &&
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
                    <div className="actions">
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
        {!streamingErrorMessage &&
          showIncident &&
          <Container className="flex-grow flex-col">
            <Container className="boxed flex-grow">
              <div>fds</div>
            </Container>
          </Container>}
      </Container>
    );
  }
}

const LogAnalysis = injectIntl(LogAnalysisCore);
export default connect(
  (state: State) => {
    const {
      streamingInfos,
      streamingInfosParams,
      streamingIncidentInfo,
      streamingIncidentInfoParams,
      streamingErrorMessage,
    } = state.log;
    return {
      projects: R.filter(p => p.isLogStreaming, state.app.projects),
      streamingInfos,
      streamingInfosParams,
      streamingIncidentInfo,
      streamingIncidentInfoParams,
      streamingErrorMessage,
    };
  },
  { push, loadLogStreamingList, loadLogStreamingIncident },
)(LogAnalysis);
