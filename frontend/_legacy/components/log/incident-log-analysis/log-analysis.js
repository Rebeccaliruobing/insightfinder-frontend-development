import React, { PropTypes as T } from 'react';
import moment from 'moment';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { Button } from '../../../artui/react';
import {
  LogFileReplayProjectSelection,
  LogModelType,
  DurationThreshold,
  AnomalyThreshold,
  AnomalyThresholdSensitivity,
  RareEventSensitivity,
} from '../../selections';
import apis from '../../../apis';
import DateTimePicker from '../../ui/datetimepicker';
import WaringButton from '../../cloud/monitoring/waringButton';

class LogAnalysis extends React.Component {
  static contextTypes = {
    dashboardUservalues: T.object,
    root: T.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      derivedPvalue: 0.9,
      pvalue: 0.95,
      derivedPvalueText: "Medium High",
      pvalueText: "Medium",
      rareEventThreshold: 3,
      rareEventThresholdText: "Medium",
      cvalue: 1,
      minPts: 5,
      epsilon: 1.0,
      durationHours: 24,
      modelType: "holisticLog",
      modelTypeText: 'Holistic',
      projectType: '',
      availableDataRanges:[],
      isStationary:false,
      isExistentIncident: false,
      incidentList: [],
      modelTypeTextMap: {},
      sensitivityMap:{},
      rareEventMap:{},
    };
    this.state.modelTypeTextMap["Holistic"] = "Holistic";
    this.state.modelTypeTextMap["holisticLog"] = "Holistic";
    this.state.modelTypeTextMap["DBScan"] = "Clustering (DBScan)";
    this.state.sensitivityMap["0.99"] = "Low";
    this.state.sensitivityMap["0.97"] = "Medium Low";
    this.state.sensitivityMap["0.95"] = "Medium";
    this.state.sensitivityMap["0.9"] = "Medium High";
    this.state.sensitivityMap["0.5"] = "High";
    this.state.rareEventMap["1"] = "Low";
    this.state.rareEventMap["2"] = "Medium Low";
    this.state.rareEventMap["3"] = "Medium";
    this.state.rareEventMap["4"] = "Medium High";
    this.state.rareEventMap["5"] = "High";
  }

  componentDidMount() {
    this.handleRefresh();
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    const projectString = (this.context.dashboardUservalues.projectString || '').split(',');
    const projectInfos = {};
    R.forEach((p) => {
      const info = p.split(':');
      projectInfos[info[0]] = {
        projectType: info[1],
        instanceType: info[2],
        dataType: info[3],
      };
    }, projectString);

    projects = projects.filter((item) => {
      const info = projectInfos[item.projectName];
      return info.dataType.toLowerCase() === 'log' &&
        info.instanceType.toLowerCase() === 'logfile';
    });

    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    } else {
      let projects0 = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
      projects0 = projects0.filter((item, index) => item.fileProjectType!=0);
      if (projects0.length === 0) {
        // no log no live => fallback to register
        const url = `/settings/project-list/custom`;
        window.open(url, '_self');
      }
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
    let update = {
      projectName,
      modelType: 'holisticLog',
      modelTypeText: 'Holistic',
      derivedPvalue: 0.9,
      pvalue: 0.95,
      derivedPvalueText: "Medium High",
      pvalueText: "Medium",
      rareEventThreshold: 3,
      rareEventThresholdText: "Medium",
      cvalue: 1,
      minPts: 5,
      epsilon: 1.0,
    };
    // update.modelType = "holisticLog";
    // update.modelTypeText = this.state.modelTypeTextMap[update.modelType];
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

    this.setState({ isExistentIncident:false });
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
    if(startTime == endTime){
      alert('Log start/end times need to be initialized.');
      return false;
    }
    if(modelStartTime == modelEndTime){
      alert('Model start/end times need to be initialized.');
      return false;
    }
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
        alert('Log Start not in available data range.');
        return false;
      }
      if(endRange === undefined){
        alert('Log End not in available data range.');
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
        alert('Log Start and Log End not in the same data range.');
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
      let {incidentStartTime, incidentEndTime, dataChunkName, modelStartTime, modelEndTime, modelType, derivedPvalue, pValue, cValue, holisticModelKeys, splitModelKeys, recorded} = incident;
      let isd = moment(incidentStartTime);
      let ied = moment(incidentEndTime);
      let msd = moment(modelStartTime);
      let med = moment(modelEndTime);
      if(modelType=='DBScan'){
        this.setState({
          incident,
          dataChunkName,
          startTime: isd,
          endTime: ied,
          modelStartTime,
          modelEndTime,
          epsilon: pValue,
          minPts: cValue,
          modelType,
          modelTypeText: this.state.modelTypeTextMap[modelType],
          recorded,
          holisticModelKeys,
          splitModelKeys,
          isExistentIncident: true
        });
      } else {
        this.setState({
          incident,
          dataChunkName,
          startTime: isd,
          endTime: ied,
          modelStartTime,
          modelEndTime,
          derivedPvalue: derivedPvalue||0.9, 
          pvalue: pValue,
          derivedPvalueText: this.state.sensitivityMap[derivedPvalue||0.9],
          pvalueText: this.state.sensitivityMap[pValue],
          rareEventThreshold: 3,
          rareEventThresholdText: "Medium",
          cvalue: 1,
          modelType,
          modelTypeText: this.state.modelTypeTextMap[modelType],
          recorded,
          holisticModelKeys,
          splitModelKeys,
          isExistentIncident: true,
        });
      }     
    }
  }

  handleSubmit() {
    const { projectName, modelType, startTime, endTime, derivedPvalue, rareEventThreshold, pvalue, cvalue, modelStartTime, modelEndTime, isExistentIncident,
    } = this.state;

    this.validateStartEnd(this.state) && this.props.onSubmit && this.props.onSubmit({
      projectName, modelType, startTime, endTime, derivedPvalue, rareEventThreshold, pvalue, cvalue, modelStartTime, modelEndTime, isExistentIncident,
    });
  }

  handleRemoveRow(incident){
    let {projectName} = this.state;
    let {dataChunkName, modelStartTime, modelEndTime, modelType, recorded,incidentKey} = incident;
    apis.postJSONDashboardUserValues('deleteincident', {
      projectName, dataChunkName, modelStartTime, modelEndTime, modelType, incidentKey
    }).then((resp)=> {
      if (resp.success) {
        this.setState({
          incident: undefined,
          startTime: undefined,
          endTime: undefined,
          modelStartTime: undefined,
          modelEndTime: undefined,
          isExistentIncident: true,
          modelType: modelType,
          modelTypeText: this.state.modelTypeTextMap[modelType],
          recorded: recorded
        }, this.handleRefresh.bind(this));
      } else {
        alert(resp.message);
      }
    })
  }

  @autobind
  handleRefresh() {
    const { projectName } = this.state;
    this.setState({loading: true}, ()=> {
      this.context.root.loadIncident().then(()=> {
        this.setState({loading: false}, ()=> {
          if (projectName) {
            this.handleProjectChange(projectName, projectName);
          } else {
            let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
            projects = projects.filter((item,index) =>  item.fileProjectType == 0);
            if (projects.length > 0) {
              this.handleProjectChange(projects[0].projectName, projects[0].projectName);
            }
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

  render() {
    const {
      projectName, incident, startTime, endTime, derivedPvalue, pvalue, pvalueText, derivedPvalueText, cvalue, minPts,epsilon, recorded, projectType, modelType, modelTypeText, durationHours, incidentList, 
      rareEventThreshold, rareEventThresholdText,
      modelStartTime, modelEndTime, loading,
    } = this.state;
    const {dashboardUservalues} = this.context;
    const labelStyle = {};
    const selectedIncident = incident;
    let self = this;
    if (!dashboardUservalues.projectString || !dashboardUservalues.incidentAllInfo) return <div></div>;

    return (
      <div className={`ui form ${!!loading ? 'loading' : ''}`} style={{'display': 'inline-block'}}>
        <div className="four fields fill" style={{'float': 'left','display': 'inline-block','width': '33%'}}>
          <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
            <WaringButton labelStyle={labelStyle} labelTitle="Project Name" labelSpan="pick a nickname for your cloud project."/>
            <LogFileReplayProjectSelection value={projectName} onChange={this.handleProjectChange.bind(this)}/>
          </div>
          <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
            <WaringButton labelStyle={labelStyle} labelTitle="Project Type" labelSpan="cloud type associated with this project."/>
            <div className="ui input">
              <input type="text" readOnly={true} value={projectType}/>
            </div>
          </div>
          <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
            <WaringButton labelStyle={labelStyle} labelTitle="Model Type" labelSpan="choose between the Holistic model type that uses a single model induced from all metrics, and the Split model type that uses a group of models, each induced from one metric."/>
            <LogModelType value={modelType} text={modelTypeText} onChange={(value, text)=> this.setState({modelType: value, modelTypeText: text})}/>
          </div>
          {modelType == 'DBScan'?
            <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
              <label style={labelStyle}>MinPts</label>
              <input type="text" defaultValue={minPts} onBlur={(e)=>this.setState({minPts:e.target.value})}/>
            </div>
            :
            <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Rare Event Detection Sensitivity" labelSpan="Rare event detection sensitivity controls the sensitivity with which InsightFinder will cluster logs and detect anomalous logs."/>
              <RareEventSensitivity value={rareEventThreshold} text={rareEventThresholdText} onChange={(v, t)=>this.setState({rareEventThreshold:v, rareEventThresholdText:t})}/>
            </div>
          }
          {modelType == 'DBScan'?
            <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
              <label style={labelStyle}>Epsilon</label>
              <input type="text" defaultValue={epsilon} onBlur={(e)=>this.setState({epsilon:e.target.value})}/>
            </div>
            :
            <div className="field" style={{'width': '100%','marginBottom': '16px'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Frequency Anomaly Detection Sensitivity" labelSpan="This setting controls sensitivity InsightFinder will alert on frequency anomaly in given a time window. "/>
              <AnomalyThresholdSensitivity value={derivedPvalue} text={derivedPvalueText} onChange={(v, t)=>this.setState({derivedPvalue:v, derivedPvalueText:t})}/>
            </div>
          }

          <div className="ui field" style={{'width': '100%'}}>
            <Button className="orange" onClick={this.handleSubmit.bind(this)}>Log Analysis</Button>
            <Button className="basic" onClick={this.handleRefresh.bind(this)}>Refresh</Button>
          </div>
          <div className="field">
          </div>
        </div>
          <div className="padding10" style={{'width':'64%','float':'right',border: '1px solid #e0e0e0'}}>
            <div className="ui header">List of Logs</div>
            <div className="ui middle aligned divided list padding10"
                 style={{height: 200, overflow: 'auto'}}>
              {incidentList.length > 0 && incidentList.sort(function(a, b) {
                  let aisd = moment(a.incidentEndTime);
                  let bisd = moment(b.incidentEndTime);
                  if(aisd>bisd){
                    return -1;
                  } else if(aisd<bisd){
                    return 1;
                  } else {
                    return 0;
                  }
                }).map((incident,index)=> {
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
                let selected = incident === selectedIncident;
                let tooltipcontent = "Log: ["+isdstr+", "+iedstr+"], model: ["+msdstr+", "
                  +medstr+"] ";
                let bgColor = (moment(incidentStartTime) == this.state.startTime) ? '#f1f1f1' : '#fff';
                return (
                  <div className={"item " + (selected ? 'selected' : '')}
                    key={index} style={{'backgroundColor': bgColor,'height':'32px','position': 'relative'}}>
                    <div className="content" onClick={this.handleClickIncident(incident)}>
                      <a className="header padding5 incident-item"
                         title={tooltipcontent}
                         style={{'minWidth': '574px', paddingLeft: 10}}>
                        Log: [{isdstr}, {iedstr}] 
                      </a>
                    </div>
                    <Button className="ui mini red button" style={{'top': index==0?'1px':'5px','position': 'absolute','right': 0}} onClick={()=>self.handleRemoveRow(incident)}>Remove</Button>
                  </div>
                )
              })}
            </div>
          </div>
        <div className="four fields fill" style={{'float': 'right','width': '64%','margin': '16px 0 0 0'}}>
          <div style={{'width': '100%','display': 'flex'}}>
            <div className="field" style={{'width': '25%'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Log Start" labelSpan="user specified analysis period."/>
              <div className="ui input">
                <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                                dateTimeFormat='YYYY-MM-DD' value={startTime}
                                onChange={this.handleStartTimeChange.bind(this)}/>
              </div>
            </div>

            <div className="field" style={{'width': '25%'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Log End" labelSpan="user specified analysis period."/>
              <div className="ui input">
                <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                                dateTimeFormat='YYYY-MM-DD' value={endTime}
                                onChange={this.handleEndTimeChange.bind(this)}/>
              </div>
            </div>

            <div className="field" style={{'width': '25%'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Model Start" labelSpan="user specified analysis period."/>
              <div className="ui input">
                <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                                dateTimeFormat='YYYY-MM-DD' value={modelStartTime}
                                onChange={this.handleModelStartTimeChange.bind(this)}/>
              </div>
            </div>

            <div className="field" style={{'width': '25%'}}>
              <WaringButton labelStyle={labelStyle} labelTitle="Model End" labelSpan="user specified analysis period."/>
              <div className="ui input">
                <DateTimePicker className='ui input' dateValidator={this.modelDateValidator.bind(this)}
                                dateTimeFormat='YYYY-MM-DD' value={modelEndTime}
                                onChange={this.handleModelEndTimeChange.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogAnalysis;