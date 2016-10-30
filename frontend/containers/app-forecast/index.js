import React, {Component} from 'react';
import {Console, Button} from '../../artui/react';
import {autobind} from 'core-decorators';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import { LiveProjectSelection, ForecastIntervalHour } from '../../components/selections';
import AnomalySummary from '../../components/cloud/liveanalysis/anomalySummary';
import store from 'store';
import DateTimePicker from "../../components/ui/datetimepicker/index";
import LiveAnalysisCharts from '../../components/cloud/liveanalysis'

class AppForecast extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true,
      projectName: undefined,
      selectedAppName: undefined,
      appNames:[],
      interval: "4",
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => item.fileProjectType!=0);
    // remember select
    if (projects.length > 0) {
      let refreshName = store.get('appForecaseProjectName')?store.get('appForecaseProjectName'): projects[0].projectName;
      this.handleProjectChange(refreshName, refreshName);
    } else {
      const url = `/settings/project-list/custom`;
      window.open(url, '_self');
    }
  }

  @autobind()
  handleAppNameSelected(appName) {
    const {projectName, interval, data } = this.state;
    this.setState({
      loading: true, 
      selectedAppName:appName,
    });
    apis.retrieveAppMetricForecastData(projectName, appName, interval)
      .then(resp => {
        let update = {};
        update.data = resp;
        update.loading = false;
        this.setState(update);
      })
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
  }

  refreshProjectName(projectName) {
    store.set('appForecaseProjectName', projectName);
    this.setState({ 
      loading: true, 
      projectName 
    });
    let {interval} = this.state;
    apis.retrieveAppNames(projectName)
      .then(resp => {
        this.setState({
          loading: false,
          appNames:resp.appNames,
        }, ()=>{
            let appNames = resp.appNames.sort((a,b) => b.localeCompare(a));
            if(appNames.length>0){
                this.handleAppNameSelected(appNames[0]);
            }
        });
      })
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
  }

  @autobind
  handleProjectChange(value,projectName){
    // this.setState({
    //   endTime: moment(),
    //   numberOfDays: "1",
    //   modelType:"Holistic",
    // });
    this.refreshProjectName(projectName);
  }

  @autobind
  handleIntervalChange(value,interval){
    let { projectName, selectedAppName } = this.state;
    this.setState({
      interval: interval,
    }, ()=>{
      this.handleAppNameSelected(selectedAppName);
    });
  }


  render() {
    let { loading, data, projectName, interval, appNames, selectedAppName } = this.state;
    let refreshName = store.get('appForecaseProjectName')?store.get('appForecaseProjectName'): projectName;
    let projectType = data['projectType']?data['projectType']:'';
    return (
      <Console.Content className={ loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div className="ui right aligned vertical inline segment" style={{zIndex: 200}}>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection value={projectName} onChange={this.handleProjectChange} style={{minWidth: 200}}/>
            </div>
            {false && <div className="field">
              <label style={{ fontWeight: 'bold' }}>Forecast Interval (hour):</label>
              <ForecastIntervalHour value={interval} onChange={this.handleIntervalChange} style={{minWidth: 80}}/>
            </div>}
            <div className="field">
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </div>
          </div>
          <div className="ui grid">
            <div className="three wide column">
              <table className="ui selectable celled table">
                <thead>
                  <tr>
                  <th style={{fontWeight:'bold'}}>Application Names</th>
                  </tr>
                </thead>
                <tbody>
                {appNames.map((appName, i) => {
                  return (
                      <tr key={i} onClick={()=>this.handleAppNameSelected(appName)} className={cx({
                        'active': appName == this.state.selectedAppName
                      })} style={{cursor: 'pointer'}}>
                        <td>{appName}</td>
                      </tr>
                  )
                })}
                </tbody>
              </table>
            </div>        
            <div className="thirteen wide column">
              <LiveAnalysisCharts data={data} loading={loading} enablePublish={false} isForecast={true} onRefresh={() => this.handleAppNameSelected(selectedAppName)}/>
            </div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default AppForecast;
