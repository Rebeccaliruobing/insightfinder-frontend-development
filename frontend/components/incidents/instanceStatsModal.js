import React from 'react';
import {autobind} from 'core-decorators';
import shallowCompare from 'react-addons-shallow-compare';
import {Modal} from '../../artui/react';
import DataParser from '../cloud/dataparser';
import {DataChart} from '../share/charts';
import apis from '../../apis';
import CPUUtilization from '../statistics/cpu-utilization';
import InstanceUptime from '../statistics/instance-uptime';

class InstanceMetricModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      instanceStats: props.instanceStats,
      dur: props.dur,
      instanceName: props.instanceName,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.setState({
      instanceStats:this.props.instanceStats,
      dur:this.props.dur,
      instanceName: this.props.instanceName,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      instanceStats:nextProps.instanceStats,
      dur:nextProps.dur,
      instanceName: nextProps.instanceName,
    })
  }

  render() {
    const { onClose } = this.props;
    const { instanceStats,dur,instanceName } = this.state;
    return (
      <Modal closable={true} onClose={onClose} style={{padding:20}}>
        <h4>Instance Level Stats for {instanceName}</h4>
        <div className="ui compact grid eight wide column ">
          <CPUUtilization average={instanceStats['AvgCPUUtilization']} width='four' type='avg' duration={dur+'d'} />
          <CPUUtilization average={instanceStats['MinCPUUtilization']} width='four' type='min' duration={dur+'d'} />
          <CPUUtilization average={instanceStats['MaxCPUUtilization']} width='four' type='max' duration={dur+'d'} />
          <InstanceUptime average={instanceStats['AvgInstanceUptime']} width='four' duration={dur+'d'} />
        </div>
      </Modal>
    )
  }
}

export default InstanceMetricModal;
