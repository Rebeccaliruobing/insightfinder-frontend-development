import $ from 'jquery';
import React from 'react';
import {autobind} from 'core-decorators';
import {Modal} from '../../../artui/react';
import {Dropdown} from '../../../artui/react/index';
import apis from '../../../apis';


class AmazonProjectModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      hasAgentData:false,
      instanceType:[],
    }
  }

  componentDidMount() {
    if (this._dropdown) {
      $(this._dropdown).dropdown();
    }
  }

  handleSubmit() {
    let {projectName, instanceType, zone, access_key, secrete_key, hasAgentData} = this.state;
    if(projectName==null){
      alert("Project name cannot be empty.");
      return false;
    }
    if(/[\s_:@,]/g.test(projectName)){
      alert("Project name cannot contain _ : @ , or space.");
      return false;
    }

    apis.postAddAWSProject(projectName, instanceType.toString(), zone, access_key, secrete_key, hasAgentData).then((resp)=> {
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

  @autobind
  handleInstanceTypeChange(value, text){
    let { instanceType } = this.state;
    if(value){
      instanceType.push(text);
    } else if(!value){
      let index = instanceType.indexOf(text);
      if(index!=-1){
        instanceType.splice(index,1);
      }
    }
    this.setState({ instanceType });
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
              <label>Instance Type</label>
              <Dropdown mode="select" multiple={true} onChange={this.handleInstanceTypeChange} >
                <i className="dropdown icon" />
                <div className="menu">
                  <div className="item" data-value="EC2">EC2</div>
                  <div className="item" data-value="RDS">RDS</div>
                  <div className="item" data-value="DynamoDB">DynamoDB</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
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
            </div>
            <div className="field">
              <label>IAM Access Key ID*</label>
              <input type="text" name="access_id" onChange={(e)=>this.setState({access_key: e.target.value})}/>
            </div>
            <div className="field">
              <label>Secret Access Key*</label>
              <input type="text" name="access_key" onChange={(e)=>this.setState({secrete_key: e.target.value})}/>
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

export default AmazonProjectModal;
