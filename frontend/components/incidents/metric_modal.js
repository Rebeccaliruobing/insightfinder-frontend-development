import React from 'react';
import {autobind} from 'core-decorators';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';
import {Modal} from '../../artui/react';
import DataParser from '../cloud/dataparser';
import {DataChart} from '../share/charts';
import apis from '../../apis';

class MetricModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  calculateData(data, instanceName) {
    const dp = new DataParser(data, instanceName);
    dp.getMetricsData();
    const groups = dp.groupsData;
    return groups && groups.length > 0 ? groups[0] : null;
  }

  componentDidMount() {
    let { projectName, startTimestamp, endTimestamp, instanceName, metricName } = this.props;
    apis.postProjectData(
      projectName, undefined, undefined, startTimestamp, endTimestamp, undefined,
      instanceName, metricName, undefined)
      .then(resp => {
        if (resp.success) {
          const data = this.calculateData(resp.data, instanceName);
          console.log(data);
          this.setState({ data });
        } else {
          console.error(resp.message);
        }
      })
      .catch(msg=> {
        console.error(msg);
      });
  }

  render() {
    const { onClose } = this.props;
    const { data } = this.state;
    const classes = cx('content', data ? '' : 'ui form loading');
    return (
      <Modal closable={true} onClose={onClose}>
        <div className={classes} style={{ height: 300 }}>
          {data &&
          <div className="ui header">{`Metric ${data.metrics}`}</div>
          }
          {data  &&
          <DataChart data={data}/>
          }
        </div>
      </Modal>
    )
  }
}

export default MetricModal;
