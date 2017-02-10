/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { PropTypes as T } from 'react';
import store from 'store';
import _ from 'lodash';
import { withRouter } from 'react-router';
import moment from 'moment';
import { autobind } from 'core-decorators';
import DatePicker from 'react-datepicker';
import { Console, Dropdown } from '../../artui/react';

import DateTimePicker from '../../components/ui/datetimepicker/index';
import apis from '../../apis';
import { ProjectStatistics } from '../../components/statistics';
import { IncidentsList } from '../../components/incidents';
import IncidentsTreeMap from '../../components/incidents/treemap';
import {
  LiveProjectSelection,
  TreeMapSchemeSelect,
  TreeMapCPUThresholdSelect,
  TreeMapAvailabilityThresholdSelect,
} from '../../components/selections';
import { buildTreemap } from '../../apis/retrieve-liveanalysis';
import TenderModal from '../../components/cloud/liveanalysis/tenderModal';

class EventSummary extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  static propTypes = {
    location: T.object,
    router: T.shape({
      push: T.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

    this.state = {
      treeMapCPUThreshold: '0',
      treeMapAvailabilityThreshold: '90',
      treeMapScheme: 'anomaly',
      treeMapText: 'Utilization',
      data: {
        statistics: {},
        summary: {},
        incidents: [],
        incidentsTreeMap: [],
        instanceMetaData: {},
        eventStats: {},
      },
      loading: true,
      showTenderModal: false,
      selectedIncident: undefined,
      instanceGroups: [],
      projectName: undefined,
      numberOfDays: '7',
      endTime: moment(),
      modelType: 'Holistic',
      instanceGroup: '',
      selectedInstance: undefined,
    };
  }

  componentDidMount() {
    const { router, location } = this.props;
    const projects = this.getLiveProjectInfos();

    if (projects.length === 0) {
      router.push('/log/incident-log-analysis');
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
    // exclude GCP and File Replay
    let pinfos = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    pinfos = pinfos.filter(item => item.fileProjectType !== 0);
    return pinfos;
  }

  @autobind()
  handleIncidentSelected(incident, type) {
    const { location } = this.props;
    const { projectName, numberOfDays } = this.applyDefaultParams(location.query);
    const { data, maxAnomalyRatio, minAnomalyRatio } = this.state;
    let incidentsTreeMap;
    let groupIdMap = {};
    if (incident) {
      const caption = `Event #${incident.id}`;
      const stats = incident.instanceMetricJson || {};
      groupIdMap = stats.groupIdMap;
      stats.startTimestamp = incident.startTimestamp;
      stats.endTimestamp = incident.endTimestamp;
      stats.maxAnomalyRatio = maxAnomalyRatio;
      stats.minAnomalyRatio = minAnomalyRatio;
      incidentsTreeMap =
        buildTreemap(projectName, caption, stats, incident.anomalyMapJson, incident);
    } else {
      groupIdMap = _.get(data, 'instanceMetricJson.groupIdMap');
      const caption = `${projectName} (${numberOfDays}d)`;
      data.statistics.maxAnomalyRatio = maxAnomalyRatio;
      data.statistics.minAnomalyRatio = minAnomalyRatio;
      incidentsTreeMap = buildTreemap(projectName, caption, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap,
      groupIdMap,
      selectedIncident: incident,
      treeMapScheme: 'anomaly',
      currentTreemapData: undefined,
      lineChartType: type,
    });
  }

  @autobind
  refreshDataByTime(startTime, endTime) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query,
      startTime: startTime.format(this.dateFormat),
      endTime: endTime.format(this.dateFormat),
    });

    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup(query);
  }

  @autobind
  handleStartTimeChange(newDate) {
    const { location } = this.props;
    const curTime = moment();

    const startTime = newDate.clone().startOf('day');
    let endTime = moment(location.query.endTime).endOf('day');

    const diffDays = endTime.diff(startTime, 'days');
    if (diffDays >= this.defaultNumberOfDays - 1 || diffDays <= 0) {
      endTime = startTime.clone().add(this.defaultNumberOfDays - 1, 'day');
    }
    if (endTime >= curTime) {
      endTime = curTime.endOf('day');
    }

    this.refreshDataByTime(startTime, endTime);
  }

  @autobind
  handleEndTimeChange(newDate) {
    const { location } = this.props;

    const endTime = newDate.clone().endOf('day');
    let startTime = moment(location.query.startTime).startOf('day');

    const diffDays = endTime.diff(startTime, 'days');
    if (diffDays >= this.defaultNumberOfDays - 1 || diffDays <= 0) {
      startTime = endTime.clone().subtract(this.defaultNumberOfDays - 1, 'day');
    }

    this.refreshDataByTime(startTime, endTime);
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
  handleRefreshClick() {
    this.refreshInstanceGroup();
  }

  @autobind
  refreshInstanceGroup(params) {
    const { location } = this.props;
    const query = params || this.applyDefaultParams(location.query);
    const modelType = query.modelType;
    const endTime = moment(query.endTime).endOf('day');
    const startTime = moment(query.startTime).startOf('day');

    const curTime = moment();
    const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();
    const numberOfDays = endTime.diff(startTime, 'days') + 1;

    const { projectName, instanceGroup } = query;

    const pinfo = this.getLiveProjectInfos().find(p => p.projectName === projectName);
    const pvalue = pinfo ? pinfo.pvalue : '0.99';
    const cvalue = pinfo ? pinfo.cvalue : '1';

    store.set('liveAnalysisProjectName', projectName);

    this.setState({
      loading: true,
    }, () => {
      apis.retrieveLiveAnalysis(projectName, modelType, instanceGroup,
        pvalue, cvalue, realEndTime.valueOf(), numberOfDays, 3)
        .then((data) => {
          const anomalyRatioLists = data.incidents.map(inc => inc.anomalyRatio);
          const maxAnomalyRatio = _.max(anomalyRatioLists);
          const minAnomalyRatio = _.min(anomalyRatioLists);

          this.setState({
            loading: false,
            // incidentsTreeMap: data.incidentsTreeMap,
            data,
            maxAnomalyRatio,
            minAnomalyRatio,
            startTimestamp: data.startTimestamp,
            endTimestamp: data.endTimestamp,
            showTenderModal: false,
          }, () => {
            const latestTimestamp = _.get(data, 'instanceMetricJson.latestDataTimestamp');
            const incidentDurationThreshold = 15;
            const detectedIncidents =
              data.incidents.filter(
                incident => incident.startTimestamp <= latestTimestamp &&
                  incident.duration >= parseInt(incidentDurationThreshold, 10));

            if (detectedIncidents.length > 0) {
              this.handleIncidentSelected(detectedIncidents[detectedIncidents.length - 1], 'detected');
            } else {
              this.handleIncidentSelected(undefined, 'detected');
            }
          });
        })
        .catch((msg) => {
          this.setState({ loading: false });
          console.log(msg);
        });
    });
  }

  @autobind
  handleProjectChange(projectName) {
    let { dashboardUservalues } = this.context;
    let { projectModelAllInfo } = dashboardUservalues;
    let project = projectModelAllInfo.find((info)=>info.projectName == projectName);
    let { predictionWindow } = project;

    this.setState({
      loading: true,
      predictionWindow,
      currentTreemapData: undefined,
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
  handleTreeMapAvailabilityThreshold(value) {
    this.setState({ treeMapAvailabilityThreshold: value });
  }

  @autobind
  handleTreeMapCPUThreshold(value) {
    this.setState({ treeMapCPUThreshold: value });
  }

  @autobind
  handleTreeMapScheme(value) {
    this.setState({ treeMapScheme: value });
  }

  getTreeMapSchemeText(scheme) {
    if (scheme === 'anomaly') {
      return 'Anomaly';
    } else if (scheme === 'cpu') {
      return 'CPU Utilization';
    } else if (scheme === 'availability') {
      return 'Availability';
    }
    return 'error';
  }

  applyDefaultParams(params) {
    return {
      startTime: moment().subtract(this.defaultNumberOfDays - 1, 'days')
        .startOf('day').format(this.dateFormat),
      endTime: moment().endOf('day').format(this.dateFormat),
      modelType: 'Holistic',
      instanceGroup: 'All',
      ...params,
    };
  }

  render() {
    const { location } = this.props;
    const params = this.applyDefaultParams(location.query);
    const { projectName, instanceGroup, modelType } = params;
    let { startTime, endTime } = params;
    const { loading, data, incidentsTreeMap, predictionWindow,
      treeMapCPUThreshold, treeMapAvailabilityThreshold, treeMapScheme, selectedIncident,
      instanceGroups, lineChartType, groupIdMap } = this.state;

    // Convert startTime, endTime to moment object
    startTime = moment(startTime, this.dateFormat);
    endTime = moment(endTime, this.dateFormat);
    const curTime = moment();
    const maxEndTime = curTime;
    const maxStartTime = curTime;
    const realEndTime = (endTime > curTime ? curTime : endTime).valueOf();
    const numberOfDays = endTime.diff(startTime, 'days') + 1;

    const treeMapSchemeText = this.getTreeMapSchemeText(treeMapScheme);
    const latestTimestamp = _.get(data, 'instanceMetricJson.latestDataTimestamp');
    const instanceStatsMap = _.get(data, 'instanceMetricJson.instanceStatsJson', {});
    const instanceMetaData = data.instanceMetaData || {};
    const projectType = data.projectType || '';
    let selectedIncidentPredicted = selectedIncident ?
      (selectedIncident.endTimestamp > latestTimestamp) : false;
    if (!selectedIncident && lineChartType && lineChartType === 'predicted') {
      selectedIncidentPredicted = true;
    }

    return (
      <Console.Content
        className={`event-summary ${loading ? 'ui form loading' : ''}`}
        style={{ background: '#f5f5f5', paddingLeft: 0 }}
      >
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px 10px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection
                style={{ minWidth: 150 }} value={projectName} onChange={this.handleProjectChange}
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
                style={{ minWidth: 150 }}
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
              <div className="ui input">
                <DatePicker
                  selected={startTime}
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  maxDate={maxStartTime}
                  onChange={this.handleStartTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End Date:</label>
              <div className="ui input">
                <DatePicker
                  selected={endTime}
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  maxDate={maxEndTime}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.handleRefreshClick}
              >Refresh</div>
            </div>
          </div>
          {false && <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '8px 0', borderBottom: 0 }}
          >
            <ProjectStatistics data={data} dur={numberOfDays} />
          </div>}
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 4 }}
          >
            <div className="ui incidents grid">
              <div className="row" style={{ height: 700, paddingTop: 0 }}>
                <div className="seven wide column" style={{ height: 600, paddingRight: 0 }}>
                  <IncidentsList
                    projectName={projectName} projectType={projectType}
                    endTime={realEndTime} numberOfDays={numberOfDays} modelType={modelType}
                    onIncidentSelected={this.handleIncidentSelected}
                    incidents={data.incidents}
                    causalDataArray={data.causalDataArray}
                    causalTypes={data.causalTypes}
                    latestTimestamp={latestTimestamp}
                    predictionWindow={predictionWindow}
                  />
                </div>
                <div className="nine wide column" style={{ height: 600, paddingTop: 20 }}>
                  {treeMapScheme === 'anomaly' && <b>Show event by:&nbsp;&nbsp;</b>}
                  {treeMapScheme !== 'anomaly' && <b>Show instance by:&nbsp;&nbsp;</b>}
                  <TreeMapSchemeSelect
                    style={{ width: 130 }} value={treeMapScheme}
                    text={treeMapSchemeText}
                    onChange={this.handleTreeMapScheme}
                  />
                  {treeMapScheme === 'cpu' && <TreeMapCPUThresholdSelect
                    style={{ minWidth: 10 }} value={treeMapCPUThreshold}
                    text={`<=${treeMapCPUThreshold}%`}
                    onChange={this.handleTreeMapCPUThreshold}
                  />}
                  {treeMapScheme === 'availability' && <TreeMapAvailabilityThresholdSelect
                    style={{ minWidth: 10 }} value={treeMapAvailabilityThreshold}
                    text={`<=${treeMapAvailabilityThreshold}%`}
                    onChange={this.handleTreeMapAvailabilityThreshold}
                  />
                  }
                  <IncidentsTreeMap
                    data={incidentsTreeMap} instanceMetaData={instanceMetaData}
                    endTime={realEndTime} numberOfDays={numberOfDays}
                    instanceStatsJson={instanceStatsMap}
                    treeMapScheme={treeMapScheme} groupIdMap={groupIdMap}
                    treeMapCPUThreshold={treeMapCPUThreshold}
                    treeMapAvailabilityThreshold={treeMapAvailabilityThreshold}
                    predictedFlag={selectedIncidentPredicted} instanceGroup={instanceGroup}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showTenderModal &&
          <TenderModal
            dataArray={data.causalDataArray} types={data.causalTypes}
            endTimestamp={latestTimestamp}
            startTimestamp={latestTimestamp}
            onClose={() => this.setState({ showTenderModal: false })}
          />
        }
      </Console.Content>
    );
  }
}

export default withRouter(EventSummary);
