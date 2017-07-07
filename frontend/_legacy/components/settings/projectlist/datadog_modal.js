import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';
import apis from '../../../apis';


class DataDogProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
    }
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  handleSubmit() {
    let {projectName, instanceType, samplingInterval, appkey, apikey } = this.state;
    if(projectName==null){
      alert("Project name cannot be empty.");
      return false;
    }
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    this.props.onCancel();
    apis.postAddDataDogProject(projectName, instanceType, samplingInterval, appkey, apikey).then((resp)=> {
      if(resp.success) {
        window.alert(resp.message);
        this.context.root.loadData();
      } else {
        alert(resp.message);
      }
    }).catch((e)=> {
      console.error(e);
    });
  }

  render() {
    let self = this;
    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" onChange={(e)=>this.setState({projectName: e.target.value})}/>
            </div>
            <div className="field">
              <label>App Key*</label>
              <input type="text" name="appkey" onChange={(e)=>this.setState({appkey: e.target.value})}/>
            </div>
            <div className="field">
              <label>API Key*</label>
              <input type="text" name="apikey" onChange={(e)=>this.setState({apikey: e.target.value})}/>
            </div>
            <div className="field">
              <label>Sampling Interval</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({samplingInterval: e.target.value})}>
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
          <div className="ui button deny" onClick={()=>self.props.onCancel()}>Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              <i className="save icon"/>Register
            </div>
          </div>
        </div>
        <div>* Fields encrypted for extra security protection.</div>
      </Modal>
    )
  }
}

export default DataDogProjectModal;