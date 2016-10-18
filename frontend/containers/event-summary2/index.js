import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList, IncidentsTreeMap} from '../../components/incidents';
import { LiveProjectSelection,NumberOfDays, TreemapOptionsSelect,EventSummaryModelType } from '../../components/selections';
import {buildTreemap} from '../../apis/retrieve-liveanalysis';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import AnomalySummary from '../../components/cloud/liveanalysis/anomalySummary';
import store from 'store';
import DateTimePicker from "../../components/ui/datetimepicker/index";
import InstanceStatsModal from "../../components/incidents/instanceStatsModal";

class EventSummary2 extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      treeMapValue: '0',
      treeMapChange: false, // utilization view flag
      treeMapText: "Utilization",
      data: {
        statistics: {},
        summary: {},
        incidents: [],
        incidentsTreeMap: [],
        instanceMetaData: {},
      },
      loading: true,
      projectName: undefined,
      showTenderModal: false,
      showInstanceStatsModal: false,
      selectedIncident: undefined,
      numberOfDays: "1",
      endTime: moment(),
      modelType:"Holistic",
      statsInstance: undefined,
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
      const url = `/settings/project-list/custom`;
      window.open(url, '_self');
    }
  }

  @autobind()
  handleIncidentSelected(incident) {
    const {projectName, data, numberOfDays} = this.state;
    let incidentsTreeMap = undefined;
    if(incident){
      let caption = "Incident #"+incident.id;
      let stats = incident.instanceMetricJson || {};
      stats['startTimestamp'] = incident.startTimestamp;
      stats['endTimestamp'] = incident.endTimestamp;
      incidentsTreeMap = buildTreemap(projectName, caption, stats, incident.anomalyMapJson, incident.rootCauseByInstanceJson);
    } else {
      let caption = projectName + " (" + numberOfDays + "d)";
      incidentsTreeMap = buildTreemap(projectName, caption, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap, 
      selectedIncident:incident,
    });
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    this.setState({modelType:modelType});
    let { projectName } = this.state;
    this.refreshProjectName(projectName);
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    this.setState({numberOfDays:numberOfDays.toString()});
    let { projectName } = this.state;
    this.refreshProjectName(projectName);
  }

  @autobind
  handleEndTimeChange(value, endTime) {
    let newEndTime = moment(value).endOf('day');
    let curTime = moment();
    if(newEndTime>curTime){
      newEndTime = curTime;
    }

    this.setState({endTime: newEndTime});
    let { projectName } = this.state;
    this.setState({endTime: moment(value).endOf('day')}, () => {
      this.refreshProjectName(projectName);
    });
  }

  refreshProjectName(projectName) {
    const {numberOfDays,endTime,modelType} = this.state;
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let pvalue = projectParam ? projectParam.pvalue : "0.99";
    let cvalue = projectParam ? projectParam.cvalue : "1";
    let endTimestamp = +moment(endTime);
    // let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ loading: true, projectName });
    apis.retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue, endTimestamp, numberOfDays, 2)
      .then(data => {
        this.setState({
          loading: false,
          incidentsTreeMap: data.incidentsTreeMap,
          data,
          startTimestamp: data.startTimestamp,
          endTimestamp: data.endTimestamp,
          showTenderModal: false,
          showInstanceStatsModal: false
        }, ()=>{
            let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
            let incidentDurationThreshold = 15;
            let detectedIncidents = data.incidents.filter((incident, index) =>
                    incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
            if(detectedIncidents.length>0){
                this.handleIncidentSelected(detectedIncidents[detectedIncidents.length-1]);
            }
        });
      })
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
      this.handleIncidentSelected();
  }

  @autobind
  handleProjectChange(value,projectName){
    this.setState({
      endTime: moment(),
      numberOfDays: "1",
      modelType:"Holistic",
      currentTreemapData: undefined,
    });
    this.refreshProjectName(projectName);
  }

  handleTreeMapChange(value){
    this.setState({treeMapValue: value});
  }

  modelDateValidator(date) {
    let timestamp = moment(date);
    let curTimestamp = moment();
    return timestamp<=curTimestamp;
  }

  feedbackData(data) {
    if(data){
      this.parent.setState({
        currentTreemapData: data,
        statsInstance: data.instanceName,
        showInstanceStatsModal:false
      });
    }
  }

  render() {
    let { loading, data, projectName, incidentsTreeMap, endTime, numberOfDays, modelType, treeMapValue,treeMapChange,treeMapText, statsInstance, currentTreemapData} = this.state;
    let instances = (data['instanceMetricJson']&&data['instanceMetricJson']['instances'])?data['instanceMetricJson']['instances'].split(',').length:0;
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
    let cpuUtilizationByInstance = data['instanceMetricJson'] ? data['instanceMetricJson']['cpuUtilizationByInstance'] : {};
    let instanceStatsMap = data['instanceMetricJson'] ? data['instanceMetricJson']['instanceStatsJson'] : {};
    let instanceStats = (instanceStatsMap && instanceStatsMap[statsInstance])? instanceStatsMap[statsInstance] : undefined;
    let instanceMetaData = data['instanceMetaData'] ? data['instanceMetaData'] : {};
    let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projectName;
    let projectType = data['projectType']?data['projectType']:'';
    return (
      <Console.Content className={ loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div className="ui right aligned vertical inline segment" style={{zIndex: 200}}>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection value={projectName} onChange={this.handleProjectChange} style={{minWidth: 200}}/>
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
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </div>
          </div>
          <div className="ui vertical segment">
            <ProjectStatistics data={data} dur={numberOfDays} />
          </div>
          <div className="ui vertical segment">
            <div className="ui incidents grid">
              <div className="row" style={{ height: 528,'paddingTop': '1rem' }}>
                <div className="nine wide column" style={{ height: 500, 'paddingTop': 20 }}>
                  <Button className={treeMapChange?"grey":"orange button"} style={{'marginRight': '0px','borderRadius': '3px 0 0 3px'}} onClick={(e)=>{
                      e.stopPropagation();
                      this.setState({
                      treeMapChange: !treeMapChange,
                      treeMapText: (treeMapChange)?"Utilization":"Anomaly"
                      });
                  }}>
                    Anomalies
                  </Button>
                  <Button className={treeMapChange?"orange button":"grey"} style={{'borderRadius': '0px 3px 3px 0'}} onClick={(e)=>{
                      e.stopPropagation();
                      this.setState({
                      treeMapChange: !treeMapChange,
                      treeMapText: (treeMapChange)?"Utilization":"Anomaly"
                      });
                  }}>
                    CPU Utilization
                  </Button>
                  {treeMapChange?
                    <TreemapOptionsSelect style={{ width: 10 }} value={treeMapValue} text={'<='+treeMapValue+'%'} onChange={(value)=>this.handleTreeMapChange(value)}/>
                  :
                  null}
                  <Button className={instanceStats?"orange button":"grey"} style={{ 'float':'right' }} onClick={(e)=>{
                      e.stopPropagation();
                      this.setState({
                        showInstanceStatsModal: true
                      });
                    }}>
                    Instance Stats
                  </Button>
                  <IncidentsTreeMap data={incidentsTreeMap} instanceMetaData={instanceMetaData}
                                    cpuUtilizationByInstance={cpuUtilizationByInstance}
                                    treeMapChange={treeMapChange} treeMapValue={treeMapValue}
                                    feedbackData={this.feedbackData}
                                    parent={this}
                                    currentData={currentTreemapData} />
                </div>
                <div className="seven wide column" style={{ height: 500 }}>
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
        { this.state.showInstanceStatsModal && instanceStats && 
            <InstanceStatsModal instanceName={statsInstance} instanceStats={instanceStats}
                      dur={numberOfDays} 
                      onClose={() => this.setState({ showInstanceStatsModal: false })}/>
        }
      </Console.Content>
    )
  }
}

export default EventSummary2;
