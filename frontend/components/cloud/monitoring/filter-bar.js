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
      modelTypeText: 'Holistic',
      anomalyThreshold: 0.99,
      durationThreshold: 5,
      minPts: 5,
      epsilon: 1.0
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
    let {projectString, sharedProjectString} = this.context.dashboardUservalues;
    let project = undefined;
    if(projectString.length>0){
      project = projectString.split(',').map((s)=>s.split(":")).find((parts) => parts[0] == projectName);
    }
    if(sharedProjectString.length>0 && project==undefined){
      project = sharedProjectString.split(',').map((s)=>s.split(":")).find((parts) => (parts[0]+"@"+parts[3]) == projectName);
    }
    
    // 前三部分是名称，数据类型dataType和云类型cloudType
    let [name, dataType, cloudType] = project;
    let update = {
      projectName,
      modelType: 'Holistic',
      modelTypeText: 'Holistic',
      anomalyThreshold: 0.99,
      durationThreshold: 5,
      minPts: 5,
      epsilon: 1.0
    };
    switch (dataType) {
      case 'AWS':
      case 'EC2':
      case 'RDS':
      case 'DynamoDB':
        update.projectType = `${dataType}/CloudWatch`;
      case 'GAE':
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
    const {projectName, anomalyThreshold, durationThreshold,minPts,epsilon,projectType, modelType} = this.state;
    var url;
    if(modelType=='DBScan'){
      url = '/liveMonitoring?anomalyThreshold='+epsilon+'&durationThreshold='+minPts+'&modelType='+modelType+'&projectName='+projectName;
    } else {
      url = '/liveMonitoring?anomalyThreshold='+anomalyThreshold+'&durationThreshold='+durationThreshold+'&modelType='+modelType+'&projectName='+projectName;
    }
    window.open(url,'_blank');
  }
  
  handleAdd() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    let {projectName, anomalyThreshold, durationThreshold, minPts,epsilon,projectType, modelType, modelTypeText} = this.state;
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
            <ModelType value={modelType} text={modelTypeText} onChange={(value, text)=> this.setState({modelType: value, modelTypeText: text})}/>
          </div>
          {modelType == 'DBScan'?
            <div className="field">
              <label style={labelStyle}>MinPts</label>
              <input type="text" defaultValue={minPts} onBlur={(e)=>this.setState({minPts:e.target.value})}/>
            </div>
            :
            <div className="field">
              <label style={labelStyle}>Anomaly Threshold</label>
              <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({anomalyThreshold: v})}/>
            </div>
          }
          {modelType == 'DBScan'?
            <div className="field">
              <label style={labelStyle}>Epsilon</label>
              <input type="text" defaultValue={epsilon} onBlur={(e)=>this.setState({epsilon:e.target.value})}/>
            </div>
            :
            <div className="field">
              <label style={labelStyle}>Duration Threshold</label>
              <DurationThreshold value={durationThreshold} onChange={(v, t)=>this.setState({durationThreshold: t})}/>
            </div>
          }
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
