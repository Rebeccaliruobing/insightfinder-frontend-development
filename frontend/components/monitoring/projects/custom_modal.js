import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react/index';
import apis from '../../../apis';


class CustomProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };
  
  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      projectCloudType:""
    };
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  handleSubmit() {
    let {projectName, projectCloudType, samplingInterval, zone, access_key, secrete_key} = this.state;
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    apis.postAddCustomProject(projectName, projectCloudType, samplingInterval, zone, access_key, secrete_key).then((resp)=> {
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
    let {projectCloudType} = this.state;
    let disabledInterval=(projectCloudType=="LogFile");
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