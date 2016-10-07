import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {Modal} from '../../artui/react';
import {IncidentActionTaken} from '../selections';
import apis from '../../apis';
import "./incident.less";

class TakeActionModal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);
    this.state = {
      incident: props.incident,
      projectName: props.projectName,
      action: "ignore",
      actionMap:{}
    };
    this.state.actionMap["ignore"] = "";
    this.state.actionMap["scale-up"] = "coldclone";
    this.state.actionMap["reboot"] = "filterreboot";
    this.state.actionMap["migrate"] = "dummy";
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      incident: nextProps.incident,
      projectName: nextProps.projectName
    };
  }

  handleActionChange(value) {
    this.setState({ action:value });
  }

  handleSubmit() {
    let {incident, projectName, action} = this.state;
    let operation = "dummy";
    let instanceId = undefined;
    if(this.state.actionMap[action]){
      operation = this.state.actionMap[action];
    }
    if(operation==""){
      alert("Ignoring this event.");
      return;
    }
    if(incident.anomalyMapJson){
      for(var k in incident.anomalyMapJson){
        if(!(operation=='filterreboot' && instanceId=='i-55d26464')){
          instanceId = k;
          break;
        }
      }
    }
    if(instanceId){
      apis.postAWSOperation(projectName, instanceId, operation).then((resp)=>{
        console.log(resp);
        if(resp.success){
          alert("Success: action "+action+" was sent to instance "+instanceId);
        }else{
          alert("Failed to send action "+action+" to instance "+instanceId);
        }
      });
    } else {
      alert("Cannot find instance to take action on.");
    }
  }

  render() {
    let { incident, action, ...rest} = this.props;
    return(
      <Modal {...rest} size="mini" closable={false}>
        <div className="content">
          <h5>Suggested action: </h5>
          <span className="code">{incident.rootCauseJson.suggestedActions}</span>
        </div>
        <div className="content">
          <h5>Take action on this event:</h5>
          <IncidentActionTaken value={action} onChange={(value)=>this.handleActionChange(value)}/>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              Confirm
            </div>
          </div>
        </div>
      </Modal>
      );
  }
}

export default TakeActionModal;
