import React from 'react';
import CausalGraph from '../display-model/CausalGraph'

import {Modal} from '../../../artui/react';

class TenderModal extends React.Component {

  shouldComponentUpdate(nextProps, extState) {
    return nextProps.dataArray !== this.props.dataArray ||
      nextProps.types !== this.props.types;
  }

  render() {
    let {dataArray, types} = this.props;
    if (dataArray && types) {
      return (
        <Modal {...this.props} size="big" closable={true}>
          <div className="content">
            <CausalGraph dataArray={dataArray} types={types}/>
          </div>
        </Modal>
      );
    }
  }
}

export default TenderModal;
