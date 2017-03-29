import React, {Component} from 'react';
import cx from 'classnames';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
  LiveProjectSelection,
  ModelType,
  DurationThreshold,
  AnomalyThreshold
} from '../../selections';
import WaringButton from './waringButton';

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
      epsilon: 1.0,
      modelTypeTextMap: {}
    };
    this.state.modelTypeTextMap["Holistic"] = "Holistic";
    this.state.modelTypeTextMap["HolisticCP"] = "Holistic + Filtering";
    this.state.modelTypeTextMap["Split"] = "Split";
    this.state.modelTypeTextMap["Hybrid"] = "Hybrid";
    this.state.modelTypeTextMap["DBScan"] = "Clustering (DBScan)";
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => !(item.isStationary));
    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
  }

  handleProjectChange(value, projectName) {
    let { projectString, sharedProjectString } = this.context.dashboardUservalues;
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let cvalue = projectParam ? projectParam.cvalue : "0.99";
    let pvalue = projectParam ? projectParam.pvalue : "5";
    let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";
    let modelTypeText = (projectParam && projectParam.modelType) ? this.state.modelTypeTextMap[projectParam.modelType] : "Holistic";
    let project = undefined;
    if (projectString.length > 0) {
      project = projectString.split(',').map((s)=>s.split(":")).find((parts) => parts[0] == projectName);
    }
    if (sharedProjectString.length > 0 && project == undefined) {
      project = sharedProjectString.split(',').map((s)=>s.split(":")).find((parts) => (parts[0] + "@" + parts[3]) == projectName);
    }

    // 前三部分是名称，数据类型dataType和云类型cloudType
    let [name, dataType, cloudType] = project;
    let update = {
      projectName,
      modelType: modelType,
      modelTypeText: modelTypeText,
      anomalyThreshold: pvalue,
      durationThreshold: cvalue,
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
      case 'Log':
        update.projectType = `Log`;
        break;
      default:
        update.projectType = `${cloudType}/Agent`;
    }
    this.setState(update);
  }

  handleSubmit() {
    const { projectName, anomalyThreshold, durationThreshold, minPts, epsilon, modelType } = this.state;
    var url;
    if (modelType === 'DBScan') {
      url = '/liveMonitoring?pvalue=' + epsilon + '&cvalue=' + minPts +
        '&modelType=' + modelType + '&projectName=' + projectName;
    } else {
      url = '/liveMonitoring?pvalue=' + anomalyThreshold + '&cvalue=' + durationThreshold +
        '&modelType=' + modelType + '&projectName=' + projectName;
    }
    window.open(url, '_blank');
  }

  handleAdd() {
    const { modelType, anomalyThreshold, durationThreshold, minPts, epsilon, ...rest} = this.state;
    this.props.onSubmit && this.props.onSubmit({
      pvalue: modelType === 'DBScan' ? minPts : anomalyThreshold,
      cvalue: modelType === 'DBScan' ? epsilon : durationThreshold,
      modelType,
      ...rest
    });
  }

  render() {
    let { projectName, anomalyThreshold, durationThreshold, minPts, epsilon, projectType, modelType, modelTypeText } = this.state;
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
            <WaringButton labelStyle={labelStyle} labelTitle="Project Name" labelSpan="nickname of your cloud project."/>
            <LiveProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
          </div>
          <div className="field">
            <WaringButton labelStyle={labelStyle} labelTitle="Project Type" labelSpan="cloud type associated with this project."/>
            <div style={{ paddingTop: '0.5em', paddingLeft: '1em' }}>{projectType}</div>
          </div>
          <div className="field">
            <WaringButton labelStyle={labelStyle} labelTitle="Model Type" labelSpan="choose between the Holistic model type that uses a single model induced from all metrics, and the Split model type that uses a group of models, each induced from one metric."/>
            <ModelType value={modelType} text={modelTypeText}
                       onChange={(value, text)=> this.setState({ modelType: value, modelTypeText: text })}/>
          </div>
          {modelType == 'DBScan' ?
            <div className="field">
              <label style={labelStyle}>MinPts</label>
              <input type="text" defaultValue={minPts} onBlur={(e)=>this.setState({ minPts: e.target.value })}/>
            </div>
            :
            <div className="field">
              <WaringButton labelStyle={labelStyle} labelTitle="Anomaly Threshold" labelSpan="choose a number in [0,1) to configure the sensitivity of your anomaly detection tool. Lower values detect a larger variety of anomalies."/>
              <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({ anomalyThreshold: v })}/>
            </div>
          }
          {modelType == 'DBScan' ?
            <div className="field">
              <label style={labelStyle}>Epsilon</label>
              <input type="text" defaultValue={epsilon} onBlur={(e)=>this.setState({ epsilon: e.target.value })}/>
            </div>
            :
            <div className="field">
              <WaringButton labelStyle={labelStyle} labelTitle="Duration Threshold" labelSpan="number of minutes of continuous anomalies to trigger an alert."/>
              <DurationThreshold value={durationThreshold} onChange={(v, t)=>this.setState({ durationThreshold: t })}/>
            </div>
          }
          <div className="field">
            <Button className={submitStyle} style={{ marginTop: 20 }}
                    onClick={this.handleAdd.bind(this)}>Add</Button>
            <Button className={submitStyle} style={{ marginTop: 20 }}
                    onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}
