import $ from 'jquery';
import React from 'react';
import store from 'store';
import moment from 'moment';

import {Modal, Dropdown} from '../../../artui/react/index';


class ShareModal extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      system: undefined,
      ownerOnly: false,
      sharedUsernames: ''
    };
  }

  handleSubmit() {
    let data = Object.assign({}, this.context.location.query, {metaData: this.state});
    // Change the datetime format
    data['startTime'] = new Date(data['startTime']);
    data['endTime'] = new Date(data['endTime']);
    data['modelStartTime'] = new Date(data['modelStartTime']);
    data['modelEndTime'] = new Date(data['modelEndTime']);
    
    console.log(data);
    this.props.onSubmit && this.props.onSubmit(data);
  }

  handleCancel() {
    this.props.onCancel && this.props.onCancel();
  }

  render() {

    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="header">
          Please provide info on data
        </div>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Incident name/bug ID</label>
              <input type="text" name="name" placeholder="name" value={this.state.name}
                     onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
              <label>Incident description</label>
              <textarea type="text" name="name" placeholder="description" value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}/>
            </div>
            <div className="field">
              <label>Special system</label>
              <Dropdown mode="select" value={this.state.system} onChange={(v)=>this.setState({system: v})}>
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item" data-value="Cassandra">Cassandra</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <input type="checkbox" value={this.state.ownerOnly}
                     onChange={(e) => this.setState({ownerOnly: e.target.checked})}/>
              &nbsp;&nbsp;Visible to owner only
            </div>
            <div className="field">
              <label>Share group(Comma separated list)</label>
              <input type="text" name="name" placeholder="Shared usernames" value={this.state.sharedUsernames}
                     onChange={(e) => this.setState({sharedUsernames: e.target.value})}/>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny" onClick={this.handleCancel.bind(this)}>Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              Share data
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ShareModal;