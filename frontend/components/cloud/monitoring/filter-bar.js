import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
  LiveProjectSelection,
  ModelType,
  DurationThreshold,
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
      anomalyThreshold: 0.99,
      durationThreshold: 5
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item,index) => !(item.isStationary));
    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
  }

  handleProjectChange(value, projectName) {
    let {projectString} = this.context.dashboardUservalues;
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

  handleSubmit() {
    //this.props.onSubmit && this.props.onSubmit(this.state);
    const {projectName, anomalyThreshold, durationThreshold, projectType, modelType} = this.state;
    var url = '/liveMonitoring?anomalyThreshold='+anomalyThreshold+'&durationThreshold='+durationThreshold+'&modelType='+modelType+'&projectName='+projectName;
    window.open(url,'_blank');
  }
  
  handleAdd() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    const {projectName, anomalyThreshold, durationThreshold, projectType, modelType} = this.state;
    const labelStyle = {};
    const submitStyle = cx(
      'orange', {
        disabled: !projectName || !modelType
      }
    );

    return (
      <div className="ui form">
        <div className="six fields fill">
          <div className="field">
            <label style={labelStyle}>Project Name</label>
            <LiveProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
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
            <label style={labelStyle}>Duration Threshold</label>
            <DurationThreshold value={durationThreshold} onChange={(v, t)=>this.setState({durationThreshold: t})}/>
          </div>
          <div className="field">
            <Button className={submitStyle} style={{marginTop: 20}}
                    onClick={this.handleAdd.bind(this)}>Add</Button>
            <Button className={submitStyle} style={{marginTop: 20}}
                    onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}
