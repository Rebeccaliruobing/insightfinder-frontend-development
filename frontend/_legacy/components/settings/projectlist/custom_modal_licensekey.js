import $ from 'jquery';
import React from 'react';
import {Modal} from '../../../artui/react/index';
import apis from '../../../apis';


class CustomProjectLicenseKeyModal extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {licenseKeyMessage} = this.props;
    this.setState({message:licenseKeyMessage});
  }

  handleClose(){
    this.context.root.loadData();
  }

  render() {
    let {licenseKeyMessage} = this.props;
    let message = licenseKeyMessage;
    if (message) {
      return (
        <Modal {...this.props} size="small" closable={true} onClose={this.handleClose.bind(this)}>
          <div className="content">
            {message}
          </div>
        </Modal>
      );
    }
  }
}

export default CustomProjectLicenseKeyModal;