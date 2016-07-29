import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';
import apis from '../../../apis';


class AmazonProjectModal extends React.Component {
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
    let {projectName, zone, instanceType, access_key, secrete_key, hasAgentData} = this.state;
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }
    apis.postAddAWSProject(projectName, zone, instanceType, access_key, secrete_key, hasAgentData).then((resp)=> {
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
              <select className="ui dropdown" onChange={(e)=>this.setState({instanceType: e.target.value})}>
                <option className="item"></option>
                <option className="item" value='EC2'>EC2</option>
                <option className="item" value='RDS'>RDS</option>
                <option className="item" value='DynamoDB'>DynamoDB</option>
              </select>
            </div>
            <div className="field">
              <label>Availability Zone</label>
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
            </div>
            <div className="field">
              <label>IAM Access Key ID*</label>
              <input type="text" name="access_id" onChange={(e)=>this.setState({access_key: e.target.value})}/>
            </div>
            <div className="field">
              <label>Secret Access Key*</label>
              <input type="text" name="access_key" onChange={(e)=>this.setState({secrete_key: e.target.value})}/>
            </div>
            <div className="inline field" style={{fontSize: 13}}>
              <div className="ui checkbox">
                <input type="checkbox" tabIndex="0"
                       onChange={(e) => this.setState({hasAgentData: e.target.checked})} />
                <label>Enable agent monitoring</label>
              </div>
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
        <div>* Fields encrypted for extra security protection.</div>
      </Modal>
    )
  }
}

export default AmazonProjectModal;