import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {Modal} from '../../artui/react';
import {IncidentActionTaken} from '../selections';

class TakeActionModal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleSubmit() {
  }

  render() {
    let { incident, ...rest} = this.props;
    return(
      <Modal {...rest} size="mini" closable={false}>
        <div className="content">
          Take action on this event: <br/>
          <IncidentActionTaken/>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              Confirm
            </div>
          </div>
        </div>
      </Modal>
      );
  }
}

export default TakeActionModal;
