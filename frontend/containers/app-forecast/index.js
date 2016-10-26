import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import { LiveProjectSelection } from '../../components/selections';
import AnomalySummary from '../../components/cloud/liveanalysis/anomalySummary';
import store from 'store';
import DateTimePicker from "../../components/ui/datetimepicker/index";

class AppForecast extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        statistics: {},
        summary: {},
        incidents: [],
        instanceMetaData: {},
        eventStats:{},
      },
      loading: true,
      projectName: undefined,
      selectedIncident: undefined,
      numberOfDays: "1",
      endTime: moment(),
      modelType:"Holistic",
      selectedInstance: undefined,
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
          data,
          startTimestamp: data.startTimestamp,
          endTimestamp: data.endTimestamp,
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
    });
    this.refreshProjectName(projectName);
  }

  showInstanceChart() {
    let { selectedIncident,selectedInstance,projectName,modelType } = this.state;
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let cvalueParam = projectParam ? projectParam.cvalue : "1";
    let pvalueParam = projectParam ? projectParam.pvalue : "0.99";
    let params = {
      version:2,
      pvalue:pvalueParam,
      cvalue:cvalueParam,
      modelType:modelType,
      projectName:projectName,
    };
    if(selectedInstance){
      params['instanceName'] = selectedInstance;
    }
    if(selectedIncident){
      params['startTimestamp'] = selectedIncident.startTimestamp;
      params['endTimestamp'] = selectedIncident.endTimestamp;
    }

    const url = `/liveMonitoring?${$.param(params)}`;
    window.open(url, '_blank');
  }

  render() {
    let { loading, data, projectName, appNames } = this.state;
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
    let instanceStatsMap = data['instanceMetricJson'] ? data['instanceMetricJson']['instanceStatsJson'] : {};
    let instanceStats = (instanceStatsMap && instanceStatsMap[selectedInstance])? instanceStatsMap[selectedInstance] : {};
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
              <label style={{ fontWeight: 'bold' }}>Application Name:</label>
              <Dropdown mode="select" value={appName} text={appName}
                        onChange={(v, t) => this.setState({appName: v})}  
                        style={{minWidth: 250}}>
                <i className="dropdown icon"/>
                <div className="menu">
                  {appNames.map((appName, index) => {
                    return <div className="item">{appName}</div>
                  })}
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default AppForecast;
