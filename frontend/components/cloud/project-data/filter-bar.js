import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import store from 'store';

import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {
  ProjectSelection,
  ModelType,
  DurationHour,
  AnomalyThreshold,
  DurationThreshold
} from '../../selections';

import apis from '../../../apis';

import DateTimePicker from "../../ui/datetimepicker/index";

export default  class FilterBar extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    root: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      projectName: undefined,
      pvalue: 0.99,
      cvalue: 5,
      durationHours: 6,
      modelType: "Holistic",
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
    update.modelType = "Holistic";
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
    const incidentInfo = (incidentAllInfo || []).find((item)=>item.projectName == projectName);
    const data = dataAllInfo.find((data)=>data.projectName == projectName);
    const dataCoverages = (data.dataCoverages || []);
    update.incidentList = ((incidentInfo && incidentInfo.incidentList) || []).map((incident)=> {
      let [startTime, endTime, modelKey, pvalue, cvalue] = incident.split("_");
      return {
        startTime: moment(startTime).toDate(),
        endTime: moment(endTime).toDate(),
        modelKey,
        pvalue,
        cvalue,
        modelType: "Holistic",
        record: dataCoverages.find((coverage)=> coverage.indexOf(startTime) >= 0)
      }
    });
    this.setState(update);
  }

  handleEndTimeChange(endTime) {
    let {durationHours, cvalue} = this.state;
    this.setState({
      startTime: moment(endTime).add(-durationHours, 'hour').toDate(),
      endTime
    })
  }

  handleClickIncident(incident) {
    return (e) => {
      let {startTime, endTime, modelKey, modelType, pvalue, cvalue} = incident;
      this.setState({
        incident,
        startTime,
        endTime,
        pvalue,
        cvalue,
        modelKey,
        modelType
      })
    }
  }

  handleSubmit() {
    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  handleRemoveRow() {
    let {projectName, startTime, endTime} = this.state;
    startTime = startTime.getTime();
    endTime = endTime.getTime();
    apis.postJSONDashboardUserValues('deleterawdata', {
      projectName, startTime, endTime,
    }).then((resp)=> {
      if (resp.success) {
        this.setState({
          incident: undefined,
          startTime: undefined,
          endTime: undefined,
          pvalue: undefined,
          modelKey: undefined
        }, this.handleRefresh.bind(this));
      } else {
        console.error(resp.message);
      }
    })
  }

  handleRefresh() {
    this.setState({loading: true}, ()=> {
      this.context.root.loadUserValues().then(()=> {
        this.setState({loading: false}, ()=> {
          let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
          if (projects.length > 0) this.handleProjectChange(projects[0].projectName, projects[0].projectName);
        });
      })
    });
  }

  _incidentsRef(c) {

  }

  render() {
    const {projectName, incident, startTime, endTime, pvalue, cvalue, projectType, modelKey, modelType, durationHours, incidentList} = this.state;
    const {dashboardUservalues} = this.context;
    const labelStyle = {};

    if (!dashboardUservalues.projectString || !dashboardUservalues.incidentAllInfo) return <div></div>;

    return (
      <div className={cx('ui form', {loading: !!this.state.loading})}>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Project Name</label>
            <ProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Project Type</label>
            <div className="ui input">
              <input type="text" readonly value={projectType}/>
            </div>
          </div>
          <div className="field">
            <label style={labelStyle}>Model Type</label>
            <ModelType value={modelType} text={modelType} onChange={(value, text)=> this.setState({modelType: text})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Model Key</label>
            <div className="ui input">
              <input type="text" readonly value={modelKey}/>
            </div>
          </div>
        </div>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Anomaly Threshold</label>
            <AnomalyThreshold value={pvalue} onChange={(v, t)=>this.setState({pvalue: t})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration Threshold (Minute)</label>
            <DurationThreshold value={cvalue} onChange={(v, t)=>this.setState({cvalue: t})}/>
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

          <Button className="basic" onClick={this.handleRefresh.bind(this)}>refresh</Button>
          {incident && <Button className="basic" onClick={this.handleRemoveRow.bind(this)}>remove</Button>}
        </div>

        {incidentList.length > 0 && (
          <div ref={this._incidentsRef} className="padding20" style={{border: '1px solid #e0e0e0'}}>
            <div className="ui middle aligned divided list padding10"
                 style={{maxHeight: 200, overflow: 'auto'}}>
              {incidentList.map((incident)=> {
                let {startTime, endTime, modelKey, modelType, pvalue, cvalue, record} = incident;
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
