/* eslint-disable class-methods-use-this */
import React, { PropTypes as T } from 'react';
import moment from 'moment';
import _ from 'lodash';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { Button } from '../../artui/react';
import { EventTypes, getEventType, createEventShape, calculateRGBByAnomaly } from '../utils';
import TakeActionModal from './takeActionModal';
import SysCallModal from './sysCallModal';
import CausalGraphModal from './causalGraphModal';
import apis from '../../apis';
import './incident.less';
import thumbupImg from '../../images/green-thumbup.png';
import WindowResizeListener from '../ui/window-resize-listener';

const defaultSortColumn = 'id';
const defaultSortDirection = 'desc';
const columeStyles = {
  id: { width: '10%', minWidth: 64 },
  anomalyRatio: { width: '15%', minWidth: 80 },
  startTimestamp: { width: '15%', minWidth: 80 },
  duration: { width: '15%', minWidth: 80, paddingRight: '1em', textAlign: 'right' },
  control: { width: 64, textAlign: 'center' },
};
const tableBodyOffsetHeight = 260;

class IncidentsList extends React.Component {
  static propTypes = {
    projectName: T.string,
    projectType: T.string,
    activeTab: T.oneOf(['detected', 'predicted']),
    onIncidentSelected: T.func.isRequired,
  }

  static defaultProps = {
    activeTab: 'detected',
  }

  constructor(props) {
    super(props);
    const state = this.resetLocalDataAndState({}, props);

    this.state = {
      tableBodyHeight: window.clientHeight - tableBodyOffsetHeight,
      ...state,
    };
  }

  componentDidMount() {
    // Raise the selected incident to parent component.
    const { activeTab, activeIncident } = this.state;
    this.props.onIncidentSelected(activeIncident, activeTab);
  }

