import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import {Button} from '../../artui/react';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import "./incident.less";
import thumbupImg from '../../images/green-thumbup.png';
import { IncidentDurationMinute } from '../selections';

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
      incidentDurationThreshold: 30
    }
  }

  componentDidMount() {
    this.setIncidentsList(this.props);
  }

  @autobind
  handleIncidentSelected(incident) {
    this.props.onIncidentSelected(incident);
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
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

  //const IncidentsList = ({ incidents }) => {
  render() {
    let { incidents,latestTimestamp,incidentDurationThreshold } = this.state;
    let filtered30 = true;
    let actualIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    let predictedIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp>latestTimestamp );
    return (
      <div>
      {(predictedIncidents.length > 0) ? 
        <table className="incident-table selectable ui compact table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Anomaly Type</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>Root Cause Scope</th>
          <th>Affected Functions</th>
          <th>Suggested Actions</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {predictedIncidents.reverse().map((incident, index)=>(
          <tr key={index} onClick={() => this.handleIncidentSelected(incident)}>
            <td>{incident.id}</td>
            <td className="code">{incident.rootCauseNames}</td>
            <td>{incident.start}</td>
            <td>{incident.duration} minutes</td>
            <td>Agent needed</td>
            <td>Agent needed</td>
            <td className="code">{incident.suggestedActions}</td>
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
      <h4>Detected Incident List</h4>
      Showing incident no shorter than <IncidentDurationMinute
        value={incidentDurationThreshold} text={incidentDurationThreshold}
        onChange={(v, t)=>this.setState({incidentDurationThreshold: t})}/> minutes
      {(actualIncidents.length > 0) ? 
        <table className="incident-table selectable ui compact table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Anomaly Type</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>Root Cause Scope</th>
          <th>Affected Functions</th>
          <th>Suggested Actions</th>
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
          <tr key={index} onClick={() => this.handleIncidentSelected(incident)}>
            <td>{incident.id}</td>
            <td className="code">{incident.rootCauseNames}</td>
            <td>{incident.start}</td>
            <td>{incident.duration} minutes</td>
            <td>Agent needed</td>
            <td>Agent needed</td>
            <td className="code">{incident.suggestedActions}</td>
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
