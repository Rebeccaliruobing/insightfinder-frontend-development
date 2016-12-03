import store from 'store';
import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import {Button} from '../../artui/react';
import cx from 'classnames';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import "./incident.less";
import thumbupImg from '../../images/green-thumbup.png';
import _ from 'lodash';
import TakeActionModal from './takeActionModal';
import SysCallModal from './sysCallModal';
import apis from '../../apis';

class IncidentsList extends Component {

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
      actionTime: +moment(),
      angleIconStyleSelect: 'angleIconStyleStartTime',
      angleIconStyle: {
        angleIconStyleId: 'down',
        angleIconStyleSeverity: 'down',
        angleIconStyleEvent: 'down',
        angleIconStyleStartTime: 'down',
        angleIconStyleDuration: 'down'
      },
      tabStates: {
        predicted: '',
        detected: 'active'
      }
    }
  }

  componentDidMount() {
    this.setIncidentsList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
  }

  handleLoadSysCall(activeIncident) {
    let { projectName } = this.state;
    let instanceId = undefined;
    let self = this;
    if (activeIncident) {
      let startTimestamp = activeIncident.startTimestamp;
      let endTimestamp = activeIncident.endTimestamp;
      apis.postSysCallResult(projectName, startTimestamp, endTimestamp).then((resp)=> {
        console.log(resp);
        if (resp.success) {
          self.setState({
            debugData: resp.data.syscallResults,
            timeRanking: resp.data.freqFunctionList,
            freqRanking: resp.data.timeFunctionList,
            showSysCall: true
          });
        } else {
          alert(resp.message);
        }
      });
    } else {
      alert("Cannot find incident to retrieve syscall data for.");
    }
  }

  @autobind
  handleIncidentSelected(incident) {
    this.props.onIncidentSelected(incident);
    let incidentState = { activeIncident: incident };
    this.setState(incidentState);
  }

  @autobind
  handleProjectChartsView() {
    const { projectName, endTime, numberOfDays, modelType } = this.state;
    let endTimestamp = +moment(endTime);
    if (projectName) {
      let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
      let projectParam = projectParams.find((p) => p.projectName == projectName);
      let cvalueParam = projectParam ? projectParam.cvalue : "1";
      let pvalueParam = projectParam ? projectParam.pvalue : "0.99";
      // let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";

      const url = `/liveMonitoring?version=2&pvalue=${pvalueParam}&cvalue=${cvalueParam}&endTimestamp=${endTimestamp}&numberOfDays=${numberOfDays}&modelType=${modelType}&projectName=${projectName}`;
      window.open(url, '_blank');
    }
  }

  handleLinkToAgentWiki() {
    const url = `https://github.com/insightfinder/InsightAgent/wiki`;
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

  selectTab(e, tab) {

    let angleIconStyleSelect = 'angleIconStyleStartTime';
    let angleIconStyle = {
      angleIconStyleId: 'down',
      angleIconStyleSeverity: 'down',
      angleIconStyleEvent: 'down',
      angleIconStyleStartTime: 'down',
      angleIconStyleDuration: 'down'
    };
    let tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({ tabStates: tabStates, angleIconStyleSelect: angleIconStyleSelect, angleIconStyle: angleIconStyle });
  }

  changeAngleStyle(angleIconStyleSelect) {
    let { angleIconStyle } = this.state;
    angleIconStyle[angleIconStyleSelect] = angleIconStyle[angleIconStyleSelect] === 'up' ? 'down' : 'up';
    this.setState({ angleIconStyle: angleIconStyle, angleIconStyleSelect: angleIconStyleSelect });
  }

  calculateRGB(anomalyRatio, size) {
    let { maxAnomalyRatio, minAnomalyRatio } = this.state;
    if (minAnomalyRatio >= 0) {
      minAnomalyRatio = 0;
    }
    let range = maxAnomalyRatio - minAnomalyRatio;
    let val = (anomalyRatio == 0) ? 0 : (anomalyRatio);
    let gcolorMax = 205;
    var rcolor, gcolor, bcolor = 0;
    if (val == 0) {
      rcolor = Math.floor(255 * val);
      gcolor = gcolorMax;
    } else if (val <= 1) {
      // if (val < 0) val = 0;
      val = 1;
      rcolor = Math.floor(255 * val);
      gcolor = gcolorMax;
    } else {
      // if (val > 10) val = 10;
      rcolor = 255;
      gcolor = Math.floor(gcolorMax - (val - minAnomalyRatio) / range * gcolorMax);
    }
    return (rcolor.toString() + "," + gcolor.toString() + "," + bcolor.toString());
  }

  @autobind
  getEventShapeType(text, index, color) {
    const size = 5;
    const height = 26;
    const cx = index * size * 2 + size;
    const cy = height / 2;
    text = text.toLowerCase();

    if (text.indexOf('- network') >= 0) {
      return (
        <rect key={index} fill={`rgb(${color})`} 
              x={cx - size} y={cy - size * 0.6} width={size * 1.9} height={size * 1.2}/>
      );
    } else if(text.indexOf('- disk') >=0 ){
      return (
        <rect
          key={index} fill={`rgb(${color})`}
          x={cx - size * 0.6} y={cy - size} width={size * 1.2} height={size * 2}/>
      );
    } else if(text.indexOf('- workload') >= 0) {
      return (
        <polygon
          key={index} fill={`rgb(${color})`}
          points={`${cx},${cy - 7} ${cx - 5},${cy + 4} ${cx + 5},${cy + 4}`}
        />
      );
    } else if(text.indexOf('- new instance') >= 0) {
      return (
        <circle key={index} fill={`rgb(${color})`}
          cx={cx} cy={cy} r={size * 0.95} />
      );
    } else if(text.indexOf('- instance down') >= 0) {
      return (
        <polygon
          key={index} fill={`rgb(${color})`} 
          points={`${cx-5},${cy-4} ${cx+5},${cy-4} ${cx},${cy+7}`}
        />
      );
    } else if(text.indexOf('- high cpu') >=0) {
      return (
        <polygon
          key={index} fill={`rgb(${color})`} 
          points={`${cx},${cy-6} ${cx+6},${cy} ${cx},${cy+6} ${cx-6},${cy}`}
        />
      );
    } else  {
      return (
        <circle key={index} fill={`rgb(${color})`} 
          cx={cx} cy={cy} r={size * 0.95} />
      );
    }
  }


  unique(array){
      var len = array.length;
      for(var i = 0; i < len; i++) 
        for(var j = i + 1; j < len; j++) 
          if(array[j].props.eventtype != 'others' && array[j].props.eventtype == array[i].props.eventtype){
            array.splice(j,1);
            j--;
            len--;
          }
      return array;
  }


  @autobind
  renderEventSeverity(incident) {

    const color = this.calculateRGB(incident.anomalyRatio, incident.numberOfAnomalies);
    const eventTypes = incident.rootCauseJson.rootCauseTypes.split('\n');
    return (
      <svg width={70} height={26}>
        {this.unique(eventTypes.map((event, index) => {
          return this.getEventShapeType(event, index, color);
        }))}
      </svg>
    );
  }

  render() {
    const userName = store.get('userName');
    let { projectType, incidents, latestTimestamp, active, tabStates, angleIconStyle, angleIconStyleSelect, maxAnomalyRatio, minAnomalyRatio } = this.state;
    let detectedIncidents = incidents.filter((incident, index) =>
    incident.startTimestamp <= latestTimestamp);
    let predictedIncidents = incidents.filter((incident, index) =>
    incident.endTimestamp > latestTimestamp);
    let sysCallEnabled = (projectType == 'CUSTOM');
    let self = this;
    return (
      <div>
        <div className="row" style={{ marginBottom: 10, position: 'relative' }}>
          {false && (userName === 'admin' || userName === 'guest') &&
          <Button
            className="orange"
            style={{ position: 'absolute', right: 0, top: 5 }}
            onClick={this.handleProjectChartsView}
          >Line Charts</Button>
          }
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
            <a className={tabStates['detected'] + ' item'}
               onClick={(e) => this.selectTab(e, 'detected')}>Detected Events</a>
            <a className={tabStates['predicted'] + ' item'}
               onClick={(e) => this.selectTab(e, 'predicted')}>Predicted Events</a>
          </div>
        </div>
        <div className={tabStates['predicted'] + ' ui tab '}>
          {(predictedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              <thead style={{ 'display': 'block', 'width': '100%' }}>
              <tr style={{ display: 'inline-table', 'width': '100%' }}>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleId')}>Id<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleId'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleSeverity')}>Severity<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleSeverity'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleStartTime')}>Start Time<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleStartTime'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleDuration')}>Duration<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleDuration'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleEvent')}>Event Type<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleEvent'] + " icon"}/></th>
                <th>Control</th>
              </tr>
              </thead>
              <tbody style={{ width: '100%', 'height': '450px', 'overflow': 'auto', 'display': 'block' }}>
              {predictedIncidents.sort(function (a, b) {
                // reverse ordering
                if (angleIconStyleSelect == 'angleIconStyleId') {
                  let aid = parseInt(a.id);
                  let bid = parseInt(b.id);
                  let returnId = angleIconStyle['angleIconStyleId'] === 'up' ? -1 : 1;
                  if (aid < bid) {
                    return returnId;
                  } else if (aid > bid) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleSeverity') {
                  let aAnomalyRatio = parseInt(a.anomalyRatio);
                  let bAnomalyRatio = parseInt(b.anomalyRatio);
                  let returnId = angleIconStyle['angleIconStyleSeverity'] === 'up' ? -1 : 1;
                  if (aAnomalyRatio < bAnomalyRatio) {
                    return returnId;
                  } else if (aAnomalyRatio > bAnomalyRatio) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleStartTime') {
                  let aStartTime = parseInt(a.startTimestamp);
                  let bStartTime = parseInt(b.startTimestamp);
                  let returnId = angleIconStyle['angleIconStyleStartTime'] === 'up' ? -1 : 1;
                  if (aStartTime <= bStartTime) {
                    return returnId;
                  } else if (aStartTime > bStartTime) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleDuration') {
                  let aDuration = parseInt(a.duration);
                  let bDuration = parseInt(b.duration);
                  let returnId = angleIconStyle['angleIconStyleDuration'] === 'up' ? -1 : 1;
                  if (aDuration <= bDuration) {
                    return returnId;
                  } else if (aDuration > bDuration) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else {
                  let aname = a.rootCauseJson.rootCauseTypes;
                  let bname = b.rootCauseJson.rootCauseTypes;
                  let returnId = angleIconStyle['angleIconStyleEvent'] === 'up' ? -1 : 1;
                  if (aname > bname) {
                    return returnId;
                  } else if (aname < bname) {
                    return returnId * -1;
                  }
                }
              }).map(function (incident, index) {
                let anomalyRatioString = "";
                if(incident.anomalyRatio>0){
                  anomalyRatioString = "Event Anomaly Score: "+(Math.round(incident.anomalyRatio*10)/10)+"\n";                
                }
                return (
                  <tr style={{ display: 'inline-table', 'width': '100%' }} key={index}
                      onClick={()=>self.handleIncidentSelected(incident)}
                      className={cx({ 'active': incident === self.state.activeIncident })}
                      title={anomalyRatioString + "Event details: \n" + incident.rootCauseJson.rootCauseDetails}>
                    <td>{incident.id}</td>
                    <td>
                      {self.renderEventSeverity(incident)}
                    </td>
                    <td className="code">{moment(incident.startTimestamp).format("MM-DD HH:mm")}</td>
                    <td>
                      { incident.anomalyRatio == 0 ?
                        "N/A"
                        :
                      incident.duration + " min"
                      }
                    </td>
                    <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
                    <td>
                      { incident.anomalyRatio == 0 ?
                        "N/A"
                        :
                        <Button className="blue" onClick={(e) => {
                          e.stopPropagation();
                          self.setState({
                            activeIncident: incident,
                            showTakeActionModal: true,
                            actionTime: +moment(),
                          });
                        }}
                                style={{ paddingLeft: 2, paddingRight: 2 }}>
                          Action
                        </Button> }
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            :
            <h5><img alt="normal" height='40px' src={thumbupImg}/>Congratulations! Everything is normal in prediction.
            </h5>
          }
        </div>
        <div className={tabStates['detected'] + ' ui tab '}>
          {(detectedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
              <thead style={{ 'display': 'block', 'width': '100%' }}>
              <tr style={{ display: 'inline-table', 'width': '100%' }}>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleId')}>Id<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleId'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleSeverity')}>Severity<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleSeverity'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleStartTime')}>Start Time<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleStartTime'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleDuration')}>Duration<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleDuration'] + " icon"}/></th>
                <th onClick={()=>this.changeAngleStyle('angleIconStyleEvent')}>Event Type<i
                  className={"angle " + this.state.angleIconStyle['angleIconStyleEvent'] + " icon"}/></th>
                <th>Control</th>
              </tr>
              </thead>
              <tbody style={{ width: '100%', 'height': '444px', 'overflow': 'auto', 'display': 'block' }}>
              {detectedIncidents.sort(function (a, b) {
                // reverse ordering
                if (angleIconStyleSelect == 'angleIconStyleId') {
                  let aid = parseInt(a.id);
                  let bid = parseInt(b.id);
                  let returnId = angleIconStyle['angleIconStyleId'] === 'up' ? -1 : 1;
                  if (aid < bid) {
                    return returnId;
                  } else if (aid > bid) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleSeverity') {
                  let aAnomalyRatio = parseInt(a.anomalyRatio);
                  let bAnomalyRatio = parseInt(b.anomalyRatio);
                  let returnId = angleIconStyle['angleIconStyleSeverity'] === 'up' ? -1 : 1;
                  if (aAnomalyRatio < bAnomalyRatio) {
                    return returnId;
                  } else if (aAnomalyRatio > bAnomalyRatio) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleStartTime') {
                  let aStartTime = parseInt(a.startTimestamp);
                  let bStartTime = parseInt(b.startTimestamp);
                  let returnId = angleIconStyle['angleIconStyleStartTime'] === 'up' ? -1 : 1;
                  if (aStartTime <= bStartTime) {
                    return returnId;
                  } else if (aStartTime > bStartTime) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else if (angleIconStyleSelect == 'angleIconStyleDuration') {
                  let aDuration = parseInt(a.duration);
                  let bDuration = parseInt(b.duration);
                  let returnId = angleIconStyle['angleIconStyleDuration'] === 'up' ? -1 : 1;
                  if (aDuration <= bDuration) {
                    return returnId;
                  } else if (aDuration > bDuration) {
                    return returnId * -1;
                  } else {
                    return 0;
                  }
                }
                else {
                  let aname = a.rootCauseJson.rootCauseTypes;
                  let bname = b.rootCauseJson.rootCauseTypes;
                  let returnId = angleIconStyle['angleIconStyleEvent'] === 'up' ? -1 : 1;
                  if (aname > bname) {
                    return returnId;
                  } else if (aname < bname) {
                    return returnId * -1;
                  }
                }
              }).map(function (incident, index) {
                let anomalyRatioString = "";
                if(incident.anomalyRatio>0){
                  anomalyRatioString = "Event Anomaly Score: "+(Math.round(incident.anomalyRatio*10)/10)+"\n";                
                }
                return (
                  <tr style={{ display: 'inline-table', 'width': '100%' }} key={index}
                      onClick={()=>self.handleIncidentSelected(incident)}
                      className={cx({ 'active': incident === self.state.activeIncident })}
                      title={anomalyRatioString + "Event details: \n" + incident.rootCauseJson.rootCauseDetails}>
                    <td>{incident.id}</td>
                    <td>
                      {self.renderEventSeverity(incident)}
                    </td>
                    <td className="code">{moment(incident.startTimestamp).format("MM-DD HH:mm")}</td>
                    <td>
                      { incident.anomalyRatio == 0 ?
                        "N/A"
                        :
                      incident.duration + " min"
                      }
                    </td>
                    <td className="code">{incident.rootCauseJson.rootCauseTypes} {sysCallEnabled && incident.syscallFlag &&
                    <i className="zoom icon" onClick={(e) => {
                      self.handleLoadSysCall(incident)
                    }}/>}</td>
                    <td>
                      { incident.anomalyRatio == 0 ?
                        "N/A"
                        :
                        <Button className="blue" onClick={(e) => {
                          e.stopPropagation();
                          self.setState({
                            activeIncident: incident,
                            showTakeActionModal: true,
                            actionTime: +moment(),
                          });
                        }}
                                style={{ paddingLeft: 2, paddingRight: 2 }}>
                          Action
                        </Button> }
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            :
            <h5><img alt="normal" height='40px' src={thumbupImg}/>Congratulations! Everything is normal.</h5>
          }
        </div>
        { this.state.showTenderModal &&
        <TenderModal dataArray={this.state.causalDataArray} types={this.state.causalTypes}
                     endTimestamp={this.state.endTimestamp}
                     startTimestamp={this.state.startTimestamp}
                     onClose={() => this.setState({ showTenderModal: false })}/>
        }
        { this.state.showTakeActionModal &&
        <TakeActionModal incident={this.state.activeIncident}
                         projectName={this.state.projectName}
                         actionTime={this.state.actionTime}
                         onClose={() => this.setState({ showTakeActionModal: false })}/>
        }
        { this.state.showSysCall &&
        <SysCallModal timeRanking={this.state.timeRanking} freqRanking={this.state.freqRanking}
                      dataArray={this.state.debugData}
                      onClose={() => this.setState({ showSysCall: false })}/>
        }
      </div>
    )
  }
}

export default IncidentsList;
