/* eslint-disable react/prop-types */
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CausalGraph from '../display-model/CausalGraph';
import { Modal } from '../../../artui/react';

class TenderModal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { dataArray, startTimestamp, endTimestamp, types, ...rest } = this.props;
    if (dataArray && types) {
      return (
        <Modal {...rest} size="big" closable>
          <div className="content">
            <CausalGraph
              dataArray={dataArray} types={types}
              startTimestamp={startTimestamp} endTimestamp={endTimestamp}
            />
          </div>
        </Modal>
      );
    }
    return null;
  }
}

export default TenderModal;
