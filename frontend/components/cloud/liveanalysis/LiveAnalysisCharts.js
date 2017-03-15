import React, { PropTypes as T } from 'react';
import store from 'store';
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import apis from '../../../apis';
import { Console, Dropdown, ButtonGroup, Button } from '../../../artui/react';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import TenderModal from './tenderModal';
import ShareModal from './shareModal';
import CommentsModal from './commentsModal';
import SysCallModal from '../../incidents/sysCallModal';
import { getRootCauseNameFromHints } from '../../utils';
import { GridColumns, DefaultView, ShowSummaryFlag } from '../../storeKeys';
import { DataSummaryChart, DataGroupCharts } from '../../share/charts';

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

class LiveAnalysisCharts extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    enablePublish: React.PropTypes.bool,
    onRefresh: React.PropTypes.func,
    predictedFlag: T.string,
    isForecast: T.bool,
    chartType: React.PropTypes.string,
  };

  static defaultProps = {
    data: {},
    loading: true,
    enablePublish: false,
    chartType: 'line',
    onRefresh: () => { },
    predictedFlag: '',
    isForecast: false,
  };

  constructor(props) {
    super(props);
    this.dp = null;

    const { predictedFlag } = props;
    const initView = predictedFlag === 'true' ? 'list' : 'grid';

    this.state = {
      instanceName: false,
      view: (store.get(DefaultView, initView)).toLowerCase(),
      columns: (store.get(GridColumns, 'four')).toLowerCase(),
      showSummaryFlag: (store.get(ShowSummaryFlag, 'yes')),
      selectedGroupId: undefined,
      selectedAnnotation: null,
      showSettingModal: false,
      showTenderModal: false,
      showAnomalySummary: false,
      showShareModal: false,
      showComments: false,
      showDebug: false,
      startTimestamp: undefined,
      endTimestamp: undefined,
      isForecast: false,
      selectedMetrics: '',
      selectedGroups: null,
    };

    if (props.isForecast && !!props.isForecast) {
      this.state.isForecast = true;
      this.state.view = 'list';
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  @autobind
  calculateData() {
    // Cache the data, and recalculate it if changed.
    const { data, loading, onRefresh,
      projectName, instanceName, metricName,
      startTimestamp, detectSuccess, ...rest } = this.props;
    if (this.latestData !== data && !!data) {
      this.dp = new DataParser(data, rest);
      this.dp.getSummaryData();
      this.dp.getMetricsData();

      // Sort the grouped data
      this.summary = this.dp.summaryData;
      this.causalDataArray = this.dp.causalDataArray;
      this.causalTypes = this.dp.causalTypes;
      this.groups = this.dp.groupsData || [];
      this.groupMetrics = this.dp.groupmetrics || null;

      this.latestData = data;
    } else {
      // create missing msg
      if (!this.summary && (!this.groups || this.groups.length === 0)) {
        if (detectSuccess !== undefined) {
          // failed detection
          this.errorMsg = 'Detection failed';
          if (projectName) {
            this.errorMsg += ` for project ${projectName}`;
          }
        } else {
          // display project data
          this.errorMsg = 'Empty data';
          if (instanceName) {
            this.errorMsg += ` for instance ${instanceName}`;
            if (metricName) {
              this.errorMsg += `, metric ${metricName}`;
            }
          }
          if (startTimestamp) {
            this.errorMsg += ' during requested time period';
          }
        }
      }
    }
    if (instanceName && data) {
      const metricAvgRaw = _.get(data.instanceMetricJson,
        ['instanceStatsJson', instanceName, 'statsByMetricJson'], {});
      const avgNumberOfDays = data.instanceMetricJson && data.instanceMetricJson.avgNumberOfDays;
      if (metricAvgRaw && avgNumberOfDays) {
        const metricAvg = {};
        Object.keys(metricAvgRaw).forEach((key) => {
          if (metricAvgRaw[key] && metricAvgRaw[key].avg !== undefined) {
            metricAvg[key] = ` (${avgNumberOfDays}d avg: ${metricAvgRaw[key].avg.toPrecision(3)})`;
          }
        });
        this.metricAvg = metricAvg;
      }
    }
  }

  saveDataToStorage() {
    const { projectName, ...rest } = this.props;
    const data = this.dp.data.data;
    const lines = data.trim().split('\\n');
    if (lines.length <= 1) {
      alert('empty data');
      return;
    }
    if (lines.length == 2 && lines[1] == '') {
      alert('empty data');
      return;
    }
    const line1 = lines[1];
    const fields1 = line1.split(',');
    const startTimestamp = parseInt(fields1[0]);
    let lineN = lines[lines.length - 1];
    if (lineN.trim().length == 0) {
      lineN = lines[lines.length - 2];
    }
    const fieldsN = lineN.split(',');
    const endTimestamp = parseInt(fieldsN[0]);

    this.setState({ loading: true }, () => {
      apis.postProjectDataSaveToStorage(projectName, startTimestamp, endTimestamp)
        .then((resp) => {
          if (resp.success) {
            alert(resp.message);
          } else {
            console.error(resp.message);
          }
          this.setState({ loading: false });
        })
        .catch((msg) => {
          console.error(msg);
          this.setState({ loading: false });
        });
    });
  }

  exportData() {
    const data = this.dp.data.data;
    const fname = 'data.csv';
    const csvString = data.split('\\n').join('\r\n');
    const csvData = new Blob([csvString], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = 'Click here';
    a.href = csvUrl;
    // a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
    a.target = '_blank';
    a.method = 'POST';
    a.download = fname;
    a.click();
    document.body.removeChild(a);
  }

  @autobind
  handleDateWindowSync(dateWindow) {
    this.setState({ chartDateWindow: dateWindow });
  }

  @autobind
  handleAnnotationClick(anno) {
    // TODO: Show metrics in the annoation?
    // if (anno && anno.text) {
    //   const metrics = anno.text.match(/metric:(?:.*),/g);
    //   console.log(metrics);
    // }
  }

  @autobind
  handleMetricSelectionChange(value) {
    if (this.groups) {
      const { names, selectedGroups } = getSelectedGroup(value, this.groups);
      this.setState({
        selectedMetrics: names.join(','),
        selectedGroups,
      });
    }
  }

  render() {
    let { loading, onRefresh, enablePublish, enableComments,
      debugData, timeRanking, freqRanking, projectName,
      periodMap, data, chartType, alertMissingData, bugId } = this.props;
    const { view, columns, showSummaryFlag, isForecast, selectedMetrics } = this.state;
    let { selectedGroups } = this.state;

    const userName = store.get('userName');
    debugData = debugData || [];
    timeRanking = timeRanking || [];
    freqRanking = freqRanking || [];
    this.calculateData();

    const isFileDetection = (data && data.caller && data.caller === 'fileDetection');
    const summary = this.summary;
    const dataArray = this.causalDataArray;
    const types = this.causalTypes;
    const groups = this.groups;
    if (!selectedGroups || selectedGroups.length === 0) {
      selectedGroups = groups;
    }
    const errorMsg = this.errorMsg;
    const metricAvg = this.metricAvg;
    const settingData = (_.keysIn(debugData)).length != 0 || timeRanking.length != 0 || freqRanking != 0;
    const propsData = this.props.data ? this.props.data.instanceMetricJson : {};
    const latestDataTimestamp = propsData ? propsData.latestDataTimestamp : '';
    const instances = (propsData && propsData.instances) ? propsData.instances.split(',').length : 1;
    // incident table
    let incidents = [];
    const dataChunkName = data && data.dataChunkName;
    const metricTags = {};
    if (data && data.anomalyMetrics) {
      const anomalyMetrics = data.anomalyMetrics.split(',');
      _.each(anomalyMetrics, (am) => {
        metricTags[am] = ' (Anomaly Detected) ';
      });
    }
    if (projectName && (userName !== 'admin' && projectName.indexOf('@') === -1)) {
      enablePublish = true;
    }

    if (summary) {
      incidents = _.map(summary.incidentSummary, (a) => {
        const incidentObj = getRootCauseNameFromHints(a.text);
        return {
          id: a.id,
          rootCauseNames: incidentObj.rootCauseNames,
          start: incidentObj.start,
          duration: `${incidentObj.duration} minutes`,
          startTimestamp: incidentObj.startTimestamp,
          endTimestamp: incidentObj.endTimestamp,
          text: a.text,
        };
      });
    }

    return (
      <Console.Wrapper>
        <Console.Content style={{ paddingLeft: 0 }} className={loading ? 'ui form loading' : ''}>
          <div
            className="ui main tiny container"
            style={{ minHeight: '100%', display: loading && 'none' }}
          >
            <div className="ui vertical segment">
              <Button
                className="orange labeled icon"
                onClick={() => this.setState({ showTenderModal: true })} style={{ display: 'none' }}
              >
                <i className="icon random" /><span>Causal Graph</span>
              </Button>
              <Button
                className="labeled icon" style={{ display: !enablePublish && 'none' }}
                onClick={() => this.setState({ showShareModal: true })}
              >
                <i className="icon share alternate" /><span>Publish</span>
              </Button>
              <Button
                className="labeled icon" style={{ display: !enableComments && 'none' }}
                onClick={() => this.setState({ showComments: true })}
              >
                <i className="icon comments" /><span>Comments</span>
              </Button>
              {!bugId && !isForecast &&
                <Button className="labeled icon" onClick={() => onRefresh()}>
                  <i className="icon refresh" /><span>Refresh</span></Button>
              }
              {!isForecast &&
                <Button className="labeled icon" onClick={() => this.exportData()}>
                  <i className="icon download" /><span>Export</span></Button>
              }
              {projectName !== undefined &&
                <Button className="labeled icon" onClick={() => this.saveDataToStorage()}>
                  <i className="icon cloud" /><span>Save To Storage</span>
                </Button>
              }
              <Button
                className="orange labeled icon"
                onClick={() => this.setState({ showDebug: true })}
                style={{ display: settingData ? '' : 'none' }}
              >
                <i className="zoom icon" /><span>Faulty Localization Result</span>
              </Button>
              {!isForecast &&
                <ButtonGroup className="right floated basic icon">
                  {!bugId &&
                    <Button onClick={() => this.setState({ showSettingModal: true })}>
                      <i className="icon setting" />
                    </Button>
                  }
                  <Button
                    active={view === 'list'}
                    onClick={() => this.setState({ view: 'list' })}
                  >
                    <i className="align justify icon" />
                  </Button>
                  <Button
                    active={view === 'grid'}
                    onClick={() => this.setState({ view: 'grid' })}
                  >
                    <i className="grid layout icon" />
                  </Button>
                </ButtonGroup>
              }
            </div>
            <div className="ui vertical segment">
              <div className="ui grid">
                {(!summary) && (!groups || groups.length === 0) &&
                  <h3>{errorMsg}</h3>
                }
                {showSummaryFlag.toLowerCase() === 'yes' && !!summary &&
                  <DataSummaryChart
                    key="summary_chart"
                    summary={summary}
                    latestDataTimestamp={latestDataTimestamp}
                    onDateWindowChange={this.handleDateWindowSync}
                    dateWindow={this.state.chartDateWindow}
                    onAnnotationClick={this.handleAnnotationClick}
                  />
                }
                {!!groups && groups.length > 0 &&
                  <div className="sixteen wide column">
                    <label style={{ fontWeight: 'bold', paddingRight: 10 }}>Metric Filters:</label>
                    <Dropdown
                      className="forecast" mode="select" multiple
                      value={selectedMetrics}
                      onChange={this.handleMetricSelectionChange}
                      style={{ minWidth: 200 }}
                    >
                      <div className="menu">
                        {
                          groups.map(g => (
                            <div
                              className="item" key={g.metrics}
                              data-value={g.metrics}
                            >{g.metrics}</div>
                          ))
                        }
                      </div>
                    </Dropdown>
                  </div>
                }

                {!!selectedGroups && selectedGroups.length > 0 &&
                  <DataGroupCharts
                    chartType={chartType}
                    key={`${view}_group_charts`} metricTags={metricTags}
                    groups={selectedGroups} view={view} columns={columns}
                    latestDataTimestamp={latestDataTimestamp}
                    alertMissingData={alertMissingData}
                    periodMap={periodMap}
                    metricAvg={metricAvg}
                    onDateWindowChange={this.handleDateWindowSync}
                    dateWindow={this.state.chartDateWindow}
                  />
                }
              </div>
            </div>
          </div>
          {this.state.showSettingModal &&
            <SettingModal onClose={() => this.setState({ showSettingModal: false })} />
          }
          {this.state.showDebug &&
            <SysCallModal
              timeRanking={timeRanking} freqRanking={freqRanking}
              dataArray={debugData} onClose={() => this.setState({ showDebug: false })}
            />
          }
          {this.state.showTenderModal &&
            <TenderModal
              dataArray={dataArray} types={types}
              endTimestamp={this.state.endTimestamp}
              startTimestamp={this.state.startTimestamp}
              onClose={() => this.setState({ showTenderModal: false })}
            />
          }
          {this.state.showShareModal &&
            <ShareModal
              dataArray={dataArray}
              types={types} dp={this.dp}
              dataChunkName={dataChunkName}
              latestDataTimestamp={latestDataTimestamp} fromUser={userName}
              onClose={() => this.setState({ showShareModal: false })}
            />
          }
          {this.state.showComments &&
            <CommentsModal
              dataArray={dataArray} types={types} dp={this.dp}
              onClose={() => this.setState({ showComments: false })}
            />
          }
        </Console.Content>
      </Console.Wrapper>
    );
  }
}

export default LiveAnalysisCharts;
