import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList, IncidentsTreeMap} from '../../components/incidents';
import {LiveProjectSelection} from '../../components/selections';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';

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
    let { loading, data, projectName } = this.state;

    return (
      <Console.Content className={ loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div className="ui right aligned vertical segment">
            <label style={{ fontWeight: 'bold' }}>Project Name:&nbsp;</label>
            <LiveProjectSelection style={{width: 200}}
                                  value={projectName} onChange={this.handleProjectChange}/>
          </div>
          <div className="ui vertical segment">
            <ProjectStatistics data={data} />
          </div>
          <div className="ui vertical segment">
            <div className="ui incidents grid">
              <div className="label row">
                <div className="seven wide column">Incidents TreeMap:</div>
                <div className="nine wide column">Incidents List:</div>
              </div>
              <div className="row" style={{ height: 528 }}>
                <div className="seven wide column" style={{ height: 500 }}>
                  <IncidentsTreeMap data={data.incidentsTreeMap}/>
                </div>
                <div className="nine wide column" style={{ height: 500 }}>
                  <IncidentsList incidents={data.incidents} causalDataArray={data.causalDataArray} causalTypes={data.causalTypes}/>
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
