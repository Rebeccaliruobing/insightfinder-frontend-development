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
      incidentDurationThreshold: 15,
      activeIncident:undefined,
      tabStates: {
          predicted: 'active',
          detected: ''
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
  selectTab(e, tab) {
      var tabStates = this.state['tabStates'];
      tabStates = _.mapValues(tabStates, function (val) {
          return '';
      });
      tabStates[tab] = 'active';
      this.setState({tabStates: tabStates});
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
    let { incidents,latestTimestamp,incidentDurationThreshold, active, tabStates } = this.state;
    let actualIncidents = incidents.filter((incident, index) =>
            incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    let predictedIncidents = incidents.filter((incident, index) =>
            incident.endTimestamp>latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
    return (
      <div>
        <div className="ui pointing secondary menu">
            <a className={tabStates['predicted'] + ' item'}
               onClick={(e) => this.selectTab(e, 'predicted')}>Predicted Events</a>
            <a className={tabStates['detected'] + ' item'}
               onClick={(e) => this.selectTab(e, 'detected')}>Detected Events</a>
        </div>
        <div style={{float:'right', display:'inline-block','paddingBottom': '15px'}}>
        Showing incident no shorter than <IncidentDurationMinute
          value={incidentDurationThreshold} text={incidentDurationThreshold}
          onChange={(v, t)=>this.setState({incidentDurationThreshold: t})}/> minutes
        </div>
      <div className={tabStates['predicted'] + ' ui tab '}>
          {(predictedIncidents.length > 0) ?
            <table className="incident-table selectable ui table">
            <thead>
            <tr onClick={() => this.handleNoIncidentSelected()}>
              <th>Id</th>
              <th></th>
              <th>Anomaly Type</th>
              <th>Duration</th>
              <th>Suggested Actions</th>
              <th>Action Taken</th>
              <th>Causal Graph</th>
            </tr>
            </thead>
            <tbody>
            {predictedIncidents.reverse().sort(function (a, b) {
                  // reverse ordering
                  let aname = a.rootCauseJson.rootCauseTypes;
                  let bname = b.rootCauseJson.rootCauseTypes;
                  if (aname > bname) {
                    return 1;
                  } else if (aname < bname) {
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
                  className={cx({'active': incident === this.state.activeIncident})}
                  title={"Start: " + moment(incident.startTimestamp).format("MM-DD HH:mm")
                    + ", end: " + moment(incident.endTimestamp).format("MM-DD HH:mm")
                    + ", duration: " + incident.duration + " min"}>
                <td>{incident.id}</td>
                <td><div className="level"></div></td>
                <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
                <td>{incident.duration} min</td>
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
      </div>
      <div className={tabStates['detected'] + ' ui tab '}>
          {(actualIncidents.length > 0) ?
        <table className="incident-table selectable ui table">
        <thead>
        <tr onClick={() => this.handleNoIncidentSelected()}>
          <th>Id</th>
          <th></th>
          <th>Anomaly Type</th>
          <th>Duration</th>
          <th>Suggested Actions</th>
          <th>Action Taken</th>
          <th>
            <Button className="orange"
                    title="Overall Causal Graph"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({
                        showTenderModal: true,
                        startTimestamp: undefined,
                        endTimestamp: undefined
                    });}}
                    style={{width: 80, height: 40,'lineHeight': '25px',paddingLeft:0, paddingRight:0,  overflow: 'hidden', 'whiteSpace': 'nowrap','textOverflow': 'ellipsis',display: 'inline-block'}}>
                Overall Causal Graph
            </Button>
          </th>
        </tr>
        </thead>
        <tbody>
        {actualIncidents.reverse().sort(function (a, b) {
              // reverse ordering
              let aname = a.rootCauseJson.rootCauseTypes;
              let bname = b.rootCauseJson.rootCauseTypes;
              if (aname > bname) {
                return 1;
              } else if (aname < bname) {
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
              className={cx({'active': incident === this.state.activeIncident})}
              title={"Start: " + moment(incident.startTimestamp).format("MM-DD HH:mm")
                + ", end: " + moment(incident.endTimestamp).format("MM-DD HH:mm")
                + ", duration: " + incident.duration + " min"}>
            <td>{incident.id}</td>
            <td><div className="level"></div></td>
            <td className="code">{incident.rootCauseJson.rootCauseTypes}</td>
            <td>{incident.duration} min</td>
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
      </div>
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
