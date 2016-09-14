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
    if (projects.length > 0) {
      this.handleProjectChange(projects[0].projectName, projects[0].projectName);
    }
  }

  @autobind()
  handleIncidentSelected(incident) {
    // TODO: Get incidentsTreeMap for selected incident.
    const {projectName, data} = this.state;
    let incidentsTreeMap = undefined;
    if(incident){
      let caption = "Incident #"+incident.id+", start: "+incident.start;
      incidentsTreeMap = buildTreemap(projectName, caption, incident.instanceMetricJson, incident.anomalyMapJson);
    } else {
      incidentsTreeMap = buildTreemap(projectName, null, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap,
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

    this.setState({ loading: true, projectName });
    apis.retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue)
      .then(data => {
        this.setState({
          loading: false,
          incidentsTreeMap: data.incidentsTreeMap,
          data,
        });
      })
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
  }

  render() {
    let { loading, data, projectName, incidentsTreeMap} = this.state;
    let instances = (data['instanceMetricJson']&&data['instanceMetricJson']['instances'])?data['instanceMetricJson']['instances'].split(',').length:0;
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;

                // <div className="seven wide column" style={{ height: (instances)*60+'px'}}>
                //   <AnomalySummary data={data}/>
                // </div>
                // <div className="seven wide column" style={{ height: 500 }}>
                //   <IncidentsTreeMap data={data.incidentsTreeMap}/>
                // </div>

    return (
      <Console.Content className={ loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div className="ui right aligned vertical segment">
            <label style={{ fontWeight: 'bold' }}>Project Name:&nbsp;</label>
            <LiveProjectSelection style={{width: 250}}
                                  value={projectName} onChange={this.handleProjectChange}/>
            <Button className='orange' onClick={this.handleProjectChartsView}>Chart View</Button>
          </div>
          <div className="ui vertical segment">
            <ProjectStatistics data={data} />
          </div>
          <div className="ui vertical segment">
            <div className="ui incidents grid">
              <div className="label row">
                <div className="nine wide column">Predicted Incident List</div>
                <div className="seven wide column">Incident TreeMap</div>
              </div>
              <div className="row" style={{ height: 528 }}>
                <div className="nine wide column" style={{ height: 500 }}>
                  <IncidentsList onIncidentSelected={this.handleIncidentSelected}
                                 incidents={data.incidents}
                                 causalDataArray={data.causalDataArray}
                                 causalTypes={data.causalTypes} latestTimestamp={latestTimestamp} />
                </div>
                <div className="seven wide column" style={{ height: 500 }}>
                  <IncidentsTreeMap data={incidentsTreeMap} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default LiveAnalysis;
