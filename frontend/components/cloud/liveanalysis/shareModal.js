import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
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
      sharedUsernames: '',
      showOther: false,
      other: 'Unknown'
    };
  }

  handleSubmit() {
    
    let {name, description, system, showOther, other ,...rest} = this.state;
    let data = Object.assign({}, this.context.location.query, rest);
    let {dp} = this.props;
    
    // Change the datetime format to epoch
    data['startTime'] = new Date(data['startTime']).getTime();
    data['endTime'] = new Date(data['endTime']).getTime();
    data['modelStartTime'] = new Date(data['modelStartTime']).getTime();
    data['modelEndTime'] = new Date(data['modelEndTime']).getTime();
    
    data['metaData'] = JSON.stringify({
      name: name,
      desc: description,
      system: system == 'Other' ? other : system
    });
    
    data['gmpairs'] = dp ? JSON.stringify(dp.gmpairs) : null;
    data['rawData'] = dp ? dp.data.data : null;
    
    this.props.onSubmit && this.props.onSubmit(data);
  }

  handleCancel() {
    this.props.onCancel && this.props.onCancel();
  }
  
  handleSystemChange(v) {
    this.setState({
      system: v,
      showOther: v == 'Other'
    });
  }

  render() {
    let {showOther} = this.state;
    let disabled = !this.state.name || !this.state.description || !this.state.system;

    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="header">
          Please provide info on data
        </div>
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Incident name/bug ID</label>
              <input type="text" name="name" value={this.state.name}
                     onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
              <label>Incident description</label>
              <textarea type="text" row="4" name="name" value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}/>
            </div>
            <div className="field">
              <label>System</label>
              <Dropdown mode="select" value={this.state.system} onChange={this.handleSystemChange.bind(this)}>
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item" data-value="Cassandra">Cassandra</div>
                  <div className="item" data-value="Hadoop">Hadoop</div>
                  <div className="item" data-value="Other">Other</div>
                </div>
              </Dropdown>
            {showOther &&
              <div className="item">
              <input type="text" name="other" value={this.state.other}
                     onChange={(e) => this.setState({other: e.target.value})}/>
              </div>
            }
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
            <div className={cx('ui button orange submit', {disabled:disabled})} onClick={this.handleSubmit.bind(this)}>
              Share data
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ShareModal;