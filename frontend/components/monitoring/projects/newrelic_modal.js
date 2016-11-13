import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';
import apis from '../../../apis';


class NewRelicProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      hasAgentData:false
    }
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  handleSubmit() {
    let {projectName, instanceType, zone, access_key, secrete_key, hasAgentData} = this.state;
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    alert("This feature is coming soon...");
    this.props.onCancel();
    // apis.postAddAWSProject(projectName, instanceType, zone, access_key, secrete_key, hasAgentData).then((resp)=> {
    //   if(resp.success) {
    //     window.alert(resp.message);
    //     this.context.root.loadData();
    //   } else {
    //     alert(resp.message);
    //   }
    // }).catch((e)=> {
    //   console.error(e);
    // });
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
              <label>API Key*</label>
              <input type="text" name="api_key" onChange={(e)=>this.setState({api_key: e.target.value})}/>
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

export default NewRelicProjectModal;