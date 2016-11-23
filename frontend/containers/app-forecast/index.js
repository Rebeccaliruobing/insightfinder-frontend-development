import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import cx from 'classnames';
import store from 'store';
import _ from 'lodash'
import { Console, Dropdown } from '../../artui/react';
import apis from '../../apis';
import { LiveProjectSelection } from '../../components/selections';
import DataParser from '../../components/cloud/dataparser';
import { DataGroupCharts } from '../../components/share/charts';


const getSelectedGroup = (value, appGroups) => {
  let selectedGroups = appGroups;
  const newNames = [];

  if (appGroups && value) {
    const names = value.split(',');
    const groups = [];
    _.forEach(names, (n) => {
      const gp = _.find(appGroups, g => g.metrics === n);
      if (gp) {
        groups.push(gp);
        newNames.push(n);
      }
    });
    selectedGroups = groups;
  }

  return {
    names: newNames,
    selectedGroups,
  };
};

const getSelectedAppData = (appName, appObj, metricUnitMapping, periodMap) => {

  const dataObj = appObj.appForecastData;
  const appPeriodMap = periodMap[appName] || {};

  const appData = {
    instanceMetricJson: {
      latestDataTimestamp: appObj.endDataTimestamp,
    },
    metricUnitMapping,
    data: dataObj ? dataObj[appName] : null,
  };

  const dp = new DataParser(appData);
  dp.getSummaryData();
  dp.getMetricsData();

  return {
    appData,
    appPeriodMap,
    appGroups: dp.groupsData,
  };
};

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
      showErrorMsg: false,
      chartDateWindow: undefined,
      selectedMetrics: '',
      selectedGroups: null,
      hideGroupSelector: true,
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
    const { appObj, metricUnitMapping, periodMap, selectedMetrics } = this.state;
    const { appData, appPeriodMap, appGroups } =
      getSelectedAppData(appName, appObj, metricUnitMapping, periodMap);
    const { names, selectedGroups } = getSelectedGroup(selectedMetrics, appGroups);

    this.setState({
      selectedAppName: appName,
      data: appData,
      appGroups,
      selectedGroups,
      selectedMetrics: names.join(','),
      thisPeriodMap: appPeriodMap,
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

  @autobind
  handleDateWindowSync(dateWindow) {
    this.setState({ chartDateWindow: dateWindow });
  }

  @autobind
  refreshProjectName(projectName) {
    const self = this;
    let selectedMetrics = store.get(`${projectName}-forecast-metrics`, '');
    store.set('liveAnalysisProjectName', projectName);
    this.setState({
      loading: true,
      projectName,
      selectedMetrics,
      hideGroupSelector: true,
    }, () => {
      apis.retrieveAppForecastData(projectName)
        .then((resp) => {
          let appNames = resp.appNames;
          const appObj = resp.appObj;
          const appCpuJson = resp.appCpuJson;
          const periodMap = resp.periodMap;
          const metricUnitMapping = resp.metricUnitMapping;
          let appName = null;
          let data = null;
          let thisPeriodMap = null;
          let appGroups = null;
          let selectedGroups = null;


          appNames = appNames.sort((a, b) => self.sortAppByCPU(a, b));
          if (appNames.length > 0) {
            appName = appNames[0];
            const d = getSelectedAppData(appName, appObj, metricUnitMapping, periodMap);
            data = d.appData;
            thisPeriodMap = d.appPeriodMap;
            appGroups = d.appGroups;
            const g = getSelectedGroup(selectedMetrics, appGroups);
            selectedGroups = g.selectedGroups;
            selectedMetrics = g.names.join(',');
            store.set(`${projectName}-forecast-metrics`, selectedMetrics);
          }

          this.setState({
            loading: false,
            appNames,
            appCpuJson,
            appObj,
            periodMap,
            metricUnitMapping,
            selectedAppName: appName,
            data,
            thisPeriodMap,
            appGroups,
            selectedGroups,
            selectedMetrics,
            hideGroupSelector: false,
            showErrorMsg: false,
          });
        })
        .catch(() => {
          // reset UI
          this.setState({
            showErrorMsg: true,
            loading: false,
          });
        });
    });
  }

  @autobind
  handleProjectChange(value, projectName) {
    this.refreshProjectName(projectName);
  }

  @autobind
  handleMetricSelectionChange(value) {
    const { projectName, appGroups } = this.state;
    store.set(`${projectName}-forecast-metrics`, value);
    const { names, selectedGroups } = getSelectedGroup(value, appGroups);

    this.setState({
      selectedMetrics: names.join(','),
      selectedGroups,
    });
  }

  render() {
    const {
      loading, data, projectName, appNames, appGroups, selectedGroups,
      thisPeriodMap, showErrorMsg, selectedMetrics, hideGroupSelector,
    } = this.state;
    const refreshName = store.get('liveAnalysisProjectName') || projectName;
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
                  { selectedGroups && appGroups &&
                  <div
                    className="field"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  >
                    <label style={{ fontWeight: 'bold', paddingRight: 10 }}>Metric
                      Filters:</label>
                    { !hideGroupSelector &&
                    <Dropdown
                      key={projectName}
                      className="forecast" mode="select" multiple
                      value={selectedMetrics}
                      onChange={this.handleMetricSelectionChange}
                      style={{ minWidth: 200 }}
                    >
                      <div className="menu">
                        {
                          appGroups.map(g => (
                            <div
                              className="item" key={g.metrics}
                              data-value={g.metrics}
                            >{g.metrics}</div>
                          ))
                        }
                      </div>
                    </Dropdown>
                    }
                  </div>
                  }
                  { !!selectedGroups &&
                  <div className="ui grid">
                    <DataGroupCharts
                      orderByMetric={false}
                      chartType="bar"
                      groups={selectedGroups} view="list"
                      latestDataTimestamp={data.instanceMetricJson.latestDataTimestamp}
                      periodMap={thisPeriodMap}
                      alertMissingData={false}
                      onDateWindowChange={this.handleDateWindowSync}
                      dateWindow={this.state.chartDateWindow}
                    />
                  </div>
                  }
                </div>
              </div>
          )}
        </div>
      </Console.Content >
    );
  }
}

export default AppForecast;
