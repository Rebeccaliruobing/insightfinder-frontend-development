import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';
import apis from '../../../apis';


class SlackModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._dropdown = null;
    this.state = {
      account:"",
      webhook:""
    }
  }

  componentDidMount() {
  }

  handleSubmit() {
    let { account, webhook } = this.state;
    if(account.length==0){
      alert("Empty account.");
      return false;
    }
    if(webhook.length==0){
      alert("Empty webhook.");
      return false;
    }
    apis.registerExternalService(account, webhook, "addSlack").then((resp)=> {
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
      <Modal {...this.props} closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Type</label>
              <input type="text" name="name" size="75" onChange={(e)=>this.setState({account: e.target.value})} 
                placeholder="eg. 'private' or '#general' or '@team'" />
            </div>
            <div className="field">
              <label>Webhook</label>
              <input type="text" name="name" size="75" onChange={(e)=>this.setState({webhook: e.target.value})}
                placeholder="https://hooks.slack.com/services/..." />
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
      </Modal>
    )
  }
}

export default SlackModal;