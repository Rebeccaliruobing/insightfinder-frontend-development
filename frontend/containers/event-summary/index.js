import React, {Component} from 'react';
import store from 'store';
import {autobind} from 'core-decorators';
import {Console, Button, Dropdown} from '../../artui/react';
import DateTimePicker from "../../components/ui/datetimepicker/index";

import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList} from '../../components/incidents';
import IncidentsTreeMap from '../../components/incidents/treemap';
import { LiveProjectSelection,NumberOfDays,TreeMapSchemeSelect,
  TreeMapCPUThresholdSelect,
  TreeMapAvailabilityThresholdSelect,
  EventSummaryModelType
} from '../../components/selections';
import {buildTreemap} from '../../apis/retrieve-liveanalysis';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';

class EventSummary extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      treeMapCPUThreshold: '0',
      treeMapAvailabilityThreshold: '90',
      treeMapScheme: 'anomaly', // utilization view flag
      treeMapText: "Utilization",
      data: {
        statistics: {},
        summary: {},
        incidents: [],
        incidentsTreeMap: [],
        instanceMetaData: {},
        eventStats:{},
      },
      loading: true,
      projectName: undefined,
      showTenderModal: false,
      selectedIncident: undefined,
      numberOfDays: "7",
      endTime: moment(),
      modelType:"Holistic",
      selectedInstance: undefined,
      instanceGroups: [],
      instanceGroup: "",
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => item.fileProjectType!=0);
    // remember select
    if (projects.length > 0) {
      let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projects[0].projectName;
      this.handleProjectChange(refreshName, refreshName);
    } else {
      const url = `/newproject/project-list/custom`;
      window.open(url, '_self');
    }
  }

  @autobind()
  handleIncidentSelected(incident,type) {
    const {projectName, data, numberOfDays, maxAnomalyRatio, minAnomalyRatio } = this.state;
    let incidentsTreeMap = undefined;
    if(incident){
      let caption = "Event #"+incident.id;
      let stats = incident.instanceMetricJson || {};
      stats['startTimestamp'] = incident.startTimestamp;
      stats['endTimestamp'] = incident.endTimestamp;
      stats['maxAnomalyRatio'] = maxAnomalyRatio;
      stats['minAnomalyRatio'] = minAnomalyRatio;
      incidentsTreeMap = buildTreemap(projectName, caption, stats, incident.anomalyMapJson, incident);
    } else {
      let caption = projectName + " (" + numberOfDays + "d)";
      data.statistics['maxAnomalyRatio'] = maxAnomalyRatio;
      data.statistics['minAnomalyRatio'] = minAnomalyRatio;
      incidentsTreeMap = buildTreemap(projectName, caption, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap,
      selectedIncident:incident,
      treeMapScheme: 'anomaly',
      currentTreemapData: undefined,
      lineChartType:type,
    });
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    let { projectName,instanceGroup } = this.state;
    this.setState({
      modelType:modelType,
      currentTreemapData: undefined,
    }, () => {
      // this.refreshProjectName(projectName);
      this.refreshInstanceGroup(instanceGroup);
    });
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    let { projectName,instanceGroup } = this.state;
    this.setState({
      numberOfDays:numberOfDays.toString(),
      currentTreemapData: undefined,
    }, () => {
      // this.refreshProjectName(projectName);      
      this.refreshInstanceGroup(instanceGroup);
    });
  }

  @autobind
  handleEndTimeChange(value, endTime) {
    let newEndTime = moment(value).endOf('day');
    let curTime = moment();
    if(newEndTime>curTime){
      newEndTime = curTime;
    }

    let { projectName,instanceGroup } = this.state;
    this.setState({
      endTime: newEndTime,
      currentTreemapData: undefined,
    }, () => {
      // this.refreshProjectName(projectName);
      this.refreshInstanceGroup(instanceGroup);
    });
  }

  // refreshProjectName(projectName) {
  //   apis.loadInstanceGrouping(projectName, "getGrouping")
  //   .then((resp)=> {
  //     if(resp.groupingString){
  //       let groups = resp.groupingString.split(',').sort();
  //       let firstGroup = "";
  //       if(groups && groups.length>0){
  //         firstGroup = groups[0];
  //       }
  //       this.setState({
  //         projectName:projectName,
  //         instanceGroups:groups,
  //         instanceGroup:firstGroup,
  //       },()=>{
  //         this.handleInstanceGroupChange(firstGroup);
  //       });
  //     }
  //   });
  // }

  @autobind
  handleInstanceGroupChange(value) {
    if(value == undefined || value == ""){
      this.setState({ loading: false });
      return;
    }
    this.refreshInstanceGroup(value);
  }

  @autobind
  refreshInstanceGroup(instanceGroup) {
    const { projectName, numberOfDays,endTime,modelType} = this.state;
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let pvalue = projectParam ? projectParam.pvalue : "0.99";
    let cvalue = projectParam ? projectParam.cvalue : "1";
    let endTimestamp = +moment(endTime);
    // let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ 
      loading: true, 
      instanceGroup:instanceGroup, 
      projectName,
    },()=>{
      apis.retrieveLiveAnalysis(projectName, modelType, instanceGroup, pvalue, cvalue, endTimestamp, numberOfDays, 3)
        .then(data => {
         let anomalyRatioLists = data.incidents.map(function (inc,index) {
           return inc['anomalyRatio']
         });
         let maxAnomalyRatio = _.max(anomalyRatioLists);
         let minAnomalyRatio = _.min(anomalyRatioLists);
         this.setState({
           loading: false,
           // incidentsTreeMap: data.incidentsTreeMap,
           data,
           maxAnomalyRatio,
           minAnomalyRatio,
           startTimestamp: data.startTimestamp,
           endTimestamp: data.endTimestamp,
           showTenderModal: false,
         }, ()=>{
           let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
           let incidentDurationThreshold = 15;
           let detectedIncidents = data.incidents.filter((incident, index) =>
                   incident.startTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
           if(detectedIncidents.length>0){
             this.handleIncidentSelected(detectedIncidents[detectedIncidents.length-1], 'detected');
           } else {
             this.handleIncidentSelected(undefined, 'detected');
           }
         })
       })
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
    });
  }  

  @autobind
  handleProjectChange(value,projectName){
    this.setState({
      endTime: moment(),
      numberOfDays: "7",
      modelType:"Holistic",
      currentTreemapData: undefined,
    },()=>{
      apis.loadInstanceGrouping(projectName, "getGrouping")
      .then((resp)=> {
        if(resp.groupingString){
          let groups = resp.groupingString.split(',').sort();
          let pos = groups.indexOf('All');
          if(pos!=-1){
            let len = groups.length;
            groups = groups.slice(1,len).concat(groups.slice(0,1));
          }
          let firstGroup = "";
          if(groups && groups.length>0){
            firstGroup = groups[0];
          }
          this.setState({
            projectName:projectName,
            instanceGroups:groups,
            instanceGroup:firstGroup,
          },()=>{
            this.handleInstanceGroupChange(firstGroup);
          });
        }
      });
    });
  }

  handleTreeMapAvailabilityThreshold(value){
    this.setState({treeMapAvailabilityThreshold: value});
  }

  handleTreeMapCPUThreshold(value){
    this.setState({treeMapCPUThreshold: value});
  }

  handleTreeMapScheme(value){
    this.setState({treeMapScheme: value});
  }

  modelDateValidator(date) {
    let timestamp = moment(date);
    let curTimestamp = moment();
    return timestamp<=curTimestamp;
  }

  @autobind
  feedbackData(data) {
    if(data){
      this.setState({
        currentTreemapData: data,
        selectedInstance: data.instanceName,
        startTimestamp: data.startTimestamp,
        endTimestamp: data.endTimestamp,
      });
    }
  }

  getTreeMapSchemeText(scheme){
    if(scheme == 'anomaly'){
      return "Anomaly";
    } else if (scheme == 'cpu'){
      return "CPU Utilization";
    } else if (scheme == 'availability'){
      return "Availability";
    }
    return "error";
  }

  render() {
    let { loading, data, projectName, incidentsTreeMap, endTime, numberOfDays, modelType,
      treeMapCPUThreshold,treeMapAvailabilityThreshold, treeMapScheme,selectedIncident,
      instanceGroups,instanceGroup,lineChartType,} = this.state;
    let treeMapSchemeText = this.getTreeMapSchemeText(treeMapScheme);
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
    let instanceStatsMap = data['instanceMetricJson'] ? data['instanceMetricJson']['instanceStatsJson'] : {};
    let instanceMetaData = data['instanceMetaData'] ? data['instanceMetaData'] : {};
    let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projectName;
    let projectType = data['projectType']?data['projectType']:'';
    let selectedIncidentPredicted = selectedIncident ? (selectedIncident.endTimestamp > latestTimestamp) : false;
    if(!selectedIncident && lineChartType && lineChartType=='predicted'){
      selectedIncidentPredicted = true;
    }
    return (
      <Console.Content
        className={loading ? 'ui form loading' : ''}
        style={{ background: '#f5f5f5' }}
      >
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection value={projectName} onChange={this.handleProjectChange} style={{minWidth: 200}}/>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Group:</label>
              <Dropdown
                key={projectName}
                mode="select"
                value={instanceGroup}
                onChange={this.handleInstanceGroupChange}
                style={{ minWidth: 200 }}
              >
                <div className="menu">
                  {
                    instanceGroups.map(g => (
                      <div
                        className="item" key={g}
                        data-value={g}
                      >{g}</div>
                    ))
                  }
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End date:</label>
                <div className="ui input">
                  <DateTimePicker className='ui input' style={{'width': '50%'}}
                              dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={endTime}
                              onChange={this.handleEndTimeChange}/>
                </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Number of Days:</label>
              <NumberOfDays style={{width: 120}}
                                    value={numberOfDays} onChange={this.handleDayChange}/>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Model Type:</label>
              <EventSummaryModelType style={{width: 120}}
                                    value={modelType} onChange={this.handleModelTypeChange}/>
            </div>
            <div className="field">
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshInstanceGroup(instanceGroup)}>Refresh</div>
            </div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '8px 0', borderBottom: 0 }}
          >
            <ProjectStatistics data={data} dur={numberOfDays} />
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 4 }}
          >
            <div className="ui incidents grid">
              <div className="row" style={{ height: 600, paddingTop: 0 }}>
                <div className="seven wide column" style={{ height: 500, paddingRight: 0 }}>
                  <IncidentsList projectName={refreshName}
                                 projectType={projectType}
                                 endTime={endTime}
                                 numberOfDays={numberOfDays}
                                 modelType={modelType}
                                 onIncidentSelected={this.handleIncidentSelected}
                                 incidents={data.incidents}
                                 causalDataArray={data.causalDataArray}
                                 causalTypes={data.causalTypes} latestTimestamp={latestTimestamp} />
                </div>
                <div className="nine wide column" style={{ height: 500, 'paddingTop': 20 }}>
                  {treeMapScheme=='anomaly'?
                  <b>Show event by:&nbsp;&nbsp;</b>
                  :
                  <b>Show instance by:&nbsp;&nbsp;</b>
                  }
                  <TreeMapSchemeSelect style={{ width: 130 }} value={treeMapScheme} text={treeMapSchemeText} onChange={(value)=>this.handleTreeMapScheme(value)}/>
                  {treeMapScheme=='cpu'?
                    <TreeMapCPUThresholdSelect style={{ minWidth: 10 }} value={treeMapCPUThreshold} text={'<='+treeMapCPUThreshold+'%'} onChange={(value)=>this.handleTreeMapCPUThreshold(value)}/>
                  :
                  null}
                  {treeMapScheme=='availability'?
                    <TreeMapAvailabilityThresholdSelect style={{ minWidth: 10 }} value={treeMapAvailabilityThreshold} text={'<='+treeMapAvailabilityThreshold+'%'} onChange={(value)=>this.handleTreeMapAvailabilityThreshold(value)}/>
                  :
                  null}
                  {false && <Button className="orange button" style={{ 'float':'right' }} onClick={(e)=>{
                      e.stopPropagation();
                      this.showInstanceChart();
                    }}>
                    All Metric Chart
                  </Button>}
                  <IncidentsTreeMap data={incidentsTreeMap} instanceMetaData={instanceMetaData} endTime={endTime} 
                                    numberOfDays={numberOfDays} instanceStatsJson={instanceStatsMap} treeMapScheme={treeMapScheme}
                                    treeMapCPUThreshold={treeMapCPUThreshold} treeMapAvailabilityThreshold={treeMapAvailabilityThreshold}
                                    feedbackData={this.feedbackData} predictedFlag={selectedIncidentPredicted}
                                    instanceGroup={instanceGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        { this.state.showTenderModal &&
            <TenderModal dataArray={data.causalDataArray} types={data.causalTypes}
                      endTimestamp={latestTimestamp}
                      startTimestamp={latestTimestamp}
                      onClose={() => this.setState({ showTenderModal: false })}/>
        }
      </Console.Content>
    )
  }
}

export default EventSummary;
