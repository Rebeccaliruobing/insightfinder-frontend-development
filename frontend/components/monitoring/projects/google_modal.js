import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react';


class GoogleProjectModal extends React.Component {
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
      <Modal {...this.props} size="small" closable={false}>
        <Modal.Content>
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" />
            </div>
            <div className="field">
              <label>Project ID</label>
              <input type="text" name="project_id" />
            </div>
            <div className="field">
              <label>Project Type</label>
              <div className="ui selection dropdown" ref={c => this._dropdown = c}>
                <input name="type" type="hidden" value="0,1" />
                <i className="dropdown icon" />
                <span className="default text" />
                <div className="menu">
                  <div className="item">GAE</div>
                  <div className="item">GCE</div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Service Account Email</label>
              <input type="text" name="email" />
            </div>
            <div className="field">
              <label>.p12 key file</label>
              <input type="text" name="p12" />
            </div>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Modal.ActionButton deny={true}>Cancel</Modal.ActionButton>
          <Modal.ActionButton
            approve={true} className="labeled">
            <div className="ui button orange">
              <i className="save icon"></i>Register
            </div>
          </Modal.ActionButton>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default GoogleProjectModal;