  componentWillReceiveProps(nextProps) {
    const state = this.resetLocalDataAndState(this.props, nextProps);
    if (state) {
      this.setState(state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTab, activeIncident } = this.state;
    if (prevState.activeIncident !== activeIncident) {
      this.props.onIncidentSelected(activeIncident, activeTab);
    }
  }

  @autobind
  resetLocalDataAndState(prevProps, props) {
    const { incidents, activeTab, activeIncidentId } = props;
    let tab = activeTab;
    let state = null;

    if (prevProps.incidents !== incidents) {
      this.detectedIncidents = R.filter(i => !i.predictedFlag, incidents);
      this.predictedIncidents = R.filter(i => !!i.predictedFlag, incidents);

      const ratios = R.map(v => v.anomalyRatio, incidents);
      this.maxAnomalyRatio = R.reduce(R.max, 0, ratios);
      this.minAnomalyRatio = R.reduce(R.min, 0, ratios);

      // If we have active event id, try to find it and set the active tab.
      const finder = R.find(d => d.id.toString() === activeIncidentId);
      let incident = finder(this.detectedIncidents);
      if (incident) {
        tab = 'detected';
      } else {
        incident = finder(this.predictedIncidents);
        if (incident) tab = 'predicted';
      }

      // If not find the active event, select the first one
      if (!incident) {
        const ins = this.sortingIncidents(this.getIncidents(tab));
        if (ins.length > 0) {
          incident = ins[0];
        }
      }

      state = {
        shownMergedIncidentIdsByType: {
          predicted: [],
          detected: [],
        },
        activeTab: tab,
        activeIncident: incident,
        sortColumn: defaultSortColumn,
        sortDirection: defaultSortDirection,
        showCausalGraphModal: false,
        showTakeActionModal: false,
        showSysCall: false,
      };
    }

    return state;
  }

  @autobind
  handleLoadSysCall(activeIncident) {
    // Return funtion as the click event handler
    return () => {
      const { projectName } = this.props;
      const self = this;
      if (activeIncident) {
        const startTimestamp = activeIncident.startTimestamp;
        const endTimestamp = activeIncident.endTimestamp;
        apis.postSysCallResult(projectName, startTimestamp, endTimestamp).then((resp) => {
          if (resp.success) {
            self.setState({
              debugData: resp.data.syscallResults,
              freqRanking: resp.data.freqFunctionList,
              timeRanking: resp.data.timeFunctionList,
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

@autobind
  getIncidents(type) {
    return (type === 'detected' ?
      this.detectedIncidents : this.predictedIncidents) || [];
  }

  @autobind
  sortingIncidents(incidents, sortColumn = 'id', sortDirection = 'desc') {
    const direction = sortDirection === 'desc' ? R.descend : R.ascend;
    const sorter = (sortColumn === 'eventType') ?
      R.sortWith([direction(R.path(['rootCauseJson', 'rootCauseTypes']))]) :
      R.sortWith([direction(R.prop(sortColumn))]);

    return sorter(incidents);
  }

  @autobind
  selectTab(tab) {
    return () => {
      const sortColumn = defaultSortColumn;
      const sortDirection = defaultSortDirection;
      const incidents = this.sortingIncidents(
        this.getIncidents(tab), sortColumn, sortDirection,
      );
      const activeIncident = incidents.length > 0 ? incidents[0] : null;

      this.setState({
        activeTab: tab,
        sortColumn,
        sortDirection,
        activeIncident,
      }, () => {
        if (activeIncident) {
          this.handleIncidentSelected(activeIncident, tab);
        }
      });
    };
  }

  @autobind
  changeSorting(column) {
    return () => {
      const { sortColumn, sortDirection } = this.state;
      let direction;
      if (column === sortColumn) {
        direction = (sortDirection === 'desc') ? 'asc' : 'desc';
      } else {
        direction = defaultSortDirection;
      }

      this.setState({
        sortColumn: column,
        sortDirection: direction,
      });
    };
  }

  @autobind
  renderEventSeverity(incident) {
    const color = calculateRGBByAnomaly(
      incident.anomalyRatio, this.maxAnomalyRatio, this.minAnomalyRatio,
      incident.numberOfAnomalies);

    let eventTypes = incident.rootCauseJson.rootCauseTypes.split('\n');
    eventTypes = _.filter(eventTypes, s => s && s.trim() !== '');
    eventTypes = _.map(eventTypes, s => getEventType(s));
    // TODO: Need to keep multiple others type?
    eventTypes = _.uniq(eventTypes);

    return (
      <svg width={eventTypes.length * 10} height={26}>
        {eventTypes.map((event, index) => createEventShape(event, index, color))}
      </svg>
    );
  }

  @autobind
  renderTableHead() {
    const { sortColumn, sortDirection } = this.state;
    const icon = sortDirection === 'desc' ? 'down' : 'up';

    return (
      <thead style={{ display: 'block', width: '100%' }}>
        <tr style={{ display: 'inline-table', width: '100%' }}>
          <th style={columeStyles.id} onClick={this.changeSorting('id')}>
            <span>Id</span>
            <i className={`angle ${sortColumn === 'id' ? icon : ''} icon`} />
          </th>
          <th
            style={{ textAlign: 'center', ...columeStyles.anomalyRatio }}
            onClick={this.changeSorting('anomalyRatio')}
          >
            <span>Severity</span>
            <i className={`angle ${sortColumn === 'anomalyRatio' ? icon : ''} icon`} />
          </th>
          <th
            style={columeStyles.startTimestamp}
            onClick={this.changeSorting('startTimestamp')}
          >
            <span>Start Time</span>
            <i className={`angle ${sortColumn === 'startTimestamp' ? icon : ''} icon`} />
          </th>
          <th
            style={columeStyles.duration}
            onClick={this.changeSorting('duration')}
          >
            <span>Duration</span>
            <i className={`angle ${sortColumn === 'duration' ? icon : ''} icon`} />
          </th>
          <th
            style={columeStyles.eventType}
            onClick={this.changeSorting('eventType')}
          >
            <span>Event Type</span>
            <i className={`angle ${sortColumn === 'eventType' ? icon : ''} icon`} />
          </th>
          <th style={{ cursor: 'default', ...columeStyles.control }}>Control</th>
        </tr>
      </thead>
    );
  }

  @autobind
  toggleMergedIncidents(incident, type) {
    return (e) => {
      e.stopPropagation();
      const { shownMergedIncidentIdsByType } = this.state;
      const shownMergedIncidentIds = shownMergedIncidentIdsByType[type];
      let ids;
      // If any merged id exists in shownMergedIncidentIds, we need to hidden incidents.
      if (incident[`uiMergedIds_${type}`] && incident[`uiMergedIds_${type}`].length > 0) {
        if (_.indexOf(shownMergedIncidentIds, incident[`uiMergedIds_${type}`][0]) >= 0) {
          ids = _.without(shownMergedIncidentIds, ...incident[`uiMergedIds_${type}`]);
        } else {
          ids = _.concat(shownMergedIncidentIds, incident[`uiMergedIds_${type}`]);
        }

        const idsByType = _.cloneDeep(shownMergedIncidentIdsByType);
        idsByType[type] = ids;
        this.setState({
          shownMergedIncidentIdsByType: idsByType,
        });
      }
    };
  }

  @autobind
  renderTableBody(type) {
    // The type should be 'detected' or 'predicted'.
    // TODO: predicted needs to add syscall button?
    const self = this;
    const { projectType } = this.props;
    const { sortColumn, sortDirection, shownMergedIncidentIdsByType, tableBodyHeight } = this.state;

    const shownMergedIncidentIds = shownMergedIncidentIdsByType[type];
    const sysCallEnabled = (projectType.toLowerCase() === 'custom');
    const needMerge = sortColumn === 'id';
    let incidents = this.getIncidents(type);

    // The incidents is order by id by default, so we can add the merge flags
    // before sorting.
    if (needMerge) {
      let mainIncident = null;
      _.forEach(incidents, (incident) => {
        incident[`uiMergedIds_${type}`] = [];
        incident.uiMergedDuration = (incident.anomalyRatio === 0 ? 0 : incident.duration);
        if (!mainIncident) {
          mainIncident = incident;
        } else if (_.isEqual(mainIncident.rootCauseByInstanceJson,
          incident.rootCauseByInstanceJson) && incident.repeatedEventFlag) {
          // If root cause (instance, event type) are same, and has repeatedEventFlag,
          // we need to merge it.
          incident.uiMergable = true;
          mainIncident[`uiMergedIds_${type}`].push(incident.id);
          mainIncident.uiLastMergedId = incident.id;
          mainIncident.uiMergedDuration += (incident.anomalyRatio === 0 ? 0 : incident.duration);
        } else {
          mainIncident = incident;
        }
      });
    }

    incidents = this.sortingIncidents(incidents, sortColumn, sortDirection);

    return (
      <tbody style={{ width: '100%', height: tableBodyHeight || 0, overflow: 'auto', display: 'block' }}>
        {incidents.map((incident) => {
          // Display the anomaly string in title.
          let anomalyRatioString = '';
          if (incident.anomalyRatio > 0) {
            anomalyRatioString =
              `Event Anomaly Score: ${Math.round(incident.anomalyRatio * 10) / 10}\n`;
          }
          const hidden = needMerge && incident.uiMergable &&
            _.indexOf(shownMergedIncidentIds, incident.id) < 0;
          const mergedShown = needMerge && incident[`uiMergedIds_${type}`].length > 0 &&
            _.indexOf(shownMergedIncidentIds, incident[`uiMergedIds_${type}`][0]) >= 0;
          const mergedArrow = mergedShown ? (sortDirection === 'asc' ? 'down' : 'up') : 'right';

          return (
            <tr
              style={{ display: hidden ? 'none' : 'inline-table', width: '100%' }}
              key={incident.id}
              onClick={() => this.handleIncidentSelected(incident, type)}
              className={`${incident === self.state.activeIncident ? 'active' : ''}`}
              title={`${anomalyRatioString}Event details: \n ${incident.rootCauseJson.rootCauseDetails}`}
            >
              <td style={{ paddingTop: '1em', ...columeStyles.id }}>
                {needMerge && incident.uiLastMergedId &&
                  !mergedShown ? `${incident.id}-${incident.uiLastMergedId}` : incident.id}
                {needMerge && incident.uiLastMergedId && <i
                  onClick={self.toggleMergedIncidents(incident, type)}
                  style={{ cursor: 'pointer' }} className={`icon angle ${mergedArrow}`}
                />}
              </td>
              <td style={{ textAlign: 'center', paddingTop: '0.5em', ...columeStyles.anomalyRatio }}>
                {this.renderEventSeverity(incident)}
              </td>
              <td
                className="code"
                style={{ textAlign: 'center', paddingTop: '1em', ...columeStyles.startTimestamp }}
              >
                {moment(incident.startTimestamp).format('MM-DD HH:mm')}
              </td>
              <td style={{ textAlign: 'right', paddingTop: '1em', ...columeStyles.duration }}>
                {!mergedShown && `${incident.uiMergedDuration} min`}
                {mergedShown && (incident.anomalyRatio === 0 ? 'N/A' : `${incident.duration} min`)}
              </td>
              <td className="code" style={{ paddingTop: '1em', ...columeStyles.eventType }}>
                {incident.rootCauseJson.rootCauseTypes}
                {sysCallEnabled && incident.syscallFlag &&
                  <i className="zoom icon" onClick={this.handleLoadSysCall(incident)} />}
              </td>
              <td className="control" style={columeStyles.control}>
                {incident.anomalyRatio === 0 ? 'N/A' : <Button
                  className="blue" onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                      activeIncident: incident,
                      showTakeActionModal: true,
                    });
                  }}
                  style={{ paddingLeft: 2, paddingRight: 2 }}
                >Action</Button>
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  @autobind
  renderLegend() {
    return (
      <div className="list-legend">
        <div className="block">
          <svg width={16} height={20}>{createEventShape(EventTypes.HighCPU)}</svg>
          <span className="title">CPU Surge</span>
        </div>
        <div className="block" style={{ width: 140 }}>
          <svg width={16} height={20}>{createEventShape(EventTypes.Network)}</svg>
          <span className="title">Network Congestion</span>
        </div>
        <div className="block" style={{ width: 120 }}>
          <svg width={16} height={20}>{createEventShape(EventTypes.Disk)}</svg>
          <span className="title">Disk Contention</span>
        </div>
        <div className="block" style={{ width: 140 }}>
          <svg width={16} height={20}>{createEventShape(EventTypes.Workload)}</svg>
          <span className="title">Workload Increase</span>
        </div>
        <div className="block">
          <svg width={16} height={20}>{createEventShape(EventTypes.NewInstance, 0, '0,255,0')}</svg>
          <span className="title">New Instance</span>
        </div>
        <div className="block">
          <svg width={16} height={20}>{createEventShape(EventTypes.InstanceDown)}</svg>
          <span className="title">Instance Down</span>
        </div>
        <div className="block" style={{ width: 80 }}>
          <svg width={16} height={20}>{createEventShape(EventTypes.Others)}</svg>
          <span className="title">Others</span>
        </div>
      </div>
    );
  }

  @autobind
  handleWindowResize({ windowHeight }) {
    const tableBodyHeight = windowHeight - tableBodyOffsetHeight;
    this.setState({
      tableBodyHeight,
    });
  }

  render() {
    const { projectName, instanceGroup, endTime, numberOfDays, predictionWindow } = this.props;
    const { activeTab } = this.state;

    const detectedIncidents = this.detectedIncidents;
    const predictedIncidents = this.predictedIncidents;

    return (
      <div className="flex-col-container" style={{ height: '100%' }}>
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div style={{ marginBottom: 4, position: 'relative' }}>
          <Button
            className="orange"
            style={{ position: 'absolute', left: 350, top: 5 }} title="Causal Graph"
            onClick={(e) => { e.stopPropagation(); this.setState({ showCausalGraphModal: true }); }}
          >Causal Graph</Button>
          <div className="ui pointing secondary menu" style={{ marginTop: 0 }}>
            <a
              className={`${activeTab === 'detected' ? 'active' : ''} item`}
              onClick={this.selectTab('detected')}
            >Detected Events</a>
            <a
              className={`${activeTab === 'predicted' ? 'active' : ''} item`}
              onClick={this.selectTab('predicted')}
            >Predicted Events ({predictionWindow} Hr)</a>
          </div>
        </div>
        <div className={`${activeTab === 'predicted' ? 'active' : ''} ui tab flex-item`}>
          {(predictedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              {this.renderTableHead()}
              {this.renderTableBody('predicted')}
            </table>
            :
            <h5><img alt="normal" height="40px" src={thumbupImg} />Congratulations! Everything is normal in prediction.</h5>
          }
          {(predictedIncidents.length > 0) && this.renderLegend()}
        </div>
        <div className={`${activeTab === 'detected' ? 'active' : ''} ui tab flex-item`}>
          {(detectedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              {this.renderTableHead()}
              {this.renderTableBody('detected')}
            </table>
            :
            <h5><img alt="normal" height="40px" src={thumbupImg} />Congratulations! Everything is normal.</h5>
          }
          {(detectedIncidents.length > 0) && this.renderLegend()}
        </div>
        {this.state.showCausalGraphModal &&
          <CausalGraphModal
            projectName={projectName} instanceGroup={instanceGroup}
            endTime={endTime} numberOfDays={numberOfDays}
            loadGroup
            onClose={() => this.setState({ showCausalGraphModal: false })}
            onCancel={() => this.setState({ showCausalGraphModal: false })}
          />
        }
        {this.state.showTakeActionModal &&
          <TakeActionModal
            incident={this.state.activeIncident}
            projectName={projectName}
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
