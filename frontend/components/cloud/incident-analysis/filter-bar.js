import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
  ProjectSelection,
  ModelType,
  AnomalyThreshold,
  DurationThreshold,
  DurationHour
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
      anomalyThreshold: 0.99,
      durationThreshold: 5,
      durationHours: 6,
      modelKey: undefined,
      projectType: undefined,
      incidentList: []
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
    const incidentInfo = (incidentAllInfo || []).find((item)=>item.projectName == projectName);
    const data = dataAllInfo.find((data)=>data.projectName == projectName);
    const dataCoverages = (data.dataCoverages || []);
    update.incidentList = ((incidentInfo && incidentInfo.incidentList) || []).map((incident)=> {
      let [startTime, endTime, modelKey, anomalyThreshold, ] = incident.split("_");
      return {
        startTime: moment(startTime).toDate(),
        endTime: moment(endTime).toDate(),
        modelKey,
        anomalyThreshold,
        record: dataCoverages.find((coverage)=> coverage.indexOf(startTime) >= 0)
      }
    });
    this.setState(update);
  }

  handleEndTimeChange(endTime) {
    let {durationHours, durationThreshold} = this.state;
    this.setState({
      startTime: moment(endTime).add(-durationHours, 'hour').toDate(),
      endTime
    })
  }

  handleClickIncident(incident) {
    return (e) => {
      let {startTime, endTime, modelKey, anomalyThreshold} = incident;
      this.setState({
        startTime: startTime,
        endTime: endTime,
        anomalyThreshold: anomalyThreshold,
        incident: incident,
        modelKey: modelKey
      })
    }
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  _incidentsRef(c) {

  }

  render() {
    const {projectName, startTime, endTime, anomalyThreshold, durationThreshold, projectType, modelKey, durationHours, incidentList} = this.state;
    const {userInstructions, dashboardUservalues} = this.context;
    const labelStyle = {};

    if (!dashboardUservalues.projectString || !dashboardUservalues.incidentAllInfo) return <div></div>;

    return (
      <div className="ui form">
        <div className="four fields fill">
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
            <label style={labelStyle}>Model Key</label>
            <div className="ui input">
              <input type="text" disabled value={modelKey}/>
            </div>
          </div>
        </div>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Anomaly Threshold</label>
            <AnomalyThreshold value={anomalyThreshold} onChange={(v, t)=>this.setState({anomalyThreshold: t})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration Threshold (Minute)</label>
            <DurationThreshold value={durationThreshold} onChange={(v, t)=>this.setState({durationThreshold: t})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration (Hour)</label>
            <DurationHour value={durationHours} onChange={(v, t)=>this.setState({durationHours: t})}/>
          </div>
          <div className="field"></div>
        </div>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Start Time</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={startTime} disabled/>
            </div>

          </div>

          <div className="field">
            <label style={labelStyle}>End Time</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateTimeFormat='YYYY-MM-DD HH:mm' value={endTime}
                              onChange={this.handleEndTimeChange.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="ui field">
          <Button className="orange" onClick={this.handleSubmit.bind(this)}>Submit</Button>
        </div>

        {incidentList.length > 0 && (
          <div ref={this._incidentsRef} className="padding20" style={{border: '1px solid #e0e0e0'}}>
            <div className="ui middle aligned divided list padding10"
                 style={{maxHeight: 200, overflow: 'auto'}}>
              {incidentList.map((incident)=> {
                let {startTime, endTime, modelKey, anomalyThreshold, record} = incident;
                let bgColor = (incident.startTime == this.state.startTime) ? '#f1f1f1' : '#fff';
                return (
                  <div className="item" key={startTime.getTime()} style={{'backgroundColor': bgColor}}>
                    <div className="content" onClick={this.handleClickIncident(incident)}>
                      <a className="header padding5">
                        Start Time: {moment(startTime).toString()},
                        End Time: {moment(endTime).toString()} {record && `(record)`}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}
