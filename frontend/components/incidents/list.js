import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import { Button } from '../../artui/react';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import { getEventType, createEventShape, calculateRGBByAnomaly } from '../utils';
import TakeActionModal from './takeActionModal';
import SysCallModal from './sysCallModal';
import apis from '../../apis';
import './incident.less';
import thumbupImg from '../../images/green-thumbup.png';

class IncidentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: props.incidents,
      causalDataArray: props.causalDataArray,
      causalTypes: props.causalTypes,
      latestTimestamp: props.latestTimestamp,
      numberOfDays: props.numberOfDays,
      endTime: props.endTime,
      modelType: props.modelType,
      projectName: props.projectName,
      projectType: props.projectType,
      predictionWindow: props.predictionWindow,
      shownMergedIncidentIds: [],
      showTenderModal: false,
      showTakeActionModal: false,
      showSysCall: false,
      debugData: undefined,
      timeRanking: undefined,
      freqRanking: undefined,
      startTimestamp: undefined,
      endTimestamp: undefined,
      activeIncident: undefined,
      actionTime: moment(),
      angleIconStyleSelect: 'angleIconStyleId',
      angleIconStyle: {
        angleIconStyleId: 'down',
        angleIconStyleSeverity: '',
        angleIconStyleEvent: '',
        angleIconStyleStartTime: '',
        angleIconStyleDuration: '',
      },
      tabStates: {
        predicted: '',
        detected: 'active',
      },
    };
  }

  componentDidMount() {
    this.setIncidentsList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
  }

  @autobind
  handleLoadSysCall(activeIncident) {
    // Return funtion as the click event handler
    return () => {
      const { projectName } = this.state;
      const self = this;
      if (activeIncident) {
        const startTimestamp = activeIncident.startTimestamp;
        const endTimestamp = activeIncident.endTimestamp;
        apis.postSysCallResult(projectName, startTimestamp, endTimestamp).then((resp) => {
          if (resp.success) {
            self.setState({
              debugData: resp.data.syscallResults,
              timeRanking: resp.data.freqFunctionList,
              freqRanking: resp.data.timeFunctionList,
              showSysCall: true,
            });
          } else {
            alert(resp.message);
          }
        });
      } else {
        alert('Cannot find incident to retrieve syscall data for.');
      }
    };
  }

  @autobind
  handleIncidentSelected(incident, tab) {
    this.props.onIncidentSelected(incident, tab);
    let incidentState = { activeIncident: incident };
    this.setState(incidentState);
  }

  handleLinkToAgentWiki() {
    const url = 'https://github.com/insightfinder/InsightAgent/wiki';
    window.open(url, '_blank');
  }

  setIncidentsList(props) {
    let anomalyRatioLists = props.incidents.map(function (value, index) {
      return value['anomalyRatio']
    });
    let stateIncidents = {
      numberOfDays: props.numberOfDays,
      endTime: props.endTime,
      modelType: props.modelType,
      projectName: props.projectName,
      projectType: props.projectType,
      incidents: props.incidents,
      maxAnomalyRatio: _.max(anomalyRatioLists),
      minAnomalyRatio: _.min(anomalyRatioLists),
      causalDataArray: props.causalDataArray,
      causalTypes: props.causalTypes,
      latestTimestamp: props.latestTimestamp,
      predictionWindow: props.predictionWindow,
      showTenderModal: false,
      showTakeActionModal: false,
      startTimestamp: undefined,
      endTimestamp: undefined,
      actionTime: +moment(),
    };
    this.setState(stateIncidents);
  }

  selectTab(e, tab, incidents) {
    const angleIconStyleSelect = 'angleIconStyleId';
    const angleIconStyle = {
      angleIconStyleId: 'down',
      angleIconStyleSeverity: '',
      angleIconStyleEvent: '',
      angleIconStyleStartTime: '',
      angleIconStyleDuration: '',
    };
    let tabStates = this.state.tabStates;
    tabStates = _.mapValues(tabStates, () => '');
    tabStates[tab] = 'active';
    this.setState({
      tabStates, angleIconStyleSelect, angleIconStyle,
    });
    let firstIncident = undefined;
    if (incidents && incidents.length > 0) {
      firstIncident = _.orderBy(incidents, '[id]', 'desc')[0];
    }
    this.handleIncidentSelected(firstIncident, tab);
  }

  changeAngleStyle(angleIconStyleSelect) {
    let { angleIconStyle } = this.state;
    const selectStyle = angleIconStyle[angleIconStyleSelect];

    // Show only one up/down
    angleIconStyle = _.mapValues(angleIconStyle, () => '');
    angleIconStyle[angleIconStyleSelect] = selectStyle === 'up' ? 'down' : 'up';
    this.setState({ angleIconStyle, angleIconStyleSelect });
  }

  @autobind
  renderEventSeverity(incident) {
    const { maxAnomalyRatio, minAnomalyRatio } = this.state;
    const color = calculateRGBByAnomaly(
      incident.anomalyRatio, maxAnomalyRatio, minAnomalyRatio,
      incident.numberOfAnomalies);

    let eventTypes = incident.rootCauseJson.rootCauseTypes.split('\n');
    eventTypes = _.filter(eventTypes, s => s && s.trim() !== '');
    eventTypes = _.map(eventTypes, s => getEventType(s));
    // TODO: Need to keep multiple others type?
    eventTypes = _.uniq(eventTypes);

    return (
      <svg width={70} height={26}>
        {eventTypes.map((event, index) => createEventShape(event, index, color))}
      </svg>
    );
  }

  @autobind
  getIncidentOrderParams() {
    const { angleIconStyle, angleIconStyleSelect } = this.state;
    const order = angleIconStyle[angleIconStyleSelect] === 'up' ? 'asc' : 'desc';

    let iteratees = [i => i.rootCauseJson.rootCauseTypes];

    if (angleIconStyleSelect === 'angleIconStyleId') {
      iteratees = ['id'];
    }
    if (angleIconStyleSelect === 'angleIconStyleSeverity') {
      iteratees = ['anomalyRatio'];
    }
    if (angleIconStyleSelect === 'angleIconStyleStartTime') {
      iteratees = ['startTimestamp'];
    }
    if (angleIconStyleSelect === 'angleIconStyleDuration') {
      iteratees = ['duration'];
    }

    return { order, iteratees };
  }

  @autobind
  renderTableHead() {
    const { angleIconStyle } = this.state;
    return (
      <thead style={{ display: 'block', width: '100%' }}>
        <tr style={{ display: 'inline-table', width: '100%' }}>
          <th onClick={() => this.changeAngleStyle('angleIconStyleId')}>Id
            <i className={`angle ${angleIconStyle.angleIconStyleId} icon`} />
          </th>
          <th onClick={() => this.changeAngleStyle('angleIconStyleSeverity')}>Severity
            <i className={`angle ${angleIconStyle.angleIconStyleSeverity} icon`} />
          </th>
          <th onClick={() => this.changeAngleStyle('angleIconStyleStartTime')}>Start Time
            <i className={`angle ${angleIconStyle.angleIconStyleStartTime} icon`} />
          </th>
          <th onClick={() => this.changeAngleStyle('angleIconStyleDuration')}>Duration
            <i className={`angle ${angleIconStyle.angleIconStyleDuration} icon`} />
          </th>
          <th onClick={() => this.changeAngleStyle('angleIconStyleEvent')}>Event Type
            <i className={`angle ${angleIconStyle.angleIconStyleEvent} icon`} />
          </th>
          <th>Control</th>
        </tr>
      </thead>
    );
  }

  @autobind
  toggleMergedIncidents(incident) {
    return (e) => {
      e.stopPropagation();
      const { shownMergedIncidentIds } = this.state;
      let ids;
      // If any merged id exists in shownMergedIncidentIds, we need to hidden incidents.
      if (incident._mergedIds && incident._mergedIds.length > 0) {
        if (_.indexOf(shownMergedIncidentIds, incident._mergedIds[0]) >= 0) {
          ids = _.without(shownMergedIncidentIds, ...incident._mergedIds);
        } else {
          ids = _.concat(shownMergedIncidentIds, incident._mergedIds);
        }

        this.setState({
          shownMergedIncidentIds: ids,
        });
      }
    };
  }

  @autobind
  renderTableBody(incidents, type) {
    // The type should be 'detected' or 'predicted'.
    // TODO: predicted needs to add syscall button?
    const self = this;
    const { projectType, shownMergedIncidentIds, angleIconStyleSelect } = this.state;
    const sysCallEnabled = (projectType.toLowerCase() === 'custom');
    const needMerge = angleIconStyleSelect === 'angleIconStyleId';
    // Get the order params and sort incidents
    const { order, iteratees } = this.getIncidentOrderParams();
    // The incidents is order by id by default, so we can add the merge flags
    // before sorting.
    if (needMerge) {
      let mainIncident = null;
      _.forEach(incidents, (incident) => {
        incident._mergedIds = [];
        incident._mergedDuration = (incident.anomalyRatio === 0 ? 0 : incident.duration);
        if (!mainIncident) {
          mainIncident = incident;
        } else if (_.isEqual(mainIncident.rootCauseByInstanceJson,
          incident.rootCauseByInstanceJson) && incident.repeatedEventFlag) {
          // If root cause (instance, event type) are same, and has repeatedEventFlag,
          // we need to merge it.
          incident._mergable = true;
          mainIncident._mergedIds.push(incident.id);
          mainIncident._lastMergedId = incident.id;
          mainIncident._mergedDuration += (incident.anomalyRatio === 0 ? 0 : incident.duration);
        } else {
          mainIncident = incident;
        }
      });
    }

    incidents = _.orderBy(incidents, iteratees, order);

    return (
      <tbody style={{ width: '100%', height: 480, overflow: 'auto', display: 'block' }}>
        {incidents.map((incident) => {
          // Display the anomaly string in title.
          let anomalyRatioString = '';
          if (incident.anomalyRatio > 0) {
            anomalyRatioString =
              `Event Anomaly Score: ${Math.round(incident.anomalyRatio * 10) / 10}\n`;
          }
          const hidden = needMerge && incident._mergable &&
            _.indexOf(shownMergedIncidentIds, incident.id) < 0;
          const mergedShown = needMerge && incident._mergedIds.length > 0 &&
            _.indexOf(shownMergedIncidentIds, incident._mergedIds[0]) >= 0;
          const mergedArrow = mergedShown ? (order === 'asc' ? 'down' : 'up') : 'right';

          return (
            <tr
              style={{ display: hidden ? 'none' : 'inline-table', width: '100%' }} key={incident.id}
              onClick={() => this.handleIncidentSelected(incident, type)}
              className={cx({ active: incident === self.state.activeIncident })}
              title={`${anomalyRatioString}Event details: \n ${incident.rootCauseJson.rootCauseDetails}`}
            >
              <td>
                {needMerge && incident._lastMergedId && !mergedShown ? `${incident.id}-${incident._lastMergedId}` : incident.id}
                {needMerge && incident._lastMergedId && <i
                  onClick={self.toggleMergedIncidents(incident)}
                  style={{ cursor: 'pointer' }} className={`icon angle ${mergedArrow}`}
                />}
              </td>
              <td>{this.renderEventSeverity(incident)}</td>
              <td className="code">{moment(incident.startTimestamp).format('MM-DD HH:mm')}</td>
              <td>
                {!mergedShown && `${incident._mergedDuration} min`}
                {mergedShown && (incident.anomalyRatio === 0 ? 'N/A' : `${incident.duration} min`)}
              </td>
              <td className="code">{incident.rootCauseJson.rootCauseTypes}
                {sysCallEnabled && incident.syscallFlag &&
                  <i className="zoom icon" onClick={this.handleLoadSysCall(incident)} />}
              </td>
              <td>{
                incident.anomalyRatio === 0 ?
                  'N/A' :
                  <Button
                    className="blue" onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        activeIncident: incident,
                        showTakeActionModal: true,
                        actionTime: moment(),
                      });
                    }}
                    style={{ paddingLeft: 2, paddingRight: 2 }}
                  >Action</Button>}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { incidents, latestTimestamp, predictionWindow, tabStates, projectName } = this.state;

    const detectedIncidents = incidents.filter(
      incident => incident.startTimestamp <= latestTimestamp);
    const predictedIncidents = incidents.filter(
      incident => incident.endTimestamp > latestTimestamp);

    return (
      <div>
        <div className="row" style={{ marginBottom: 10, position: 'relative' }}>
          <Button
            className="orange"
            style={{ position: 'absolute', left: 350, top: 5 }} title="Causal Graph"
            onClick={(e) => {
              e.stopPropagation();
              this.setState({
                showTenderModal: true,
                startTimestamp: undefined,
                endTimestamp: undefined,
              });
            }}
          >Causal Graph</Button>
          <div className="ui pointing secondary menu">
            <a
              className={`${tabStates.detected} item`}
              onClick={e => this.selectTab(e, 'detected', detectedIncidents)}
            >Detected Events</a>
            <a
              className={`${tabStates.predicted} item`}
              onClick={e => this.selectTab(e, 'predicted', predictedIncidents)}
            >Predicted Events ({predictionWindow} Hr)</a>
          </div>
        </div>
        <div className={`${tabStates.predicted} ui tab`}>
          {(predictedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              {this.renderTableHead()}
              {this.renderTableBody(predictedIncidents, 'predicted')}
            </table>
            :
            <h5><img alt="normal" height="40px" src={thumbupImg} />Congratulations! Everything is normal in prediction.</h5>
          }
        </div>
        <div className={`${tabStates.detected} ui tab`}>
          {(detectedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              {this.renderTableHead()}
              {this.renderTableBody(detectedIncidents, 'detected')}
            </table>
            :
            <h5><img alt="normal" height="40px" src={thumbupImg} />Congratulations! Everything is normal.</h5>
          }
        </div>
        {this.state.showTenderModal &&
          <TenderModal
            dataArray={this.state.causalDataArray} types={this.state.causalTypes}
            endTimestamp={this.state.endTimestamp}
            startTimestamp={this.state.startTimestamp}
            onClose={() => this.setState({ showTenderModal: false })}
          />
        }
        {this.state.showTakeActionModal &&
          <TakeActionModal
            incident={this.state.activeIncident}
            projectName={this.state.projectName}
            actionTime={this.state.actionTime}
            onClose={() => this.setState({ showTakeActionModal: false })}
          />
        }
        {this.state.showSysCall &&
          <SysCallModal
            timeRanking={this.state.timeRanking} freqRanking={this.state.freqRanking}
            dataArray={this.state.debugData}
            onClose={() => this.setState({ showSysCall: false })}
          />
        }
      </div>
    );
  }
}

export default IncidentsList;
