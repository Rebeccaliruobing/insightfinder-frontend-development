/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import cx from 'classnames';
import R from 'ramda';
import store from 'store';
import _ from 'lodash';
import { State } from '../../src/common/types';
import withRouter from '../withRouter';
import { Console, Dropdown } from '../../artui/react';
import apis from '../../apis';
import { hideAppLoader } from '../../src/common/app/actions';
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

class AppForecastCore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true,
      instanceGroups: [],
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
    const { router, location } = this.props;
    const projects = this.getLiveProjectInfos();

    if (projects.length === 0) {
      router.push('/settings/project-list/custom');
    } else {
      let projectName = location.query.projectName || store.get('liveAnalysisProjectName');
      if (!projectName ||
        (projectName && !projects.find(item => item.projectName === projectName))) {
        projectName = projects[0].projectName;
      }
      this.handleProjectChange(projectName);
    }
  }

  getLiveProjectInfos() {
    return this.props.projects;
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
  handleRefreshClick() {
    this.refreshInstanceGroup();
  }

  @autobind
  refreshInstanceGroup(params) {
    const { location, hideAppLoader } = this.props;
    const query = params || this.applyDefaultParams(location.query);
    const { projectName, instanceGroup } = query;

    const self = this;
    let selectedMetrics = store.get(`${projectName}-forecast-metrics`, '');
    store.set('liveAnalysisProjectName', projectName);

    this.setState({
      loading: true,
      projectName,
      selectedMetrics,
      hideGroupSelector: true,
    }, () => {
      apis.retrieveAppForecastData(projectName, instanceGroup)
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
          }, () => {
            hideAppLoader();
          });
        })
        .catch(() => {
          // reset UI
          this.setState({
            showErrorMsg: true,
            loading: false,
          }, () => {
            hideAppLoader();
          });
        });
    });
  }

  @autobind
  handleInstanceGroupChange(instanceGroup) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query, instanceGroup,
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup(query);
  }

  @autobind
  handleProjectChange(projectName) {
    this.setState({
      loading: true,
    }, () => {
      apis.loadInstanceGrouping(projectName, 'getGrouping')
        .then((resp) => {
          if (resp.groupingString) {
            let groups = resp.groupingString.split(',').sort();
            const pos = groups.indexOf('All');
            if (pos !== -1) {
              const len = groups.length;
              groups = groups.slice(1, len).concat(groups.slice(0, 1));
            }

            // Get the group to display
            const { location, router } = this.props;
            let query = this.applyDefaultParams({
              ...location.query,
            });

            let instanceGroup = query.instanceGroup;
            if (groups && groups.length > 0) {
              if (instanceGroup && groups.indexOf(instanceGroup) < 0) {
                instanceGroup = groups[0];
              }
            } else {
              instanceGroup = '';
            }
            query = this.applyDefaultParams({
              ...location.query,
              projectName,
              instanceGroup,
            });
            router.push({
              pathname: location.pathname,
              query,
            });

            this.setState({
              instanceGroups: groups,
            }, () => {
              this.refreshInstanceGroup(query);
            });
          }
        });
    });
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

  applyDefaultParams(params) {
    return {
      instanceGroup: 'All',
      ...params,
    };
  }

  render() {
    const { location } = this.props;
    const { projectName, instanceGroup } = this.applyDefaultParams(location.query);
    const {
      loading, data, instanceGroups, appNames, appGroups, selectedGroups,
      thisPeriodMap, showErrorMsg, selectedMetrics, hideGroupSelector,
    } = this.state;
    return (
      <Console.Content
        className={`app-forecast ${loading ? 'ui form loading' : ''}`}
        style={{ paddingLeft: 0 }}
      >
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
              <label style={{ fontWeight: 'bold' }}>Group:</label>
              <Dropdown
                key={projectName}
                mode="select"
                searchable
                value={instanceGroup}
                onChange={this.handleInstanceGroupChange}
                style={{ minWidth: 200 }}
              >
                <div className="menu">
                  {
                    instanceGroups.map(g => (
                      <div className="item" key={g} data-value={g}>{g}</div>
                    ))
                  }
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.handleRefreshClick}
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
                  {selectedGroups && appGroups &&
                    <div
                      className="field"
                      style={{ paddingTop: 10, paddingBottom: 10 }}
                    >
                      <label style={{ fontWeight: 'bold', paddingRight: 10 }}>Metric
                      Filters:</label>
                      {!hideGroupSelector &&
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
                  {!!selectedGroups &&
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

const AppForecast = withRouter(AppForecastCore);

export default connect(
  (state: State) => {
    return {
      projects: R.filter(p => p.isMetric, state.app.projects),
    };
  },
  { hideAppLoader },
)(AppForecast);
