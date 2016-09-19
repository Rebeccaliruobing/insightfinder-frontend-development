import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList, IncidentsTreeMap} from '../../components/incidents';
import {LiveProjectSelection} from '../../components/selections';
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
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => !(item.isStationary));
    // remember select
    let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projects[0].projectName;
    if (projects.length > 0) {
      this.handleProjectChange(refreshName, refreshName);
    }
  }

  @autobind()
  handleIncidentSelected(incident) {
    const {projectName, data} = this.state;
    let incidentsTreeMap = undefined;
    if(incident){
      let caption = "Incident #"+incident.id+", start: "+moment(incident.startTimestamp).format("MM-DD HH:mm");
      let stats = incident.instanceMetricJson;
      stats['startTimestamp'] = incident.startTimestamp;
      stats['endTimestamp'] = incident.endTimestamp;
      incidentsTreeMap = buildTreemap(projectName, caption, stats, incident.anomalyMapJson);
    } else {
      incidentsTreeMap = buildTreemap(projectName, null, data.statistics, data.anomalyMapJson);
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
      let cvalue = projectParam ? projectParam.cvalue : "0.99";
      let pvalue = projectParam ? projectParam.pvalue : "5";
      let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";

      const url = `/liveMonitoring?pvalue=${pvalue}&cvalue=${cvalue}&modelType=${modelType}&projectName=${projectName}`;
      window.open(url, '_blank');
    }
  }

  @autobind
  handleProjectChange(value, projectName) {
    let projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    let projectParam = projectParams.find((p) => p.projectName == projectName);
    let cvalue = projectParam ? projectParam.cvalue : "0.99";
    let pvalue = projectParam ? projectParam.pvalue : "5";
    let modelType = (projectParam && projectParam.modelType) ? projectParam.modelType : "Holistic";
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ loading: true, projectName });
    apis.retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue)
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
  }
  refreshProjectName(projectName){
    this.handleProjectChange(projectName,projectName);
  }
  render() {
    let { loading, data, projectName, incidentsTreeMap} = this.state;
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
            <label style={{ fontWeight: 'bold', 'float': 'right' }}>
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </label>
          </div>
          <div className="ui vertical segment">
            <ProjectStatistics data={data} />
          </div>
          <div className="ui vertical segment">
            <div className="ui incidents grid">
              <div className="row" style={{ height: 528,'paddingTop': '1rem' }}>
                <div className="eight wide column" style={{ height: 500 }}>
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
