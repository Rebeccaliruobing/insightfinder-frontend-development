import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import R from 'ramda';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import { push } from 'react-router-redux';
import { Container, Select, Tile, Box } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import { State } from '../../common/types';
import { parseQueryString, buildMatchLocation } from '../../common/utils';
import { loadLogStreaming } from '../../common/log/actions';
import { Selectors } from '../app/components';
import LogAnalysisCharts from '../../../components/log/loganalysis/LogAnalysisCharts';
import './log.scss';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  streamingIncidentInfos: Object,
  intl: Object,
  match: Object,
  location: Object,
  loadLogStreaming: Function,
};

class LogLiveAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.defaultParams = {
      rareEventThreshold: '3',
      derivedPvalue: '0.9',
    };
  }

  componentDidMount() {
    const { match, location } = this.props;
    let params = parseQueryString(location.search);
    const { projectId, incidentId } = match.params;
    if (incidentId) {
      params = { ...this.defaultParams, ...params };
    }
    this.props.loadLogStreaming(projectId, incidentId, match, params, true);
  }

  @autobind
  handleProjectChange(newValue) {
    const { match } = this.props;
    const projectId = newValue ? newValue.value : null;
    this.props.loadLogStreaming(projectId, null, match, null, true);
  }

  @autobind
  handleIncidentChange(newValue) {
    const { match, location } = this.props;
    let params = parseQueryString(location.search);
    const { projectId } = match.params;
    const incidentId = newValue ? newValue.value : null;
    if (incidentId) {
      params = { ...this.defaultParams, ...params };
    } else {
      params = null;
    }
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleRareEventSensitivityChange(newValue) {
    const rareEventThreshold = newValue ? newValue.value : null;
    const { match, location } = this.props;
    const params = {
      ...this.defaultParams,
      ...parseQueryString(location.search), rareEventThreshold,
    };
    const { projectId, incidentId } = match.params;
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleFrequencyAnomalySensitivity(newValue) {
    const derivedPvalue = newValue ? newValue.value : null;
    const { match, location } = this.props;
    const params = { ...this.defaultParams, ...parseQueryString(location.search), derivedPvalue };
    const { projectId, incidentId } = match.params;
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleIncidentClick(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, location } = this.props;
      const params = { ...this.defaultParams, ...parseQueryString(location.search) };
      const { projectId } = match.params;
      this.props.loadLogStreaming(projectId, incidentId, match, params, false);
    };
  }

  render() {
    const { intl, projects, streamingInfos, match, location, streamingIncidentInfos } = this.props;
    const { projectId, incidentId } = match.params;
    const { derivedPvalue, rareEventThreshold } = parseQueryString(location.search) || {};
    const project = get(streamingInfos, projectId, {});
    const incidentList = project.incidentList || [];
    const incident = get(streamingIncidentInfos, incidentId, null);

    const projectValueRenderer = (option) => {
      const url = buildMatchLocation(match, {
        projectId: option.value,
        incidentId: null,
      });
      return (
        <Select.Link to={url} className="label">{option.label}</Select.Link>
      );
    };

    return (
      <Container fullHeight withGutter className="flex-col log-live">
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.logAnalysis)}</span>
            <span className="divider">/</span>
            <Select
              name="project" inline style={{ width: 120 }}
              options={R.map(p => ({ label: p.name, value: p.name }), projects)}
              value={projectId} onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
              {...incident ? { valueRenderer: projectValueRenderer } : {}}
            />
            {incident && <span className="divider">/</span>}
            {incident &&
              <Select
                name="incident" inline clearable style={{ width: 248 }}
                options={R.map(i => ({ label: i.name, value: i.id }), incidentList)}
                value={incidentId || null} onChange={this.handleIncidentChange}
              />
            }
          </div>
          <div className="section float-right">
            {incident && <span className="label">Rare Event Detection Sensitivity</span>}
            {incident &&
              <Selectors.RareEventSensitivity
                value={rareEventThreshold || 3} onChange={this.handleRareEventSensitivityChange}
              />
            }
            {incident && <span className="label">Frequency Anomaly Detection Sensitivity</span>}
            {incident &&
              <Selectors.AnomalyThresholdSensitivity
                value={derivedPvalue || 0.9} onChange={this.handleFrequencyAnomalySensitivity}
              />
            }
          </div>
        </Container>
        {!incident &&
          <Container fullHeight className="overflow-y-auto">
            <Tile isParent isFluid style={{ paddingLeft: 0, paddingRight: 0 }}>
              {incidentList.map(ic => (
                <Tile
                  key={`${projectId}-${ic.id}`} className="incident-tile"
                  onClick={this.handleIncidentClick(ic.id)}
                >
                  <Box isLink>
                    <div className="content">
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>Start Time:</div>
                        <div style={{ float: 'right' }}>{moment(ic.incidentStartTime).format('YYYY/MM/DD hh:mm')}</div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>End Time:</div>
                        <div style={{ float: 'right' }}>{moment(ic.incidentEndTime).format('YYYY/MM/DD hh:mm')}</div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>Clusters:</div>
                        <div style={{ float: 'right' }}></div>
                      </div>
                      <div>
                        <div className="label" style={{ display: 'inline-block' }}>Rare Events:</div>
                        <div style={{ float: 'right' }}></div>
                      </div>
                    </div>
                  </Box>
                </Tile>
              ))}
            </Tile>
          </Container>
        }
        {incident &&
          <Container><LogAnalysisCharts data={incident} /></Container>
        }
      </Container>
    );
  }
}

const LogLiveAnalysis = injectIntl(LogLiveAnalysisCore);
export default connect(
  (state: State) => {
    const { streamingInfos, streamingIncidentInfos } = state.log;
    return {
      projects: R.filter(p => p.hasLogData, state.app.projects),
      streamingInfos,
      streamingIncidentInfos,
    };
  },
  {
    push, loadLogStreaming,
  },
)(LogLiveAnalysis);
