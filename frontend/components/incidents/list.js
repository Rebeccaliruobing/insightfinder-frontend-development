import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import {Button} from '../../artui/react';
import cx from 'classnames';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import "./incident.less";
import thumbupImg from '../../images/green-thumbup.png';
import _ from 'lodash';
import { IncidentDurationMinute,IncidentActionTaken } from '../selections';
import TakeActionModal from './takeActionModal';

class IncidentsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      incidents:props.incidents,
      causalDataArray:props.causalDataArray,
      causalTypes:props.causalTypes,
      latestTimestamp:props.latestTimestamp,
      showTenderModal:false,
      showTakeActionModal: false,
      startTimestamp:undefined,
      endTimestamp:undefined,
      incidentDurationThreshold: 0,
      activeIncident:undefined,
      angleIconStyleSelect: 'angleIconStyleEvent',
      angleIconStyle: {
          angleIconStyleId: 'down',
          angleIconStyleSeverity: 'down',
          angleIconStyleEvent: 'down',
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

  @autobind
  handleNoIncidentSelected(){
    this.props.onIncidentSelected(undefined);
    this.setState({activeIncident:undefined});
  }

  @autobind
  handleIncidentSelected(incident) {
        this.props.onIncidentSelected(incident);
        let incidentState={activeIncident:incident};
        this.setState(incidentState);
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
  }

  handleLinkToAgentWiki(){
    const url = `https://github.com/insightfinder/InsightAgent/wiki`;
    window.open(url, '_blank');
  }

  setIncidentsList(props){
    let anomalyRatioLists = props.incidents.map(function (value,index) {
      return value['anomalyRatio']
    });
    let stateIncidents = {
      incidents:props.incidents,
      maxAnomalyRatio: _.max(anomalyRatioLists),
      minAnomalyRatio: _.min(anomalyRatioLists),
      causalDataArray:props.causalDataArray,
      causalTypes:props.causalTypes,
      latestTimestamp:props.latestTimestamp,
      showTenderModal:false,
      showTakeActionModal: false,
      startTimestamp:undefined,
      endTimestamp:undefined
    };
    this.setState(stateIncidents);
  }

  selectTab(e, tab) {

      let angleIconStyleSelect='angleIconStyleEvent';
      let angleIconStyle = {
          angleIconStyleId: 'down',
          angleIconStyleSeverity: 'down',
          angleIconStyleEvent: 'down',
          angleIconStyleDuration: 'down'
      };
      let tabStates = this.state['tabStates'];
      tabStates = _.mapValues(tabStates, function (val) {
          return '';
      });
      tabStates[tab] = 'active';
      this.setState({tabStates: tabStates, angleIconStyleSelect: angleIconStyleSelect, angleIconStyle: angleIconStyle});
  }
    changeAngleStyle(angleIconStyleSelect){
        let {angleIconStyle} = this.state;
        angleIconStyle[angleIconStyleSelect] = angleIconStyle[angleIconStyleSelect] === 'up'?'down':'up';
        this.setState({angleIconStyle: angleIconStyle, angleIconStyleSelect: angleIconStyleSelect});
    }

  calculateRGB(anomalyRatio, size){
    let val = (anomalyRatio==0) ? 0 : (anomalyRatio / size);
    let gcolorMax = 205;
    var rcolor, gcolor, bcolor = 0;
    if (val <= 1) {
        if (val < 0) val = 0;
        rcolor = Math.floor(255 * val);
        gcolor = gcolorMax;
    } else {
        if (val > 10) val = 10;
        rcolor = 255;
        gcolor = Math.floor(gcolorMax - (val - 1) / 9 * gcolorMax);
    }
    return (rcolor.toString() + "," + gcolor.toString() + "," + bcolor.toString());
  }


                // <td>
                //   { incident.anomalyRatio==0 ?
                //     "N/A"
                //     :
                //     <Button className="orange" onClick={(e) => {
                //             e.stopPropagation();
                //             this.setState({
                //             showTakeActionModal: true
                //           });}}
                //           style={{width: 80, paddingLeft:0, paddingRight:0}}>
                //     take action
                //   </Button> }
                // </td>
  render() {
    let { incidents,latestTimestamp,incidentDurationThreshold, active, tabStates, angleIconStyle, angleIconStyleSelect, maxAnomalyRatio, minAnomalyRatio } = this.state;
    let detectedIncidents = incidents.filter((incident, index) =>
            incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    let predictedIncidents = incidents.filter((incident, index) =>
            incident.endTimestamp>latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    let self =this;
    return (
      <div>
        <div className="ui pointing secondary menu">
            <a className={tabStates['detected'] + ' item'}
               onClick={(e) => this.selectTab(e, 'detected')}>Detected Events</a>
            <a className={tabStates['predicted'] + ' item'}
               onClick={(e) => this.selectTab(e, 'predicted')}>Predicted Events</a>
        </div>
        <div className={tabStates['predicted'] + ' ui tab '}>
          {(predictedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
            <thead style={{ 'display': 'block','width': '100%'}}>
            <tr onClick={() => this.handleNoIncidentSelected()} style={{ display: 'inline-table','width': '100%'}}>
              <th onClick={()=>this.changeAngleStyle('angleIconStyleId')}>Id<i className={"angle "+ this.state.angleIconStyle['angleIconStyleId'] +" icon"}/></th>
              <th onClick={()=>this.changeAngleStyle('angleIconStyleSeverity')}>Severity<i className={"angle "+ this.state.angleIconStyle['angleIconStyleSeverity'] +" icon"}/></th>
              <th onClick={()=>this.changeAngleStyle('angleIconStyleEvent')}>Event Type<i className={"angle "+ this.state.angleIconStyle['angleIconStyleEvent'] +" icon"}/></th>
              <th onClick={()=>this.changeAngleStyle('angleIconStyleDuration')}>Duration<i className={"angle "+ this.state.angleIconStyle['angleIconStyleDuration'] +" icon"}/></th>
              <th>Suggested Actions</th>
              <th>Causal Graph</th>
            </tr>
            </thead>
            <tbody style={{ width: '100%','height': '450px','overflow': 'auto','display': 'block' }}>
            {predictedIncidents.reverse().sort(function (a, b) {
                  // reverse ordering
                    if(angleIconStyleSelect == 'angleIconStyleId'){
                        let aid = parseInt(a.id);
                        let bid = parseInt(b.id);
                        let returnId = angleIconStyle['angleIconStyleId'] === 'up'?-1:1;
                        if (aid < bid) {
                            return returnId;
                        } else if (aid > bid) {
                            return returnId*-1;
                        } else {
                          return 0;
                        }
                  }
                  else if(angleIconStyleSelect == 'angleIconStyleSeverity'){
                        let aAnomalyRatio = parseInt(a.anomalyRatio);
                        let bAnomalyRatio = parseInt(b.anomalyRatio);
                        let returnId = angleIconStyle['angleIconStyleSeverity'] === 'up'?-1:1;
                        if (aAnomalyRatio < bAnomalyRatio) {
                            return returnId;
                        } else if (aAnomalyRatio > bAnomalyRatio) {
                            return returnId*-1;
                        } else {
                          return 0;
                        }
                  }
                  else if(angleIconStyleSelect == 'angleIconStyleDuration'){
                        let aDuration = parseInt(a.duration);
                        let bDuration = parseInt(b.duration);
                        let returnId = angleIconStyle['angleIconStyleDuration'] === 'up'?-1:1;
                        if (aDuration <= bDuration) {
                            return returnId;
                        } else if (aDuration > bDuration) {
                            return returnId*-1;
                        } else {
                          return 0;
                        }
                  }
                  else{
                    let aname = a.rootCauseJson.rootCauseTypes;
                    let bname = b.rootCauseJson.rootCauseTypes;
                    let returnId = angleIconStyle['angleIconStyleEvent'] === 'up'?-1:1;
                     if (aname > bname) {
                        return returnId;
                      } else if (aname < bname) {
                        return returnId*-1;
                      }
                  }
                }).map((incident, index)=>(
              <tr style={{ display: 'inline-table','width': '100%'}} key={index} onClick={()=>this.handleIncidentSelected(incident)}
                  className={cx({'active': incident === this.state.activeIncident})}
                  title={"Start: " + moment(incident.startTimestamp).format("MM-DD HH:mm")
                    + ", end: " + moment(incident.endTimestamp).format("MM-DD HH:mm")
                    + ", duration: " + incident.duration + " min"}>
                <td>{incident.id}</td>
                <td><div className="level" style={{'backgroundColor': 'rgb('+this.calculateRGB(incident.anomalyRatio,incident.numberOfAnomalies)+')'}}></div></td>
                <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
                <td>{incident.duration} min</td>
                <td className="code">{incident.rootCauseJson.suggestedActions}</td>
                <td>
                  { incident.anomalyRatio==0 ?
                  <Button className="grey" onClick={(e) => {
                            e.stopPropagation()}}
                          style={{width: 80, paddingLeft:0, paddingRight:0}}>
                    display
                  </Button> 
                  :                
                  <Button className="orange" onClick={(e) => {
                            e.stopPropagation();
                            this.setState({
                            showTenderModal: true,
                            startTimestamp: incident.startTimestamp,
                            endTimestamp: incident.endTimestamp
                          });}}
                          style={{width: 80, paddingLeft:0, paddingRight:0}}>
                    display
                  </Button> }
                </td>
              </tr>
            ))}
            </tbody>
            </table>
            :
            <h5><img alt="normal" height='40px' src={thumbupImg}/>Congratulations! Everything is normal in prediction.</h5>
        }
        </div>
        <div className={tabStates['detected'] + ' ui tab '}>
            {(detectedIncidents.length > 0) ?
          <table className="incident-table selectable ui table">
          <thead style={{ 'display': 'block','width': '100%'}}>
          <tr onClick={() => this.handleNoIncidentSelected()} style={{ display: 'inline-table','width': '100%'}}>
            <th onClick={()=>this.changeAngleStyle('angleIconStyleId')}>Id<i className={"angle "+ this.state.angleIconStyle['angleIconStyleId'] +" icon"}/></th>
            <th onClick={()=>this.changeAngleStyle('angleIconStyleSeverity')}>Severity<i className={"angle "+ this.state.angleIconStyle['angleIconStyleSeverity'] +" icon"}/></th>
            <th onClick={()=>this.changeAngleStyle('angleIconStyleEvent')}>Event Type<i className={"angle "+ this.state.angleIconStyle['angleIconStyleEvent'] +" icon"}/></th>
            <th onClick={()=>this.changeAngleStyle('angleIconStyleDuration')}>Duration<i className={"angle "+ this.state.angleIconStyle['angleIconStyleDuration'] +" icon"}/></th>
            <th>Suggested Actions</th>
            <th>Causal Graph</th>
          </tr>
          </thead>
          <tbody style={{ width: '100%','height': '418px','overflow': 'auto','display': 'block' }}>
          {detectedIncidents.reverse().sort(function (a, b) {
                // reverse ordering
              if(angleIconStyleSelect == 'angleIconStyleId'){
                    let aid = parseInt(a.id);
                    let bid = parseInt(b.id);
                    let returnId = angleIconStyle['angleIconStyleId'] === 'up'?-1:1;
                    if (aid < bid) {
                        return returnId;
                    } else if (aid > bid) {
                        return returnId*-1;
                    } else {
                      return 0;
                    }
              }
              else if(angleIconStyleSelect == 'angleIconStyleSeverity'){
                    let aAnomalyRatio = parseInt(a.anomalyRatio);
                    let bAnomalyRatio = parseInt(b.anomalyRatio);
                    let returnId = angleIconStyle['angleIconStyleSeverity'] === 'up'?-1:1;
                    if (aAnomalyRatio < bAnomalyRatio) {
                        return returnId;
                    } else if (aAnomalyRatio > bAnomalyRatio) {
                        return returnId*-1;
                    } else {
                      return 0;
                    }
              }
              else if(angleIconStyleSelect == 'angleIconStyleDuration'){
                    let aDuration = parseInt(a.duration);
                    let bDuration = parseInt(b.duration);
                    let returnId = angleIconStyle['angleIconStyleDuration'] === 'up'?-1:1;
                    if (aDuration <= bDuration) {
                        return returnId;
                    } else if (aDuration > bDuration) {
                        return returnId*-1;
                    } else {
                      return 0;
                    }
              }
              else{
                let aname = a.rootCauseJson.rootCauseTypes;
                let bname = b.rootCauseJson.rootCauseTypes;
                let returnId = angleIconStyle['angleIconStyleEvent'] === 'up'?-1:1;
                 if (aname > bname) {
                    return returnId;
                  } else if (aname < bname) {
                    return returnId*-1;
                  }
              }
              }).map((incident, index)=>(
            <tr style={{ display: 'inline-table','width': '100%'}} key={index}
                onClick={()=>this.handleIncidentSelected(incident)}
                className={cx({'active': incident === this.state.activeIncident})}
                title={"Start: " + moment(incident.startTimestamp).format("MM-DD HH:mm")
                  + ", end: " + moment(incident.endTimestamp).format("MM-DD HH:mm")
                  + ", duration: " + incident.duration + " min"}>
              <td>{incident.id}</td>
              <td><div className="level" style={{'backgroundColor': 'rgb('+this.calculateRGB(incident.anomalyRatio,incident.numberOfAnomalies)+')'}}></div></td>
              <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
              <td>
                { incident.anomalyRatio==0 ?
                  "N/A"
                  :
                  incident.duration+" min"
                }
              </td>
              <td className="code">{incident.rootCauseJson.suggestedActions}</td>
              <td>
                  { incident.anomalyRatio==0 ?
                  <Button className="grey" onClick={(e) => {
                            e.stopPropagation()}}
                          style={{width: 80, paddingLeft:0, paddingRight:0}}>
                    display
                  </Button> 
                  :                
                  <Button className="orange" onClick={(e) => {
                          e.stopPropagation();
                          this.setState({
                            showTenderModal: true,
                            startTimestamp: incident.startTimestamp,
                            endTimestamp: incident.endTimestamp
                          });}}
                        style={{width: 80, paddingLeft:0, paddingRight:0}}>
                   display
                  </Button> }
              </td>
            </tr>
          ))}
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
                       onClose={() => this.setState({ showTakeActionModal: false })}/>
        }
      </div>
    )
  }
}

export default IncidentsList;
