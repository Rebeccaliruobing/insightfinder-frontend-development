import React, {Component} from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
  ProjectSelection,
  ModelType,
  DurationHour,
  AnomalyThreshold
} from '../../selections';

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      projectName: undefined,
      projectType: undefined,
      weeks: '1',
      startTime: moment().toDate(),
      endTime: moment().add(-1, 'w').toDate()
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    if (projects.length > 0) this.handleProjectChange(projects[0].projectName, projects[0].projectName);
  }

  handleProjectChange(value, projectName) {
    let {projectString, incidentAllInfo, dataAllInfo} = this.context.dashboardUservalues;
    let project = projectString.split(',').map((s)=>s.split(":")).find(([name]) => name == projectName);
    // 前三部分是名称，数据类型dataType和云类型cloudType
    let [name, dataType, cloudType] = project;
    let update = {projectName};
    switch (dataType) {
      case 'AWS':
        update.projectType = "AWS/CloudWatch";
        break;
      case 'GAE':
        update.projectType = `${dataType}/CloudMonitoring`;
        break;
      case 'GCE':
        update.projectType = `${dataType}/CloudMonitoring`;
        break;
      default:
        update.projectType = `${cloudType}/Agent`;
    }
    this.setState(update);
  }

  handleEndTimeChange(endTime) {
    let {weeks} = this.state;
    this.setState({
      startTime: moment(endTime).add(-weeks, 'w').toDate(),
      endTime
    })
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    const {projectName, anomalyThreshold, durationHours, projectType} = this.state;
    const labelStyle = {};

    return (
      <div className="ui form">
        <div className="five fields fill">
          <div className="field">
            <label style={labelStyle}>Project Name</label>
            <ProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Project Type</label>
            <div className="ui input">
              <input type="text" disabled value={projectType}/>
            </div>
          </div>
          <div className="field">
            <label style={labelStyle}>Model Type</label>
            <ModelType onChange={(value, text)=> this.setState({modelType: text})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Anomaly Threshold</label>
            <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({anomalyThreshold: t})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration (Hour)</label>
            <DurationHour value={durationHours} onChange={(v, t)=>this.setState({durationHours: t})}/>
          </div>

        </div>

        <div className="ui field">
          <Button className="orange" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        </div>
      </div>
    )
  }
}
