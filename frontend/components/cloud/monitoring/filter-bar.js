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
      modelType: 'Holistic',
      anomalyThreshold: 0.95,
      durationHours: 1,
      weeks: '1',
      startTime: moment().toDate(),
      endTime: moment().add(-1, 'w').toDate()
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    
    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
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
    const {projectName, anomalyThreshold, durationHours, projectType, modelType} = this.state;
    const labelStyle = {};
    const submitStyle = cx(
      'orange', {
        loading: this.props.loading,
        disabled: !projectName || !modelType
      }
    );

    return (
      <div className="ui form">
        <div className="six fields fill">
          <div className="field">
            <label style={labelStyle}>Project Name</label>
            <ProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Project Type</label>
            <div style={{paddingTop:'0.5em', paddingLeft:'1em'}}>{projectType}</div>
          </div>
          <div className="field">
            <label style={labelStyle}>Model Type</label>
            <ModelType value={modelType} onChange={(value, text)=> this.setState({modelType: text})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Anomaly Threshold</label>
            <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({anomalyThreshold: v})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration (Hour)</label>
            <DurationHour value={durationHours} onChange={(v, t)=>this.setState({durationHours: t})}/>
          </div>
          <div className="field">
            <Button className={submitStyle} style={{marginTop: 20}}
                    onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}
