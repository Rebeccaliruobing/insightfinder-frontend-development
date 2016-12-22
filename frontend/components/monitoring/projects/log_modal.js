import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react/index';
import apis from '../../../apis';


class LogProjectModal extends React.Component {
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
    if(projectName==null){
      alert("Project name cannot be empty.");
      return false;
    }
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    apis.postAddLogProject(projectName, projectCloudType, samplingInterval, zone, access_key, secrete_key).then((resp)=> {
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

export default LogProjectModal;