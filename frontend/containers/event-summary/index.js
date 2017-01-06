/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { PropTypes as T } from 'react';
import store from 'store';
import _ from 'lodash';
import { withRouter } from 'react-router';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { Console, Dropdown } from '../../artui/react';

import DateTimePicker from '../../components/ui/datetimepicker/index';
import apis from '../../apis';
import { ProjectStatistics } from '../../components/statistics';
import { IncidentsList } from '../../components/incidents';
import IncidentsTreeMap from '../../components/incidents/treemap';
import {
  LiveProjectSelection,
  NumberOfDays, TreeMapSchemeSelect,
  TreeMapCPUThresholdSelect,
  TreeMapAvailabilityThresholdSelect,
  EventSummaryModelType,
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
      router.push('/cloud/incident-log-analysis');
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
    if (incident) {
      const caption = `Event #${incident.id}`;
      const stats = incident.instanceMetricJson || {};
      stats.startTimestamp = incident.startTimestamp;
      stats.endTimestamp = incident.endTimestamp;
      stats.maxAnomalyRatio = maxAnomalyRatio;
      stats.minAnomalyRatio = minAnomalyRatio;
      incidentsTreeMap =
        buildTreemap(projectName, caption, stats, incident.anomalyMapJson, incident);
    } else {
      const caption = `${projectName} (${numberOfDays}d)`;
      data.statistics.maxAnomalyRatio = maxAnomalyRatio;
      data.statistics.minAnomalyRatio = minAnomalyRatio;
      incidentsTreeMap = buildTreemap(projectName, caption, data.statistics, data.anomalyMapJson);
    }
    this.setState({
      incidentsTreeMap,
      selectedIncident: incident,
      treeMapScheme: 'anomaly',
      currentTreemapData: undefined,
      lineChartType: type,
    });
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query, modelType,
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup();
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    const { location, router } = this.props;
    const query = this.applyDefaultParams({
      ...location.query, numberOfDays: numberOfDays.toString(),
    });
    router.push({
      pathname: location.pathname,
      query,
    });

    this.refreshInstanceGroup();
  }

  @autobind
  handleEndTimeChange(value) {
    const { location, router } = this.props;
    const endTime = moment(value).endOf('day').format('YYYY-MM-DD');
    if (location.query.endTime !== endTime) {
      router.push({
        pathname: location.pathname,
        query: this.applyDefaultParams({ ...location.query, endTime }),
      });

      this.refreshInstanceGroup();
    }
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

    this.refreshInstanceGroup();
  }

  @autobind
  refreshInstanceGroup() {
    const { location } = this.props;
    const query = this.applyDefaultParams(location.query);
    const endTime = moment(query.endTime).valueOf();
    const { projectName, instanceGroup, numberOfDays, modelType } = query;

    const pinfo = this.getLiveProjectInfos().find(p => p.projectName === projectName);
    const pvalue = pinfo ? pinfo.pvalue : '0.99';
    const cvalue = pinfo ? pinfo.cvalue : '1';

    store.set('liveAnalysisProjectName', projectName);

    this.setState({
      loading: true,
    }, () => {
      apis.retrieveLiveAnalysis(projectName, modelType, instanceGroup,
        pvalue, cvalue, endTime, numberOfDays, 3)
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
    this.setState({
      loading: true,
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
            const query = this.applyDefaultParams({
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
            router.push({
              pathname: location.pathname,
              query: this.applyDefaultParams({
                ...location.query,
                projectName,
                instanceGroup,
              }),
            });

            this.setState({
              instanceGroups: groups,
            }, () => {
              this.refreshInstanceGroup();
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

  modelDateValidator(date) {
    return moment(date) <= moment();
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
      endTime: moment().endOf('day').format('YYYY-MM-DD'),
      numberOfDays: 7,
      modelType: 'Holistic',
      instanceGroup: 'All',
      ...params,
    };
  }

  render() {
    const { location } = this.props;
    const { projectName, instanceGroup, endTime, numberOfDays, modelType } =
      this.applyDefaultParams(location.query);
    const { loading, data, incidentsTreeMap,
      treeMapCPUThreshold, treeMapAvailabilityThreshold, treeMapScheme, selectedIncident,
      instanceGroups, lineChartType } = this.state;

    const treeMapSchemeText = this.getTreeMapSchemeText(treeMapScheme);
    const latestTimestamp = _.get(data, 'datainstanceMetricJson.latestDataTimestamp');
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
        className={loading ? 'ui form loading' : ''}
        style={{ background: '#f5f5f5' }}
      >
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection
                style={{ minWidth: 200 }} value={projectName} onChange={this.handleProjectChange}
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
              <label style={{ fontWeight: 'bold' }}>End date:</label>
              <div className="ui input">
                <DateTimePicker
                  className="ui input" style={{ width: '50%' }}
                  dateValidator={this.modelDateValidator}
                  dateTimeFormat="YYYY-MM-DD" value={endTime}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Number of Days:</label>
              <NumberOfDays
                style={{ width: 120 }}
                value={numberOfDays} onChange={this.handleDayChange}
              />
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Model Type:</label>
              <EventSummaryModelType
                style={{ width: 120 }}
                value={modelType} onChange={this.handleModelTypeChange}
              />
            </div>
            <div className="field">
              <div
                className="ui orange button" tabIndex="0"
                onClick={this.refreshInstanceGroup}
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
              <div className="row" style={{ height: 600, paddingTop: 0 }}>
                <div className="seven wide column" style={{ height: 500, paddingRight: 0 }}>
                  <IncidentsList
                    projectName={projectName} projectType={projectType}
                    endTime={endTime} numberOfDays={numberOfDays} modelType={modelType}
                    onIncidentSelected={this.handleIncidentSelected}
                    incidents={data.incidents}
                    causalDataArray={data.causalDataArray}
                    causalTypes={data.causalTypes} latestTimestamp={latestTimestamp}
                  />
                </div>
                <div className="nine wide column" style={{ height: 500, paddingTop: 20 }}>
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
                    endTime={endTime} numberOfDays={numberOfDays}
                    instanceStatsJson={instanceStatsMap}
                    treeMapScheme={treeMapScheme}
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
