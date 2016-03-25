import React from 'react';
import {Modal} from '../../../artui';


class AmazonProjectModal extends React.Component {
  render(){
    return (
      <Modal {...this.props}>
        <Modal.Header>
          Modal Title
        </Modal.Header>
        <Modal.ImageContent className="image content" style={{height: 500}}>
          <div className="image">
            An image can appear on left or an icon
          </div>
          <div className="description">
            A description can appear on the right
          </div>
        </Modal.ImageContent>
        <Modal.Actions>
          <Modal.ActionButton deny={true}>Cancel</Modal.ActionButton>
          <Modal.ActionButton approve={true}>OK</Modal.ActionButton>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AmazonProjectModal;