import React from 'react';
import {BaseComponent, PropTypes, Accordion, Table} from '../../../artui/react';

class ProjectMetric extends BaseComponent {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.projectData =[{
      name: 'i-8c48fa0c',
      cpu: [0.00, 0.334, 0.0375, 0.0331],
      diskReadOps: [0.00, 0.0, 0.0, 0.0],
      diskWriteOps: [0.00, 0.0, 0.0, 0.0],
      networkIn: [0.00, 0.0, 0.0, 0.0],
      networkOut: [0.00, 0.0, 0.0, 0.0],
      diskReadBytes: [0.00, 0.0, 0.0, 0.0],
      diskWriteBytes: [0.00, 0.0, 0.0, 0.0]
    }, {
      name: 'i-fdb1a64e',
      cpu: [0.00, 0.334, 0.0375, 0.0331],
      diskReadOps: [0.00, 0.0, 0.0, 0.0],
      diskWriteOps: [0.00, 0.0, 0.0, 0.0],
      networkIn: [0.00, 0.0, 0.0, 0.0],
      networkOut: [0.00, 0.0, 0.0, 0.0],
      diskReadBytes: [0.00, 0.0, 0.0, 0.0],
      diskWriteBytes: [0.00, 0.0, 0.0, 0.0]
    }];

    this.state =  {
    }
  }

  renderRow(instance) {
    return [
      <td key="inst">{instance.name}</td>,
      <td key="cpu_min">{instance.cpu[0]}</td>,
      <td key="cpu_max">{instance.cpu[1]}</td>,
      <td key="cpu_avg">{instance.cpu[2]}</td>,
      <td key="cpu_std">{instance.cpu[3]}</td>,
      <td key="disk_read_ops_min" className="negative">{instance.diskReadOps[0]}</td>,
      <td key="disk_read_ops_max">{instance.diskReadOps[1]}</td>,
      <td key="disk_read_ops_avg">{instance.diskReadOps[2]}</td>,
      <td key="disk_read_ops_std">{instance.diskReadOps[3]}</td>,
      <td key="disk_write_ops_min">{instance.diskWriteOps[0]}</td>,
      <td key="disk_write_ops_max">{instance.diskWriteOps[1]}</td>,
      <td key="disk_write_ops_avg">{instance.diskWriteOps[2]}</td>,
      <td key="disk_write_ops_std">{instance.diskWriteOps[3]}</td>,
      <td key="network_in_min" className="warning">{instance.networkIn[0]}</td>,
      <td key="network_in_max">{instance.networkIn[1]}</td>,
      <td key="network_in_avg">{instance.networkIn[2]}</td>,
      <td key="network_in_std">{instance.networkIn[3]}</td>,
      <td key="network_out_min">{instance.networkOut[0]}</td>,
      <td key="network_out_max">{instance.networkOut[1]}</td>,
      <td key="network_out_avg">{instance.networkOut[2]}</td>,
      <td key="network_out_std">{instance.networkOut[3]}</td>,
      <td key="disk_read_bytes_min">{instance.diskReadBytes[0]}</td>,
      <td key="disk_read_bytes_max">{instance.diskReadBytes[1]}</td>,
      <td key="disk_read_bytes_avg">{instance.diskReadBytes[2]}</td>,
      <td key="disk_read_bytes_std">{instance.diskReadBytes[3]}</td>,
      <td key="disk_write_bytes_min">{instance.diskWriteBytes[0]}</td>,
      <td key="disk_write_bytes_max">{instance.diskWriteBytes[1]}</td>,
      <td key="disk_write_bytes_avg">{instance.diskWriteBytes[2]}</td>,
      <td key="disk_write_bytes_std">{instance.diskWriteBytes[3]}</td>
    ]
  }

  renderRows() {
    let {projects} = this.props;
    let rows = [];

    projects.map((project, index) => {
      let instances = this.projectData;
      if (instances.length > 0) {

        rows.push((
          <tr key={project + '_' + instances[0].name}>
            <td rowSpan={instances.length}>{project}</td>
            {this.renderRow(instances[0])}
          </tr>
        ));

        for(let i = 1; i < instances.length; ++i) {
          rows.push((
            <tr key={project + '_' + instances[i].name}>
              {this.renderRow(instances[i])}
            </tr>
          ));
        }
      }
    });

    return rows;
  }

  render() {
    return (
      <div className="ui vertical segment" style={{width: '100%', overflowX: 'scroll'}}>
        <Accordion>
          <div className="active title">
            <i className="dropdown icon"/>
            AWS/CloudWatch
          </div>
          <div className="active content">
            <Table className="selectable single line striped celled structured">
              <thead>
              <tr>
                <th rowSpan="2">Project</th>
                <th rowSpan="2">Instance</th>
                <th colSpan="4">CPU Utilization (%)</th>
                <th colSpan="4">Disk Read Ops</th>
                <th colSpan="4">Disk Write Ops</th>
                <th colSpan="4">Network In (bytes)</th>
                <th colSpan="4">Network Out (bytes)</th>
                <th colSpan="4">Disk Read Bytes</th>
                <th colSpan="4">Disk Write Bytes</th>
              </tr>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
              </tr>
              </thead>
              <tbody>
              {this.renderRows()}
              </tbody>
            </Table>
          </div>
        </Accordion>
      </div>
    )
  }
}

export default ProjectMetric;