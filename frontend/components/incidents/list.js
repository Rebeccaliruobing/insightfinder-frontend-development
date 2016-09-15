import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import {Button} from '../../artui/react';
import cx from 'classnames';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import "./incident.less";
import thumbupImg from '../../images/green-thumbup.png';
import { IncidentDurationMinute,IncidentActionTaken } from '../selections';

class IncidentsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      incidents:props.incidents,
      causalDataArray:props.causalDataArray,
      causalTypes:props.causalTypes,
      latestTimestamp:props.latestTimestamp,
      showTenderModal:false,
      startTimestamp:undefined,
      endTimestamp:undefined,
      incidentDurationThreshold: 30,
      activeIncident:undefined
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
    this.setState({activeIncident:incident});
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
  }

  handleLinkToAgentWiki(){
    const url = `https://github.com/insightfinder/InsightAgent/wiki`;
    window.open(url, '_blank');
  }

  setIncidentsList(props){
    this.setState({
      incidents:props.incidents,
      causalDataArray:props.causalDataArray,
      causalTypes:props.causalTypes,
      latestTimestamp:props.latestTimestamp,
      showTenderModal:false,
      startTimestamp:undefined,
      endTimestamp:undefined,
    });
  }

  // <td>
  //   <Button className="green"
  //           onClick={(e) => this.handleLinkToAgentWiki()}
  //           style={{width: 80, paddingLeft:0, paddingRight:0}}>
  //     Need agent
  //   </Button>
  // </td>
  // const IncidentsList = ({ incidents }) => {
  render() {
    let { incidents,latestTimestamp,incidentDurationThreshold, active } = this.state;
    let filtered30 = true;
    let actualIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    let predictedIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp>latestTimestamp );
    return (
      <div>
      {(predictedIncidents.length > 0) ? 
        <table className="incident-table selectable ui table">
        <thead>
        <tr onClick={() => this.handleNoIncidentSelected()}>
          <th>Id</th>
          <th>Start Time</th>
          <th>Duration (min)</th>
          <th>Anomaly Type</th>
          <th>Suggested Actions</th>
          <th>Action Taken</th>
          <th>Causal Graph</th>
        </tr>
        </thead>
        <tbody>
        {predictedIncidents.reverse().map((incident, index)=>(
          <tr key={index} onClick={() => this.handleIncidentSelected(incident)}>
            <td>{incident.id}</td>
            <td>{moment(incident.startTimestamp).format("MM-DD HH:mm")}</td>
            <td>{incident.duration}</td>
            <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
            <td className="code">{incident.rootCauseJson.suggestedActions}</td>            
            <td><IncidentActionTaken/> </td>
            <td>
              <Button className="orange"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                        showTenderModal: true,
                        startTimestamp: incident.startTimestamp,
                        endTimestamp: incident.endTimestamp
                      });}}
                      style={{width: 80, paddingLeft:0, paddingRight:0}}>
                Causal Graph
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        :
        <h5><img alt="normal" height='40px' src={thumbupImg}/>Congratulations! Everything is normal in prediction.</h5>
      }
        <h4 style={{display:'inline-block'}}>Detected Incident List</h4>
      <div style={{float:'right', paddingTop: 24, display:'inline-block'}}>
      Showing incident no shorter than <IncidentDurationMinute
        value={incidentDurationThreshold} text={incidentDurationThreshold}
        onChange={(v, t)=>this.setState({incidentDurationThreshold: t})}/> minutes
      </div>
      {(actualIncidents.length > 0) ?
        <table className="incident-table selectable ui table">
        <thead>
        <tr onClick={() => this.handleNoIncidentSelected()}>
          <th>Id</th>
          <th>Start Time</th>
          <th>Duration (min)</th>
          <th>Anomaly Type</th>
          <th>Suggested Actions</th>
          <th>Action Taken</th>
          <th>
            <Button className="orange"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        showTenderModal: true,
                        startTimestamp: undefined,
                        endTimestamp: undefined
                    });}}
                    style={{width: 80, height: 40, paddingLeft:0, paddingRight:0}}>
                Overall Causal Graph
            </Button>
          </th>
        </tr>
        </thead>
        <tbody>
        {actualIncidents.reverse().sort(function (a, b) {
              // reverse ordering
              let aname = a.incidentName;
              let bname = b.incidentName;
              if (aname < bname) {
                return 1;
              } else if (aname > bname) {
                return -1;
              } else {
                let aid = parseInt(a.id);
                let bid = parseInt(b.id);
                if (aid < bid) {
                  return 1;
                } else if (aid > bid) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }).map((incident, index)=>(
          <tr key={index} onClick={() => this.handleIncidentSelected(incident)}
              className={cx({'active': incident === this.state.activeIncident})}>
            <td>{incident.id}</td>
            <td>{moment(incident.startTimestamp).format("MM-DD HH:mm")}</td>
            <td>{incident.duration}</td>
            <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
            <td className="code">{incident.rootCauseJson.suggestedActions}</td>        
            <td><IncidentActionTaken/> </td>
            <td>
              <Button className="orange"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                        showTenderModal: true,
                        startTimestamp: incident.startTimestamp,
                        endTimestamp: incident.endTimestamp
                      });}}
                      style={{width: 80, paddingLeft:0, paddingRight:0}}>
                Causal Graph
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        :
        <h5><img alt="normal" height='40px' src={thumbupImg}/>Congratulations! Everything is normal.</h5>
      }
      { this.state.showTenderModal &&
        <TenderModal dataArray={this.state.causalDataArray} types={this.state.causalTypes}
                     endTimestamp={this.state.endTimestamp}
                     startTimestamp={this.state.startTimestamp}
                     onClose={() => this.setState({ showTenderModal: false })}/>
      }
      </div>
    )
  }
}

export default IncidentsList;
