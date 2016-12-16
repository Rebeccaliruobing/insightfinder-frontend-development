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
      angleIconStyleSelect: 'angleIconStyleStartTime',
      angleIconStyle: {
        angleIconStyleId: '',
        angleIconStyleSeverity: '',
        angleIconStyleEvent: 'down',
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
      showTenderModal: false,
      showTakeActionModal: false,
      startTimestamp: undefined,
      endTimestamp: undefined,
      actionTime: +moment(),
    };
    this.setState(stateIncidents);
  }

  selectTab(e, tab, incidents) {
    const angleIconStyleSelect = 'angleIconStyleStartTime';
    const angleIconStyle = {
      angleIconStyleId: '',
      angleIconStyleSeverity: '',
      angleIconStyleEvent: 'down',
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
      firstIncident = incidents[0];
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
  renderTableBody(incidents, type) {
    // The type should be 'detected' or 'predicted'.
    // TODO: predicted needs to add syscall button?
    const { projectType } = this.state;
    const sysCallEnabled = (projectType.toLowerCase() === 'custom');
    const self = this;

    return (
      <tbody style={{ width: '100%', height: 445, overflow: 'auto', display: 'block' }}>
        {incidents.map((incident, index) => {
          // Display the anomaly string in title.
          let anomalyRatioString = '';
          if (incident.anomalyRatio > 0) {
            anomalyRatioString =
              `Event Anomaly Score: ${Math.round(incident.anomalyRatio * 10) / 10}\n`;
          }

          return (
            <tr
              style={{ display: 'inline-table', width: '100%' }} key={index}
              onClick={() => this.handleIncidentSelected(incident, type)}
              className={cx({ active: incident === self.state.activeIncident })}
              title={`${anomalyRatioString}Event details: \n ${incident.rootCauseJson.rootCauseDetails}`}
            >
              <td>{incident.id}</td>
              <td>{this.renderEventSeverity(incident)}</td>
              <td className="code">{moment(incident.startTimestamp).format('MM-DD HH:mm')}</td>
              <td>{incident.anomalyRatio === 0 ? 'N/A' : `${incident.duration} min`}</td>
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
    const { incidents, latestTimestamp, tabStates } = this.state;

    // Get the order params and sort incidents
    const { order, iteratees } = this.getIncidentOrderParams();
    let detectedIncidents = incidents.filter(
      incident => incident.startTimestamp <= latestTimestamp);
    detectedIncidents = _.orderBy(detectedIncidents, iteratees, order);

    let predictedIncidents = incidents.filter(
      incident => incident.endTimestamp > latestTimestamp);
    predictedIncidents = _.orderBy(predictedIncidents, iteratees, order);

    return (
      <div>
        <div className="row" style={{ marginBottom: 10, position: 'relative' }}>
          <Button
            className="orange"
            style={{ position: 'absolute', right: 0, top: 5 }} title="Causal Graph"
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
            >Predicted Events</a>
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
