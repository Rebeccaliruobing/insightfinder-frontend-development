import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList, IncidentsTreeMap} from '../../components/incidents';
import {LiveProjectSelection,NumberOfDays} from '../../components/selections';
import {buildTreemap} from '../../apis/retrieve-liveanalysis';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';
import AnomalySummary from '../../components/cloud/liveanalysis/anomalySummary';
import store from 'store';

class LiveAnalysis extends Component {
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
        incidentsTreeMap: [],
      },
      loading: true,
      projectName: undefined,
      showTenderModal: false,
      cvalue: "1",
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => !(item.isStationary));
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
    const {projectName, data, cvalue} = this.state;
    let incidentsTreeMap = undefined;
    if(incident){
      let caption = "Incident #"+incident.id+", start: "+moment(incident.startTimestamp).format("MM-DD HH:mm");
      let stats = incident.instanceMetricJson;
      stats['startTimestamp'] = incident.startTimestamp;
      stats['endTimestamp'] = incident.endTimestamp;
      incidentsTreeMap = buildTreemap(projectName, caption, stats, incident.anomalyMapJson);
    } else {
      let caption = projectName + " (" + cvalue + "d)";
      incidentsTreeMap = buildTreemap(projectName, caption, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap
    });
  }

  @autobind
  handleProjectChartsView() {
    const {projectName} = this.state;
    if (projectName) {
      let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
      let projectParam = projectParams.find((p) => p.projectName == projectName);
      let cvalue = projectParam ? projectParam.cvalue : "5";
      let pvalue = projectParam ? projectParam.pvalue : "0.99";
      let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";

      const url = `/liveMonitoring?pvalue=${pvalue}&cvalue=${cvalue}&modelType=${modelType}&projectName=${projectName}`;
      window.open(url, '_blank');
    }
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    this.setState({cvalue:numberOfDays.toString()});
  }

  @autobind
  handleProjectChange(value, projectName) {
    const {cvalue} = this.state;
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let pvalue = projectParam ? projectParam.pvalue : "0.99";
    let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ loading: true, projectName });
    apis.retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue, 3)
      .then(data => {
        this.setState({
          loading: false,
          incidentsTreeMap: data.incidentsTreeMap,
          data,
          startTimestamp: undefined,
          endTimestamp: undefined,
          showTenderModal: false
        }, ()=>{
            let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
            let incidentDurationThreshold = 15;
            let detectedIncidents = data.incidents.filter((incident, index) =>
                    incident.endTimestamp<=latestTimestamp && incident.duration>=parseInt(incidentDurationThreshold) );
            if(detectedIncidents.length>0){
                this.handleIncidentSelected(detectedIncidents[0]);
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
  refreshProjectName(projectName){
    this.handleProjectChange(projectName,projectName);
  }
  render() {
    let { loading, data, projectName, incidentsTreeMap, cvalue} = this.state;
    let instances = (data['instanceMetricJson']&&data['instanceMetricJson']['instances'])?data['instanceMetricJson']['instances'].split(',').length:0;
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
    let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projectName;
    return (
      <Console.Content className={ loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div className="ui right aligned vertical segment">
            <label style={{ fontWeight: 'bold' }}>Project Name:&nbsp;</label>
            <LiveProjectSelection style={{width: 250}}
                                  value={projectName} onChange={this.handleProjectChange}/>
            <label style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;Number of Days:&nbsp;</label>
            <NumberOfDays style={{width: 50}}
                                  value={cvalue} onChange={this.handleDayChange}/>
            <label style={{ fontWeight: 'bold', 'float': 'right' }}>
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </label>
          </div>
          <div className="ui vertical segment">
            <ProjectStatistics data={data} dur={cvalue} />
          </div>
          <div className="ui vertical segment">
            <div className="ui incidents grid">
              <div className="row" style={{ height: 528,'paddingTop': '1rem' }}>
                <div className="eight wide column" style={{ height: 500, 'paddingTop': 20 }}>
                  <Button className='orange' onClick={this.handleProjectChartsView}>Line Charts</Button>
                  <Button className='orange' title="Overall Causal Graph"
                          onClick={(e) => {
                          e.stopPropagation();
                          this.setState({
                            showTenderModal: true,
                            startTimestamp: undefined,
                            endTimestamp: undefined
                          });}}>
                    Overall Causal Graph
                  </Button>
                  <IncidentsTreeMap data={incidentsTreeMap} />
                </div>
                <div className="eight wide column" style={{ height: 500 }}>
                  <IncidentsList onIncidentSelected={this.handleIncidentSelected}
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
                     endTimestamp={this.state.endTimestamp}
                     startTimestamp={this.state.startTimestamp}
                     onClose={() => this.setState({ showTenderModal: false })}/>
        }
      </Console.Content>
    )
  }
}

export default LiveAnalysis;
