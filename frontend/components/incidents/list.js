import React, {Component, PropTypes as T} from 'react';
import {Button} from '../../artui/react';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';

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
    let actualIncidents = incidents.filter((incident, index) => 
            incident.startTimestamp<latestTimestamp );
    let predictedIncidents = incidents.filter((incident, index) => 
            incident.startTimestamp>=latestTimestamp );
    return (
      <div>
      {(actualIncidents.length > 0) ? 
        <table className="ui compact table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>Root Cause Type</th>
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
        {actualIncidents.map((incident, index)=>(
          <tr key={index}>
            <td>{incident.id}</td>
            <td>{incident.start}</td>
            <td>{incident.duration}</td>
            <td><pre>{incident.rootCauseNames}</pre></td>
            <td>N/A</td>
            <td>N/A</td>
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
        <h4>None</h4>
      }
      <h4>Predicted Incident List:</h4>
      {(predictedIncidents.length > 0) ? 
        <table className="ui compact table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Start Time</th>
          <th>Duration</th>
          <th>Root Cause Type</th>
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
        {predictedIncidents.map((incident, index)=>(
          <tr key={index}>
            <td>{incident.id}</td>
            <td>{incident.start}</td>
            <td>{incident.duration}</td>
            <td><pre>{incident.rootCauseNames}</pre></td>
            <td>N/A</td>
            <td>N/A</td>
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
        <h4>None</h4>
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
