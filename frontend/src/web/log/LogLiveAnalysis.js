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
import { parseQueryString } from '../../common/utils';
import { loadLogStreaming } from '../../common/log/actions';
import { Selectors } from '../app/components';
import './log.scss';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  intl: Object,
  match: Object,
  location: Object,
  loadLogStreaming: Function,
};

class LogLiveAnalysisCore extends React.PureComponent {
  props: Props;

  componentDidMount() {
    const { match, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectId, incidentId } = match.params;
    this.props.loadLogStreaming(projectId, incidentId, match, params, true);
  }

  @autobind
  handleProjectChange(newValue) {
    const { match, location } = this.props;
    const params = parseQueryString(location.search);
    const projectId = newValue ? newValue.value : null;
    this.props.loadLogStreaming(projectId, null, match, params, true);
  }

  @autobind
  handleIncidentChange(newValue) {
    const { match, location } = this.props;
    const params = parseQueryString(location.search);
    const { projectId } = match.params;
    const incidentId = newValue ? newValue.value : null;
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleRareEventSensitivityChange(newValue) {
    const rareEventThreshold = newValue ? newValue.value : null;
    const { match, location } = this.props;
    const params = { ...parseQueryString(location.search), rareEventThreshold };
    const { projectId, incidentId } = match.params;
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleFrequencyAnomalySensitivity(newValue) {
    const derivedPvalue = newValue ? newValue.value : null;
    const { match, location } = this.props;
    const params = { ...parseQueryString(location.search), derivedPvalue };
    const { projectId, incidentId } = match.params;
    this.props.loadLogStreaming(projectId, incidentId, match, params, false);
  }

  @autobind
  handleIncidentClick(incidentId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, location } = this.props;
      const params = parseQueryString(location.search);
      const { projectId } = match.params;
      this.props.loadLogStreaming(projectId, incidentId, match, params, false);
    };
  }

  render() {
    const { intl, projects, streamingInfos, match, location } = this.props;
    const { projectId, incidentId } = match.params;
    const { derivedPvalue, rareEventThreshold } = parseQueryString(location.search);
    const project = get(streamingInfos, projectId, {});
    const incidentList = project.incidentList || [];
    const incident = R.find(i => i.id === incidentId, incidentList);
    console.log([incidentList, incident, derivedPvalue, rareEventThreshold, match]);

    return (
      <Container fullHeight withGutter className="flex-col log-live">
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.logAnalysis)}</span>
            <span className="divider">/</span>
            <Select
              name="project" inline style={{ width: 100 }}
              options={R.map(p => ({ label: p.name, value: p.name }), projects)}
              value={projectId} onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
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
                      <div className="label">Start Time</div>
                      <div>{moment(ic.incidentStartTime).format('YYYY/MM/DD mm:ss')}</div>
                      <div className="label">End Time</div>
                      <div>{moment(ic.incidentEndTime).format('YYYY/MM/DD mm:ss')}</div>
                      <div className="label">Model Type</div>
                      <div>{ic.modelType}</div>
                    </div>
                  </Box>
                </Tile>
              ))}
            </Tile>
          </Container>
        }
        {incident &&
          <Container>{incident.name}</Container>
        }
      </Container>
    );
  }
}

const LogLiveAnalysis = injectIntl(LogLiveAnalysisCore);
export default connect(
  (state: State) => {
    const { streamingInfos } = state.log;
    return {
      projects: R.filter(p => p.hasLogData, state.app.projects),
      streamingInfos,
    };
  },
  {
    push, loadLogStreaming,
  },
)(LogLiveAnalysis);
