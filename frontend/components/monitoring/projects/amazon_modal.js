import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';


class AmazonProjectModal extends React.Component {
  constructor(props){
    super(props);
    this._dropdown = null;
  }

  componentDidMount() {
    if(this._dropdown){
      $(this._dropdown).dropdown();
    }
  }

  render(){
    return (
      <Modal {...this.props} size="small" closable={true}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" />
            </div>
            <div className="field">
              <label>AWS Access ID</label>
              <input type="text" name="access_id" />
            </div>
            <div className="field">
              <label>Secret Access Key</label>
              <input type="text" name="access_key" />
            </div>
            <div className="field">
              <label>Availability Zone</label>
              <div className="ui selection dropdown" ref={c => this._dropdown = c}>
                <input name="gender" type="hidden" value="0,1" />
                <i className="dropdown icon" />
                <span className="default text" />
                <div className="menu">
                  <div className="item">us-east-1</div>
                  <div className="item">us-west-1</div>
                  <div className="item">us-west-2</div>
                  <div className="item">ap-northeast-1</div>
                  <div className="item">ap-southeast-1</div>
                  <div className="item">ap-southeast-2</div>
                  <div className="item">eu-central-1</div>
                  <div className="item">eu-west-1</div>
                  <div className="item">sa-east-1</div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange">
              <i className="save icon"/>Register
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default AmazonProjectModal;