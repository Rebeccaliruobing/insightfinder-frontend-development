import $ from 'jquery';
import React from 'react';
import {autobind} from 'core-decorators';
import {Modal,Dropdown} from '../../../artui/react/index';
import apis from '../../../apis';


class CustomProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      projectName:"",
      projectCloudType:"",
      processName:"",
      dataType:[],
    };
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  @autobind
  handleDataTypeChange(value, text){
    let { dataType } = this.state;
    if(value){
      dataType.push(text);
    } else if(!value){
      let index = dataType.indexOf(text);
      if(index!=-1){
        dataType.splice(index,1);
      }
    }
    this.setState({ dataType });
  }

  handleSubmit() {
    let {projectName, projectCloudType, dataType, samplingInterval, zone, access_key, secrete_key, processName} = this.state;
    if(projectName==null){
      alert("Project name cannot be empty.");
      return false;
    }
    let dataTypeString = dataType.sort().toString().replace(",","+");
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    apis.postAddCustomProject(projectName, projectCloudType, dataTypeString, samplingInterval, zone, access_key, secrete_key, processName).then((resp)=> {
      if(resp.success) {
        window.alert(resp.message);
        // this.setState({message:resp.message});
        // this.props.onSubmit && this.props.onSubmit(this.state);
        this.context.root.loadData();
      } else {
        alert(resp.message);
      }
    }).catch((e)=> {
      console.error(e);
    });
  }

  render() {
    let {projectCloudType,dataType} = this.state;
    let disabledInterval=(projectCloudType=="LogFile")||(dataType.length==1&&dataType.indexOf('Log')!=-1);
    let enableProcessName = (dataType.indexOf("SysCall")!=-1);
    if(projectCloudType=="MetricFile"){
      disabledInterval = false;
    }
    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" onChange={(e)=>this.setState({projectName: e.target.value})}/>
            </div>
            <div className="field">
              <label>Instance Type</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({projectCloudType: e.target.value})}>
                <option className="item">Instance Type</option>
                <option className="item" value="AWS">AWS</option>
                <option className="item" value="GCE">GCE</option>
                <option className="item" value="PrivateCloud">Private Cloud</option>
                <option className="item" value="MetricFile">Metric File Replay</option>
                <option className="item" value="LogFile">Log File Replay</option>
              </select>
            </div>
            <div className="field">
              <label>Data Type</label>
              <Dropdown mode="select" multiple={true} onChange={this.handleDataTypeChange} >
                <i className="dropdown icon" />
                <div className="menu">
                  <div className="item" data-value="Metric">Metric</div>
                  <div className="item" data-value="Log">Log</div>
                  <div className="item" data-value="SysCall">SysCall</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label>Sampling Interval</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({samplingInterval: e.target.value})} disabled={disabledInterval}>
                <option className="item">Sampling Interval</option>
                <option className="item" value="1">1 minute</option>
                <option className="item" value="5">5 minutes</option>
                <option className="item" value="10">10 minutes</option>
                <option className="item" value="15">15 minutes</option>
                <option className="item" value="30">30 minutes</option>
                <option className="item" value="60">60 minutes</option>
              </select>
            </div>
            {projectCloudType=="AWS" && <div className="field">
              <label>IAM Access Key ID*</label>
              <input type="text" name="access_id" onChange={(e)=>this.setState({access_key: e.target.value})}/>
            </div>}
            {projectCloudType=="AWS" && <div className="field">
              <label>Secret Access Key*</label>
              <input type="text" name="access_key" onChange={(e)=>this.setState({secrete_key: e.target.value})}/>
            </div>}
            {projectCloudType=="AWS" && <div className="field">
              <label>Region</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({zone: e.target.value})}>
                <option className="item"></option>
                <option className="item" value="us-east-1">us-east-1</option>
                <option className="item" value="us-west-1">us-west-1</option>
                <option className="item" value="us-west-2">us-west-2</option>
                <option className="item" value="eu-west-1">eu-west-1</option>
                <option className="item" value="eu-central-1">eu-central-1</option>
                <option className="item" value="ap-northeast-1">ap-northeast-1</option>
                <option className="item" value="ap-northeast-2">ap-northeast-2</option>
                <option className="item" value="ap-southeast-1">ap-southeast-1</option>
                <option className="item" value="ap-southeast-2">ap-southeast-2</option>
                <option className="item" value="sa-east-1">sa-east-1</option>
              </select>
            </div>}
            {enableProcessName ? <div className="field">
              <label>Process Names (comma separated)</label>
              <label>eg. "httpd,apache"</label>
              <input type="text" name="processName" onChange={(e)=>this.setState({processName: e.target.value})}/>
            </div> : null}
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              <i className="save icon"/>Register
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default CustomProjectModal;
