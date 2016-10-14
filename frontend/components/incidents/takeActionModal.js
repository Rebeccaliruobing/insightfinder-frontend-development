import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {Modal,Dropdown} from '../../artui/react';
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
      instanceId: undefined,
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
      projectName: nextProps.projectName,
      action: "ignore",
      instanceId: undefined,
    };
  }

  handleActionChange(value) {
    this.setState({ action:value });
  }

  handleSubmit() {
    let {incident, projectName, instanceId, action} = this.state;
    let operation = "dummy";
    if(this.state.actionMap[action]){
      operation = this.state.actionMap[action];
    }
    if(operation==""){
      alert("Ignoring this event.");
      return;
    }
    if(!instanceId && incident.anomalyMapJson){
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

  // .sort(function (a, b) {
  //             // reverse ordering
  //             let aid = parseInt(a.count);
  //             let bid = parseInt(b.count);
  //             if (aid < bid) {
  //               return 1;
  //             } else if (aid > bid) {
  //               return -1;
  //             } else {
  //               return 0;
  //             }
  //           })

  render() {
    let { incident, action, instanceId, ...rest} = this.props;
    let instances = Object.keys(incident.rootCauseByInstanceJson);
    let actions = [];
    _.forEach(incident.suggestedActionsByInstanceJson, function (saInstance, key) {
      let pos1 = saInstance.indexOf(" on ");
      let pos2 = saInstance.indexOf(" instanceId ");
      let tagName = "N/A";
      let action = "";
      if(pos1!=-1){
        tagName = saInstance.substring(pos1+4,pos2);
        action = saInstance.substring(2,pos1);
      }else{
        action = saInstance.substring(2,pos2);
      }
      actions.push({
        action:action,
        instanceId:key,
        instanceName:tagName,
      });
    });
    return(
      <Modal {...rest} size="small" closable={false}>
        <div className="content">
          <h5>Suggested action: </h5>
          <table className="ui small table">
            <tbody>
            <tr className="bold">
              <td>Suggested Action</td>
              <td>Instance Name</td>
              <td>Instance ID</td>
            </tr>
            {actions.map((action, i) => {
              return (
                <tr key={i}>
                  <td>{action.action}</td>
                  <td>{action.instanceName}</td>
                  <td>{action.instanceId}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <div className="content" style={{padding:20}}>
          <h5>Take action on this event:</h5>
          <div style={{display:'flex'}}>
            <div className="content" style={{padding:10}}>
              <div>Action</div>
              <IncidentActionTaken value={action} onChange={(value)=>this.handleActionChange(value)} style={{minWidth: 170}} />
            </div>
            <div className="content" style={{padding:10}}>
              <div>Instance Id</div>
              <Dropdown mode="select" value={instanceId} text={instanceId}
                        onChange={(v, t) => this.setState({instanceId: v})}  
                        style={{minWidth: 170}}>
                <i className="dropdown icon"/>
                <div className="menu">
                  {instances.map((instance, index) => {
                    return <div className="item">{instance}</div>
                  })}
                </div>
              </Dropdown>
            </div>
          </div>
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
