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
      durationHours: 24,
      modelType: "Holistic",
      projectType: undefined,
      availableDataRanges:[],
      isStationary:false,
      isExistentIncident: false,
      incidentList: []
    };
  }

  componentDidMount() {
    this.handleRefresh();
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
  }

  parseDataRanges(str){
    var ranges = [];
    if(str===undefined || str==='[]'){
      return ranges;
    }
    var parts = str.replace('[','').replace(']','').split(",");
    $.each(parts,function(i,range){
      var rangesplit = range.split("_");
      ranges.push({
        min:parseInt(rangesplit[0].trim()),
        max:parseInt(rangesplit[1].trim())
      })
    });
    return ranges;
  }

  handleProjectChange(value, projectName) {
    let {projectString, sharedProjectString, incidentAllInfo, dataAllInfo, projectSettingsAllInfo} = this.context.dashboardUservalues;
    let project = undefined;
    if(projectString.length>0){
      project = projectString.split(',').map((s)=>s.split(":")).find((parts) => parts[0] == projectName);
    }
    if(sharedProjectString.length>0 && project==undefined){
      project = sharedProjectString.split(',').map((s)=>s.split(":")).find((parts) => (parts[0]+"@"+parts[3]) == projectName);
    }
    let projectInfo = ((this.context.dashboardUservalues || {}).projectSettingsAllInfo || []).find((item)=>item.projectName == projectName);
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

    let incidentListEntry = (incidentAllInfo || []).find((item)=>item.projectName == projectName);
    update.incidentList = (incidentListEntry || {}).incidentList || [];
    update.availableDataRanges = this.parseDataRanges(projectInfo.availableDataRanges);
    update.isStationary = projectInfo.isStationary;
    update.incident = null;
    
    //debugger;
    this.setState({isExistentIncident:false});
    this.setState(update);
  }

  handleDurationChange(durationHours) {
    let {endTime, cvalue} = this.state;
    this.setState({
      isExistentIncident:false,
      durationHours,
      startTime: moment(endTime).add(-durationHours, 'hour').toDate()
    });
  }

  handleStartTimeChange(startTime) {
    this.setState({
      isExistentIncident:false,
      startTime:moment(startTime).startOf('day'),
      durationHours:''
    });
  }

  handleEndTimeChange(endTime) {
    let {durationHours, cvalue} = this.state;
    this.setState({
      isExistentIncident:false,
      durationHours:'',
      endTime:moment(endTime).endOf('day')
    });
  }

  handleModelStartTimeChange(startTime) {
    this.setState({
      isExistentIncident:false,
      modelStartTime:moment(startTime).startOf('day')
    });
  }

  handleModelEndTimeChange(endTime) {
    this.setState({
      isExistentIncident:false,
      modelEndTime:moment(endTime).endOf('day')
    });
  }

  handleModelTimeChange(timeType) {
    return (time)=> {
      this.setState({isExistentIncident:false});
      this.setState(_.fromPairs([[timeType, time]]))
    }
  }

  validateStartEnd(data){
    let {startTime, endTime, modelStartTime, modelEndTime, isStationary, availableDataRanges} = data;
    if(isStationary){
      let startRange = availableDataRanges.find((item)=> 
        moment(startTime).endOf('day')>=item.min && moment(startTime).startOf('day')<=item.max);
      let endRange = availableDataRanges.find((item)=> 
        moment(endTime).endOf('day')>=item.min && moment(endTime).startOf('day')<=item.max);
      let modelStartRange = availableDataRanges.find((item)=> 
        moment(modelStartTime).endOf('day')>=item.min && moment(modelStartTime).startOf('day')<=item.max);
      let modelEndRange = availableDataRanges.find((item)=> 
        moment(modelEndTime).endOf('day')>=item.min && moment(modelEndTime).startOf('day')<=item.max);
      if(startRange === undefined){
        alert('Incident Start not in available data range.');
        return false;
      }
      if(endRange === undefined){
        alert('Incident End not in available data range.');
        return false;
      }
      if(modelStartRange === undefined){
        alert('Model Start not in available data range.');
        return false;
      }
      if(modelEndRange === undefined){
        alert('Model End not in available data range.');
        return false;
      }
      if(startRange != endRange){
        alert('Incident Start and Incident End not in the same data range.');
        return false;
      }
      if(modelStartRange != modelEndRange){
        alert('Model Start and Model End not in the same data range.');
        return false;
      }
    }
    return true;
  }

  handleClickIncident(incident) {
    return (e) => {
      let {incidentStartTime, incidentEndTime, dataChunkName, modelStartTime, modelEndTime, modelType, pValue, cValue, holisticModelKeys, splitModelKeys, recorded} = incident;
      let isd = moment(incidentStartTime);
      let ied = moment(incidentEndTime);
      let msd = moment(modelStartTime);
      let med = moment(modelEndTime);
      this.setState({
        incident,
        dataChunkName,
        startTime:isd,
        endTime:ied,
        modelStartTime,
        modelEndTime,
        pvalue:pValue,
        cvalue:cValue,
        modelType,
        recorded,
        holisticModelKeys,
        splitModelKeys,
        isExistentIncident:true
      })
    }
  }

  handleSubmit() {
    this.validateStartEnd(this.state) && this.props.onSubmit && this.props.onSubmit(this.state);
  }

  handleRemoveRow() {
    let {projectName, dataChunkName, modelStartTime, modelEndTime, modelType, incident} = this.state;
    let incidentKey = incident.incidentKey;
    apis.postJSONDashboardUserValues('deleteincident', {
      projectName, dataChunkName, modelStartTime, modelEndTime, modelType, incidentKey
    }).then((resp)=> {
      if (resp.success) {
        this.setState({
          incident: undefined,
          startTime: undefined,
          endTime: undefined,
          modelStartTime: undefined,
          modelEndTime: undefined
        }, this.handleRefresh.bind(this));
      } else {
        alert(resp.message);
      }
    })
  }

  handleRefresh() {
    this.setState({loading: true}, ()=> {
      this.context.root.loadUserValues().then(()=> {
        this.setState({loading: false}, ()=> {
          let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
          if (projects.length > 0) {
            this.handleProjectChange(projects[0].projectName, projects[0].projectName);
          }
        });
      })
    });
  }

  modelDateValidator(date) {
    let timestamp = date.toDate().getTime();
    let {isStationary, availableDataRanges} = this.state;
    if(isStationary){
      // check within data range
      let hitRange = availableDataRanges.find((item)=> moment(timestamp).endOf('day') >= item.min 
        && moment(timestamp).startOf('day') <= item.max);
      return hitRange!=undefined;
    } else {
      // check within past 6 weeks
      let nowd = new Date();
      let max = moment(nowd);
      let min = max -  3600000*24*7*6;
      return moment(timestamp).endOf('day') >= min && moment(timestamp).startOf('day') <= max;
    }
  }

  _incidentsRef(c) {

  }

  render() {
    const {
      projectName, incident, startTime, endTime, pvalue, cvalue, recorded, projectType, modelType, durationHours, incidentList,
      modelStartTime, modelEndTime
    } = this.state;
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
            <ModelType value={modelType} text={modelType} onChange={(value, text)=> this.setState({modelType: value})}/>
          </div>
          <div className="field">
          </div>
        </div>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Anomaly Threshold</label>
            <AnomalyThreshold value={pvalue} onChange={(v, t)=>this.setState({pvalue: t})}/>
          </div>
          <div className="field">
            <label style={labelStyle}>Duration Threshold (Sample Number)</label>
            <DurationThreshold value={cvalue} onChange={(v, t)=>this.setState({cvalue: t})}/>
          </div>
          <div className="field">
          </div>
          <div className="field"></div>
        </div>
        <div className="four fields fill">
          <div className="field">
            <label style={labelStyle}>Incident Start</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={startTime} 
                              onChange={this.handleStartTimeChange.bind(this)}/>
            </div>

          </div>

          <div className="field">
            <label style={labelStyle}>Incident End</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={endTime}
                              onChange={this.handleEndTimeChange.bind(this)}/>
            </div>
          </div>

          <div className="field">
            <label style={labelStyle}>Model Start</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={modelStartTime}
                              onChange={this.handleModelStartTimeChange.bind(this)}/>
            </div>
          </div>

          <div className="field">
            <label style={labelStyle}>Model End</label>
            <div className="ui input">
              <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={modelEndTime}
                              onChange={this.handleModelEndTimeChange.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="ui field">
          <Button className="orange" onClick={this.handleSubmit.bind(this)}>Submit</Button>

          <Button className="basic" onClick={this.handleRefresh.bind(this)}>Refresh</Button>
          {incident && <Button className="basic" onClick={this.handleRemoveRow.bind(this)}>Remove</Button>}
        </div>

        {incidentList.length > 0 && (
          <div ref={this._incidentsRef} className="padding20" style={{border: '1px solid #e0e0e0'}}>
            <div className="ui middle aligned divided list padding10"
                 style={{maxHeight: 200, overflow: 'auto'}}>
              {incidentList.sort(function(a, b) {
                  let aisd = moment(a.incidentEndTime);
                  let bisd = moment(b.incidentEndTime);
                  if(aisd>bisd){
                    return -1;
                  } else if(aisd<bisd){
                    return 1;
                  } else {
                    return 0;
                  }
                }).map((incident)=> {
                let {incidentStartTime, incidentEndTime, modelStartTime, modelEndTime, modelType, recorded} = incident;
                let isd = moment(incidentStartTime);
                let ied = moment(incidentEndTime);
                let msd = moment(modelStartTime);
                let med = moment(modelEndTime);
                let isdstr = isd.format("YYYY-MM-DD HH:mm");
                let iedstr = ied.format("YYYY-MM-DD HH:mm");
                let msdstr = msd.format("YYYY-MM-DD HH:mm");
                let medstr = med.format("YYYY-MM-DD HH:mm");
                let recsuffix = recorded?"(recorded)":"(manual)";
                let tooltipcontent = "Incident: ["+isdstr+", "+iedstr+"], model: ["+msdstr+", "
                  +medstr+"], "+modelType+" "+recsuffix;
                let bgColor = (moment(incidentStartTime) == this.state.startTime) ? '#f1f1f1' : '#fff';
                return (
                  <div className="item" key={isd + ',' + ied + ',' + msd + ',' + med + ',' + modelType} style={{'backgroundColor': bgColor}}>
                    <div className="content" onClick={this.handleClickIncident(incident)}>
                      <a className="header padding5 incident-item" title={tooltipcontent}>
                        Incident: [{isdstr}, {iedstr}] {recsuffix}
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
