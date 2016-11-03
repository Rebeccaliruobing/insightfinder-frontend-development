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
      appObj:{},
      appCpuJson:{},
      interval: "24",
      showErrorMsg: false,
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
    const { appObj } = this.state;
    this.setState({
      loading: true, 
      selectedAppName:appName,
    });
    let thisData = {};
    let instanceMetricJson = {};
    let endDataTimestamp = appObj['endDataTimestamp'];
    let dataObj = appObj['appForecastData'];
    instanceMetricJson['latestDataTimestamp'] = endDataTimestamp;
    thisData['instanceMetricJson'] = instanceMetricJson;
    if(dataObj){
      thisData['data'] = dataObj[appName];
    }
    this.setState({ 
      data: thisData,
      loading: false,
    });
  }

  sortAppByCPU(a,b){
    let {appCpuJson} = this.state;
    let aid = appCpuJson[a];
    let bid = appCpuJson[b];
    if(aid==undefined && bid==undefined){
      return 0;
    } else if(aid!=undefined && bid==undefined){
      return -1;
    } else if(aid==undefined && bid!=undefined){
      return 1;
    } else {
      if (aid < bid) {
          return 1;
      } else if (aid > bid) {
          return -1;
      } else {
        return 0;
      }
    }
  }

  refreshProjectName(projectName) {
    let self = this;
    store.set('appForecaseProjectName', projectName);
    this.setState({ 
      loading: true, 
      projectName 
    });
    let {interval} = this.state;
    apis.retrieveAppForecastData(projectName)
      .then(resp => {
        this.setState({
          loading: false,
          appNames:resp.appNames,
          appCpuJson: resp.appCpuJson,
          appObj: resp.appObj,
        }, ()=>{
            this.setState({ 
              showErrorMsg: false,
            });
            let appNames = resp.appNames.sort((a,b) => self.sortAppByCPU(a,b));
            if(appNames.length>0){
                this.handleAppNameSelected(appNames[0]);
            }
        });
      })
      .catch(msg => {
        // reset UI
        this.setState({ 
          showErrorMsg: true,
          loading: false,
        });
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
    let { loading, data, projectName, interval, appNames, appCpuJson, selectedAppName, showErrorMsg } = this.state;
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
          {showErrorMsg ?
          <h3>Forecast data unavailable for this project.</h3>
          :
          <div className="ui grid">
            <div className="three wide column">
              <table className="ui selectable celled table">
                <thead>
                  <tr>
                  <th><span style={{fontWeight:'bold'}}>Application Names</span> <br/>(sorted by CPU usage)</th>
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
              <LiveAnalysisCharts data={data} chartType="bar" loading={loading} alertMissingData={false} 
                enablePublish={false} isForecast={true} onRefresh={() => this.handleAppNameSelected(selectedAppName)}/>
            </div>
          </div>}
        </div>
      </Console.Content>
    )
  }
}

export default AppForecast;
