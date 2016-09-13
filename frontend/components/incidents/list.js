import React, {Component, PropTypes as T} from 'react';
import {Button} from '../../artui/react';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import "./incident.less";
import thumbupImg from '../../images/green-thumbup.png';

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
      endTimestamp:undefined
    }
  }

  componentDidMount() {
    this.setIncidentsList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setIncidentsList(nextProps);
  }

  setIncidentsList(props){
    this.state = {
      incidents:props.incidents,
      causalDataArray:props.causalDataArray,
      causalTypes:props.causalTypes,
      latestTimestamp:props.latestTimestamp,
      showTenderModal:false,
      startTimestamp:undefined,
      endTimestamp:undefined
    }
  }


  //const IncidentsList = ({ incidents }) => {
  render() {
    let { incidents,latestTimestamp } = this.state;
    let filtered30 = true;
    let actualIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp<=latestTimestamp && incident.duration>=30 );
    if(actualIncidents.length==0){
      filtered30 = false;
      actualIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp<=latestTimestamp);
    }
    let predictedIncidents = incidents.filter((incident, index) => 
            incident.endTimestamp>latestTimestamp );
    return (
      <div>
      {(predictedIncidents.length > 0) ? 
        <table className="incident-table ui compact table">
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
          </th>
        </tr>
        </thead>
        <tbody>
        {predictedIncidents.reverse().map((incident, index)=>(
          <tr key={index}>
            <td>{incident.id}</td>
            <td><pre>{incident.rootCauseNames}</pre></td>
            <td>{incident.start}</td>
            <td>{incident.duration} minutes</td>
            <td>Agent needed</td>
            <td>Agent needed</td>
            <td><pre>{incident.suggestedActions}</pre></td>
            <td>
              <Button className="orange"
                      onClick={() => this.setState({
                        showTenderModal: true,
                        startTimestamp: incident.startTimestamp,
                        endTimestamp: incident.endTimestamp
                      })} 
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
      {(actualIncidents.length > 0) ? 
        <table className="incident-table ui compact table">
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
                    onClick={() => this.setState({
                      showTenderModal: true,
                      startTimestamp: undefined,
                      endTimestamp: undefined
                    })}
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
          <tr key={index}>
            <td>{incident.id}</td>
            <td><pre>{incident.rootCauseNames}</pre></td>
            <td>{incident.start}</td>
            <td>{incident.duration} minutes</td>
            <td>Agent needed</td>
            <td>Agent needed</td>
            <td><pre>{incident.suggestedActions}</pre></td>
            <td>
              <Button className="orange"
                      onClick={() => this.setState({
                        showTenderModal: true,
                        startTimestamp: incident.startTimestamp,
                        endTimestamp: incident.endTimestamp
                      })} 
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
      {filtered30 && (actualIncidents.length > 0) && 
        <div>* Incidents longer than 30 minutes shown here.</div>
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
