import React from 'react';
import { autobind } from 'core-decorators';
import { Button } from '../../../artui/react/index';

class Grouping extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      instanceGroupingArr: [],
    };
  }

  render() {
    const { instanceGroupingArr } = this.state;

    return (
      <div className="active ui tab">
        <h3>Instance Grouping Settings</h3>
        <div className="ui vertical segment">
          <table className="ui celled table grouping-table">
            <thead>
              <tr>
                <th>Instance ID</th>
                <th>Instance Name</th>
                <th>Environment</th>
                <th>Service Name</th>
                <th>Team</th>
                <th>Business Unit</th>
              </tr>
            </thead>
            <tbody>
              {instanceGroupingArr.map((grouping, index) => (
                <tr key={`${data.projectName}-${index}`}>
                  <td>{grouping.instanceId}</td>
                  <td><input value={grouping.instanceName}
                              onChange={this.handleValueChangeDummy('instanceName')}/></td>
                  <td><EnvironmentSelect key={data.projectName} value={grouping.environment}
                                          onChange={this.handleValueChangeDummy('environment')}
                                          style={{ width: '100%' }}/></td>
                  <td><input onChange={this.handleValueChangeDummy('service')}/></td>
                  <td><input onChange={this.handleValueChangeDummy('team')}/></td>
                  <td><input onChange={this.handleValueChangeDummy('businessUnit')}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button 
          className="blue" onClick={this.handleSaveMetricSetting.bind(this)}>Update Instance Grouping</Button>
      </div>
    );
  }
}

export default Grouping;
