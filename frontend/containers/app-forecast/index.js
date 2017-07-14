/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import R from 'ramda';
import store from 'store';
import moment from 'moment';
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
    _.forEach(names, n => {
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

const getSelectedAppData = (appName, appObj, metricUnitMapping, periodMap, startTime) => {
  const dataObj = appObj.appForecastData;
  const appPeriodMap = periodMap[appName] || {};
  const dateFormat = 'YYYY-MM-DD';
  const startTimestamp = moment(startTime, dateFormat).startOf('day').valueOf();

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

  const groupsData = dp.groupsData;
  R.forEach(group => {
    const sdata = group.sdata || [];
    if (sdata.length > 0 && startTimestamp) {
      const ts = startTimestamp - 1000 * 1;
      const d = R.clone(sdata[0]);
      for (let i = 1; i < d.length; i += 1) {
        d[i] = null;
      }
      d[0] = new Date(ts);
      group.sdata = [d, ...sdata];
    }
  }, groupsData);

  return {
    appData,
    appPeriodMap,
    appGroups: dp.groupsData,
  };
};

class AppForecastCore extends Component {
  constructor(props) {
    super(props);

    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

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
      if (
        !projectName ||
        (projectName && !projects.find(item => item.projectName === projectName))
      ) {
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
    const { location } = this.props;
    const { startTime } = this.applyDefaultParams(location.query);
    const { appData, appPeriodMap, appGroups } = getSelectedAppData(
      appName,
      appObj,
      metricUnitMapping,
      periodMap,
      startTime,
    );
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
  refreshDataByTime(startTime) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query,
      startTime: startTime.format(this.dateFormat),
    });

    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup(query);
  }

  @autobind
  handleStartTimeChange(newDate) {
    const startTime = newDate.clone().startOf('day');
    this.refreshDataByTime(startTime);
  }

  @autobind
  refreshInstanceGroup(params) {
    const { location, hideAppLoader } = this.props;
    const query = params || this.applyDefaultParams(location.query);
    const { projectName, instanceGroup, startTime } = query;

    const self = this;
    let selectedMetrics = store.get(`${projectName}-forecast-metrics`, '');
    store.set('liveAnalysisProjectName', projectName);

    this.setState(
      {
        loading: true,
        projectName,
        selectedMetrics,
        hideGroupSelector: true,
      },
      () => {
        apis
          .retrieveAppForecastData(projectName, instanceGroup, startTime)
          .then(resp => {
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
              const d = getSelectedAppData(
                appName,
                appObj,
                metricUnitMapping,
                periodMap,
                startTime,
              );
              data = d.appData;
              thisPeriodMap = d.appPeriodMap;
              appGroups = d.appGroups;
              const g = getSelectedGroup(selectedMetrics, appGroups);
              selectedGroups = g.selectedGroups;
              selectedMetrics = g.names.join(',');
              store.set(`${projectName}-forecast-metrics`, selectedMetrics);
            }
            let { chartDateWindow } = this.state;
            if (chartDateWindow && chartDateWindow.length === 2) {
              const startTimestamp = moment(startTime, this.dateFormat).startOf('day').valueOf();
              chartDateWindow = [startTimestamp - 1000, chartDateWindow[1]];
            }

            this.setState(
              {
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
                chartDateWindow,
                hideGroupSelector: false,
                showErrorMsg: false,
              },
              () => {
                hideAppLoader();
              },
            );
          })
          .catch(() => {
            // reset UI
            this.setState(
              {
                showErrorMsg: true,
                loading: false,
              },
              () => {
                hideAppLoader();
              },
            );
          });
      },
    );
  }

  @autobind
  handleInstanceGroupChange(instanceGroup) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query,
      instanceGroup,
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup(query);
  }

  @autobind
  handleProjectChange(projectName) {
    this.setState(
      {
        loading: true,
      },
      () => {
        apis.loadInstanceGrouping(projectName, 'getGrouping').then(resp => {
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

            this.setState(
              {
                instanceGroups: groups,
              },
              () => {
                this.refreshInstanceGroup(query);
              },
            );
          }
        });
      },
    );
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
    let { startTime } = params;
    if (!startTime) {
      startTime = moment()
        .subtrace(this.defaultNumberOfDays, 'days')
        .startOf('day')
        .format(this.dateFormat);
    }

    return {
      instanceGroup: 'All',
      startTime,
      ...params,
    };
  }

  render() {
    const { location } = this.props;
    const { startTime, projectName, instanceGroup } = this.applyDefaultParams(location.query);
    const {
      loading,
      data,
      instanceGroups,
      appNames,
      appGroups,
      selectedGroups,
      thisPeriodMap,
      showErrorMsg,
      selectedMetrics,
      hideGroupSelector,
    } = this.state;
    const startTimeObj = moment(startTime, this.dateFormat);
    const nowObj = moment();
    return (
      <Console.Content
        className={`app-forecast ${loading ? 'ui form loading' : ''}`}
        style={{ paddingLeft: 0 }}
      >
        <div
          className="ui main tiny container"
          style={{ minHeight: '100%', display: loading && 'none' }}
        >
          <div className="ui right aligned vertical inline segment" style={{ zIndex: 200 }}>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection
                value={projectName}
                onChange={this.handleProjectChange}
                style={{ minWidth: 200 }}
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
                  {instanceGroups.map(g =>
                    <div className="item" key={g} data-value={g}>
                      {g}
                    </div>,
                  )}
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Start Date:</label>
              <div className="ui input">
                <DatePicker
                  selected={startTimeObj}
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  maxDate={nowObj}
                  onChange={this.handleStartTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
                Refresh
              </div>
            </div>
          </div>
          {showErrorMsg
            ? <h3>Forecast data unavailable for this project.</h3>
            : <div className="ui grid">
                <div className="three wide column">
                  <table className="ui selectable celled table">
                    <thead>
                      <tr>
                        <th>
                          <span style={{ fontWeight: 'bold' }}>Application Names</span>
                          <br />(sorted by CPU usage)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appNames.map((appName, i) =>
                        <tr
                          key={i}
                          onClick={() => this.handleAppNameSelected(appName)}
                          className={cx({ active: appName === this.state.selectedAppName })}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>
                            {appName}
                          </td>
                        </tr>,
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="thirteen wide column">
                  {selectedGroups &&
                    appGroups &&
                    <div className="field" style={{ paddingTop: 10, paddingBottom: 10 }}>
                      <label style={{ fontWeight: 'bold', paddingRight: 10 }}>
                        Metric Filters:
                      </label>
                      {!hideGroupSelector &&
                        <Dropdown
                          key={projectName}
                          className="forecast"
                          mode="select"
                          multiple
                          value={selectedMetrics}
                          onChange={this.handleMetricSelectionChange}
                          style={{ minWidth: 200 }}
                        >
                          <div className="menu">
                            {appGroups.map(g =>
                              <div className="item" key={g.metrics} data-value={g.metrics}>
                                {g.metrics}
                              </div>,
                            )}
                          </div>
                        </Dropdown>}
                    </div>}
                  {!!selectedGroups &&
                    <div className="ui grid">
                      <DataGroupCharts
                        orderByMetric={false}
                        chartType="bar"
                        groups={selectedGroups}
                        view="list"
                        latestDataTimestamp={data.instanceMetricJson.latestDataTimestamp}
                        periodMap={thisPeriodMap}
                        alertMissingData={false}
                        onDateWindowChange={this.handleDateWindowSync}
                        dateWindow={this.state.chartDateWindow}
                      />
                    </div>}
                </div>
              </div>}
        </div>
      </Console.Content>
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
