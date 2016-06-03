import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react/index';


class CustomProjectModal extends React.Component {
  constructor(props){
    super(props);
    this._dropdown = null;
  }

  componentDidMount() {
    if(this._dropdown){
      $(this._dropdown).dropdown();
    }
  }

  handleSubmit() {
    alert(JSON.stringify(this.state));
  }

  render(){
    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Project Name</label>
              <input type="text" name="name" onChange={(e)=>this.setState({projectName: e.target.value})}/>
            </div>
            <div className="field">
              <label>Project Type (Optional)</label>

              <select className="ui dropdown" onChange={(e)=>this.setState({projectName: e.target.value})}>
                  <option className="item" value="AWS">AWS</option>
                  <option className="item" value="GAE">GAE</option>
                  <option className="item" value="GCE">GCE</option>
                  <option className="item" value="private cloud">Private Cloud</option>
              </select>

            </div>
            <div className="field">
              <label>Sampling Interval (Optional)</label>
              <select className="ui dropdown" onChange={(e)=>this.setState({projectName: e.target.value})}>
                  <option className="item" value="1">1 minute</option>
                  <option className="item" value="5">5 minutes</option>
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