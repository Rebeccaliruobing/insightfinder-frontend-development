import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import CausalGraph from '../display-model/CausalGraph'
import {Modal} from '../../../artui/react';

class TenderModal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {dataArray, startTimestamp, endTimestamp, types, ...rest} = this.props;
    if (dataArray && types) {
      return (
        <Modal {...rest} size="big" closable={true}>
          <div className="content">
            <CausalGraph dataArray={dataArray}
                         types={types}
                         endTimestamp={endTimestamp}
                         startTimestamp={startTimestamp}/>
          </div>
        </Modal>
      );
    }
  }
}

export default TenderModal;
