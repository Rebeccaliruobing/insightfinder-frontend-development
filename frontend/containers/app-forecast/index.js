import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import cx from 'classnames';
import store from 'store';
import { Console } from '../../artui/react';
import apis from '../../apis';
import {
  LiveProjectSelection,
  ForecastIntervalHour,
} from '../../components/selections';
import LiveAnalysisCharts from '../../components/cloud/liveanalysis';

class AppForecast extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true,
      projectName: undefined,
      selectedAppName: undefined,
      appNames: [],
      appObj: {},
      appCpuJson: {},
      periodMap: {},
      metricUnitMapping: {},
      interval: '24',
      showErrorMsg: false,
    };
  }

  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter(item => item.fileProjectType !== 0);
    // remember select
    if (projects.length > 0) {
      const refreshName = store.get('liveAnalysisProjectName') || projects[0].projectName;
      this.handleProjectChange(refreshName, refreshName);
    } else {
      const url = '/newproject/project-list/custom';
      window.open(url, '_self');
    }
  }

  @autobind()
  handleAppNameSelected(appName) {
    const { appObj, metricUnitMapping, periodMap } = this.state;
    this.setState({
      loading: true,
      selectedAppName: appName,
    });
    const thisData = {};
    const instanceMetricJson = {};
    const endDataTimestamp = appObj.endDataTimestamp;
    const dataObj = appObj.appForecastData;
    const thisPeriodMap = periodMap[appName] || {};
    instanceMetricJson.latestDataTimestamp = endDataTimestamp;
    thisData.instanceMetricJson = instanceMetricJson;
    thisData.metricUnitMapping = metricUnitMapping;
    if (dataObj) {
      thisData.data = dataObj[appName];
    }
    this.setState({
      data: thisData,
      thisPeriodMap,
      loading: false,
    });
  }

  sortAppByCPU(a, b) {
    const { appCpuJson } = this.state;
    const aid = appCpuJson[a];
    const bid = appCpuJson[b];
    if (aid === undefined && bid === undefined) {
      return 0;
    } else if (aid !== undefined && bid === undefined) {
      return -1;
    } else if (aid === undefined && bid !== undefined) {
      return 1;
    } else if (aid < bid) {
      return 1;
    } else if (aid > bid) {
      return -1;
    }
    return 0;
  }

  refreshProjectName(projectName) {
    const self = this;
    store.set('liveAnalysisProjectName', projectName);
    this.setState({
      loading: true,
      projectName,
    });
    apis.retrieveAppForecastData(projectName)
      .then((resp) => {
        this.setState({
          loading: false,
          appNames: resp.appNames,
          appCpuJson: resp.appCpuJson,
          appObj: resp.appObj,
          periodMap: resp.periodMap,
          metricUnitMapping: resp.metricUnitMapping,
        }, () => {
          this.setState({
            showErrorMsg: false,
          });
          const appNames = resp.appNames.sort((a, b) => self.sortAppByCPU(a, b));
          if (appNames.length > 0) {
            this.handleAppNameSelected(appNames[0]);
          }
        });
      })
      .catch(() => {
        // reset UI
        this.setState({
          showErrorMsg: true,
          loading: false,
        });
      });
  }

  @autobind
  handleProjectChange(value, projectName) {
    this.refreshProjectName(projectName);
  }

  @autobind
  handleIntervalChange(value, interval) {
    const { selectedAppName } = this.state;
    this.setState({
      interval,
    }, () => {
      this.handleAppNameSelected(selectedAppName);
    });
  }

  render() {
    const {
      loading, data, projectName, interval, appNames,
      thisPeriodMap, selectedAppName, showErrorMsg,
    } = this.state;
    const refreshName = store.get('liveAnalysisProjectName') ? store.get('liveAnalysisProjectName') : projectName;
    return (
      <Console.Content className={loading ? 'ui form loading' : ''}>
        <div
          className="ui main tiny container"
          style={{ minHeight: '100%', display: loading && 'none' }}
        >
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 200 }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection
                value={projectName}
                onChange={this.handleProjectChange} style={{ minWidth: 200 }}
              />
            </div>
            {false && <div className="field">
              <label style={{ fontWeight: 'bold' }}>Forecast Interval
                (hour):</label>
              <ForecastIntervalHour
                value={interval}
                onChange={this.handleIntervalChange} style={{ minWidth: 80 }}
              />
            </div>}
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={() => this.refreshProjectName(refreshName)}
              >Refresh
              </div>
            </div>
          </div>
          {showErrorMsg ?
            <h3>Forecast data unavailable for this project.</h3>
            : (
              <div className="ui grid">
                <div className="three wide column">
                  <table className="ui selectable celled table">
                    <thead>
                      <tr>
                        <th><span
                          style={{ fontWeight: 'bold' }}
                        >Application Names</span>
                          <br />(sorted by CPU usage)
                    </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appNames.map((appName, i) => (
                        <tr
                          key={i}
                          onClick={() => this.handleAppNameSelected(appName)}
                          className={cx(
                        { active: appName === this.state.selectedAppName })
                      } style={{ cursor: 'pointer' }}
                        >
                          <td>{appName}</td>
                        </tr>
                  ))}
                    </tbody>
                  </table>
                </div>
                <div className="thirteen wide column">
                  <LiveAnalysisCharts
                    data={data} chartType="bar" loading={loading}
                    alertMissingData={false} periodMap={thisPeriodMap}
                    enablePublish={false} isForecast
                    onRefresh={() => this.handleAppNameSelected(selectedAppName)}
                  />
                </div>
              </div>
          )}
        </div>
      </Console.Content >
    );
  }
}

export default AppForecast;
