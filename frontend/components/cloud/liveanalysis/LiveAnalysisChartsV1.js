import React from 'react';
import store from 'store';
import _ from 'lodash';
import moment from 'moment';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import apis from '../../../apis';
import { Console, ButtonGroup, Button } from '../../../artui/react';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import AnomalySummary from './anomalySummary';
import TenderModal from './tenderModal';
import ShareModal from './shareModal';
import CommentsModal from './commentsModal';
import { PieChart } from '../insight-report';
import SysCallModal from '../../incidents/sysCallModal';

import { GridColumns, DefaultView, ShowSummaryFlag } from '../../storeKeys';
import { DataSummaryChart, DataGroupCharts } from '../../share/charts';

class LiveAnalysisCharts extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    enablePublish: React.PropTypes.bool,
    onRefresh: React.PropTypes.func,
    chartType: React.PropTypes.string,
  };

  static defaultProps = {
    loading: true,
    enablePublish: false,
    chartType: 'line',
    onRefresh: () => {},
  };

  constructor(props) {
    super(props);
    this.dp = null;
    let initView = 'grid';
    if (props && props.predictedFlag && props.predictedFlag === 'true') {
      initView = 'list';
    }

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
      tabStates: {
        rootcause: '',
        chart: 'active',
        heatmap: ''
      }
    };

    if (props.isForecast && !!props.isForecast) {
      this.state.isForecast = true;
      this.state.view = 'list';
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  calculateData() {
    // Cache the data, and recalculate it if changed.
    let { data, loading, onRefresh, projectName, instanceName, metricName, startTimestamp, detectSuccess, ...rest } = this.props;
    if (this._data !== data && !!data) {
      this.dp = new DataParser(data, rest);
      this.dp.getSummaryData();
      this.dp.getMetricsData();

      // Sort the grouped data
      this.summary = this.dp.summaryData;
      this.causalDataArray = this.dp.causalDataArray;
      this.causalTypes = this.dp.causalTypes;
      this.groups = this.dp.groupsData || [];
      this.groupMetrics = this.dp.groupmetrics || null;

      this._data = data;
    } else {
      // create missing msg
      if (!this.summary && (!this.groups || this.groups.length == 0)) {
        if (detectSuccess != undefined) {
          // failed detection
          this.errorMsg = "Detection failed";
          if (projectName) {
            this.errorMsg += " for project " + projectName;
          }
        } else {
          // display project data
          this.errorMsg = "Empty data";
          if (instanceName) {
            this.errorMsg += " for instance " + instanceName;
            if (metricName) {
              this.errorMsg += ", metric " + metricName;
            }
          }
          if (startTimestamp) {
            this.errorMsg += " during requested time period";
          }
        }
      }
    }
    if (instanceName && data) {
      let metricAvgRaw = data['instanceMetricJson'] && data['instanceMetricJson']['instanceStatsJson'] && data['instanceMetricJson']['instanceStatsJson'][instanceName] && data['instanceMetricJson']['instanceStatsJson'][instanceName]['statsByMetricJson'];
      let avgNumberOfDays = data['instanceMetricJson'] && data['instanceMetricJson']['avgNumberOfDays'];
      if (metricAvgRaw && avgNumberOfDays) {
        let metricAvg = {}
        Object.keys(metricAvgRaw).forEach(function (key) {
          if (metricAvgRaw[key] && metricAvgRaw[key]['avg'] != undefined) {
            metricAvg[key] = ' (' + avgNumberOfDays + 'd avg: ' + metricAvgRaw[key]['avg'].toPrecision(3) + ')';
          }
        });
        this.metricAvg = metricAvg;
      }
    }
  }

  saveDataToStorage() {
    let { projectName, ...rest } = this.props;
    let data = this.dp.data.data;
    let lines = data.trim().split("\\n");
    if (lines.length <= 1) {
      alert("empty data");
      return;
    }
    if (lines.length == 2 && lines[1] == "") {
      alert("empty data");
      return;
    }
    let line1 = lines[1];
    let fields1 = line1.split(',');
    let startTimestamp = parseInt(fields1[0]);
    let lineN = lines[lines.length - 1];
    if (lineN.trim().length == 0) {
      lineN = lines[lines.length - 2];
    }
    let fieldsN = lineN.split(',');
    let endTimestamp = parseInt(fieldsN[0]);

    this.setState({ loading: true }, () => {
      apis.postProjectDataSaveToStorage(projectName, startTimestamp, endTimestamp)
        .then(resp => {
          if (resp.success) {
            alert(resp.message);
          } else {
            console.error(resp.message);
          }
          this.setState({ loading: false });
        })
        .catch(msg => {
          console.error(msg);
          this.setState({ loading: false });
        });
    });
  };

  exportData() {
    let data = this.dp.data.data;
    let fname = 'data.csv';
    var csvString = data.split('\\n').join("\r\n");
    let csvData = new Blob([csvString], { type: 'text/csv' });
    var csvUrl = URL.createObjectURL(csvData);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = "Click here";
    a.href = csvUrl;
    // a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
    a.target = '_blank';
    a.method = 'POST';
    a.download = fname;
    a.click();
    document.body.removeChild(a);
  };

  exportDataOld() {
    let data = this.dp.data.data;
    let fname = 'data.csv';
    var csvString = data.split('\\n').join("\r\n");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.innerHTML = "Click here";
    a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
    a.target = '_blank';
    a.method = 'POST';
    a.download = fname;
    a.click();
    document.body.removeChild(a);
  };

  _getRootCauseNameFromHints(incidentText) {
    // parse rootcause text and extract simplified rootcause names
    const rootCauseNameMap = {
      "cpu": "High CPU usage",
      "mem": "High memory usage",
      "disk": "High disk usage",
      "network": "Network traffic surge",
      "load": "High load",
      "request": "High request count",
      "latency": "High latency"
    };
    const suggestedActionMap = {
      "missing": "Check metric data source",
      "cpu": "Upgrade CPU spec",
      "mem": "Check for memory leak",
      "disk": "Upgrade disk spec",
      "network": "Check network traffic pattern",
      "load": "Check load",
      "request": "Check request count",
      "latency": "Check latency",
    };

    let rootCauseNames = new Set();
    let suggestedActions = new Set();
    let durationLine = incidentText.split("\n", 3)[0];
    let duration = durationLine.substring(9, durationLine.indexOf("minutes") - 1);
    let startLine = incidentText.split("\n", 3)[1];
    let start = startLine.substring(12, startLine.indexOf(","));
    let hintStr = incidentText.split("\n", 3)[2];
    let hints = hintStr.split("\n");
    let retObj = {};
    _.each(hints, function (h, ih) {
      let parts = h.split(",");
      if (false && parts[0].indexOf("missing") != -1) {
        rootCauseNames.add("Missing metric data");
        suggestedActions.add("Check metric data source");
      } else {
        // iterate through map
        let matched = false;
        for (var key in rootCauseNameMap) {
          if (parts[2].toLowerCase().indexOf(key) != -1) {
            rootCauseNames.add(rootCauseNameMap[key]);
            suggestedActions.add(suggestedActionMap[key]);
            matched = true;
          }
        }
      }
    });
    retObj["rootCauseNames"] = Array.from(rootCauseNames).join("\n");
    retObj["suggestedActions"] = Array.from(suggestedActions).join("\n");
    retObj["start"] = start;
    retObj["duration"] = duration;
    retObj["startTimestamp"] = 0 + moment(start);
    retObj["endTimestamp"] = 0 + moment(start) + parseInt(duration) * 60000;

    return retObj;
  }

  @autobind
  handleDateWindowSync(dateWindow) {
    this.setState({ chartDateWindow: dateWindow });
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({ tabStates: tabStates });
  }

  render() {

    let { loading, onRefresh, enablePublish, enableComments, debugData, timeRanking, freqRanking, projectName,
      periodMap, data, chartType, alertMissingData, bugId } = this.props;
    const { view, columns, showSummaryFlag, tabStates, isForecast } = this.state;
    let userName = store.get('userName');
    debugData = debugData || [];
    timeRanking = timeRanking || [];
    freqRanking = freqRanking || [];
    this.calculateData();
    let self = this;
    let isFileDetection = (data && data.caller && data.caller == 'fileDetection');
    const summary = this.summary;
    const dataArray = this.causalDataArray;
    const types = this.causalTypes;
    const groups = this.groups;
    const errorMsg = this.errorMsg;
    const metricAvg = this.metricAvg;
    let settingData = (_.keysIn(debugData)).length != 0 || timeRanking.length != 0 || freqRanking != 0;
    let radius = [60, 85];
    let propsData = this.props.data ? this.props.data['instanceMetricJson'] : {};
    let latestDataTimestamp = propsData ? propsData['latestDataTimestamp'] : "";
    let instances = (propsData && propsData['instances']) ? propsData['instances'].split(',').length : 1;
    let basicStatsKeys = ["AvgCPUUtilization", "AvgInstanceUptime", "NumberOfInstances", "NumberOfContainers", "NumberOfMetrics", "BillingEstimate"];
    // incident table
    let incidents = [];
    let dataChunkName = data && data.dataChunkName;
    let metricTags = {};
    if (data && data.anomalyMetrics) {
      let anomalyMetrics = data.anomalyMetrics.split(",");
      _.each(anomalyMetrics, function (am, index) {
        metricTags[am] = " (Anomaly Detected) ";
      });
    }
    if (projectName && (userName != 'admin' && projectName.indexOf('@') == -1)) {
      enablePublish = true;
    }

    if (summary) {
      incidents = _.map(summary.incidentSummary, a => {
        let incidentObj = this._getRootCauseNameFromHints(a.text);
        return {
          id: a.id,
          rootCauseNames: incidentObj.rootCauseNames,
          start: incidentObj.start,
          duration: incidentObj.duration + " minutes",
          startTimestamp: incidentObj.startTimestamp,
          endTimestamp: incidentObj.endTimestamp,
          text: a.text
          //.replace(/\n/g, "<br />")
        }
      });
    }


    return (
      <Console.Wrapper>
        <Console.Content style={{ paddingLeft: 0 }} className={loading ? 'ui form loading' : ''}>
          <div className="ui main tiny container"
            style={{ minHeight: '100%', display: loading && 'none' }}
          >
            <div className="ui vertical segment">
              <Button className="orange labeled icon"
                onClick={() => this.setState({ showTenderModal: true })} style={{ 'display': 'none' }}>
                <i className="icon random" />Causal Graph
                            </Button>
              <Button className="labeled icon" style={{ display: !enablePublish && 'none' }}
                onClick={() => this.setState({ showShareModal: true })}>
                <i className="icon share alternate" />Publish
                            </Button>
              <Button className="labeled icon" style={{ display: !enableComments && 'none' }}
                onClick={() => this.setState({ showComments: true })}>
                <i className="icon comments" />Comments
                            </Button>
              {!bugId && !isForecast && <Button className="labeled icon" onClick={() => onRefresh()}>
                <i className="icon refresh" />Refresh
                            </Button>}
              {!isForecast && <Button className="labeled icon" onClick={() => this.exportData()}>
                <i className="icon download" />Export
                            </Button>}
              {projectName != undefined && <Button className="labeled icon" onClick={() => this.saveDataToStorage()}>
                <i className="icon cloud" />Save To Storage
                            </Button>}
              <Button className="orange labeled icon"
                onClick={() => this.setState({ showDebug: true })} style={{ display: settingData ? '' : 'none' }}>
                <i className="zoom icon" />Faulty Localization Result
                            </Button>
              {!isForecast && <ButtonGroup className="right floated basic icon">
                {!bugId && <Button onClick={() => this.setState({ showSettingModal: true })}>
                  <i className="icon setting" />
                </Button>}
                <Button active={view === 'list'}
                  onClick={() => this.setState({ view: 'list' })}>
                  <i className="align justify icon" />
                </Button>
                <Button active={view === 'grid'}
                  onClick={() => this.setState({ view: 'grid' })}>
                  <i className="grid layout icon" />
                </Button>
              </ButtonGroup>}
            </div>
            <div className="ui vertical segment">
              {false && <div className="ui pointing secondary menu">
                <a className={tabStates['rootcause'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'rootcause')}>Root Cause Result</a>
                <a className={tabStates['heatmap'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'heatmap')}>Heatmap View</a>
                <a className={tabStates['chart'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'chart')}>Chart View</a>
              </div>
              }
              {tabStates['chart'] === 'active' ?
                <div className="ui grid">
                  {(!summary) && (!groups || groups.length == 0) &&
                    <h3>{errorMsg}</h3>
                  }
                  {showSummaryFlag.toLowerCase() == 'yes' && !!summary &&
                    <DataSummaryChart
                      key="summary_chart"
                      summary={summary}
                      latestDataTimestamp={latestDataTimestamp}
                      onDateWindowChange={this.handleDateWindowSync}
                      dateWindow={this.state['chartDateWindow']}
                    />
                  }

                  {!!groups &&
                    <DataGroupCharts
                      chartType={chartType}
                      key={view + '_group_charts'} metricTags={metricTags}
                      groups={groups} view={view} columns={columns}
                      latestDataTimestamp={latestDataTimestamp}
                      alertMissingData={alertMissingData}
                      periodMap={periodMap}
                      metricAvg={metricAvg}
                      onDateWindowChange={this.handleDateWindowSync}
                      dateWindow={this.state['chartDateWindow']}
                    />
                  }
                </div> :
                null
              }
              {tabStates['rootcause'] === 'active' ?
                <div className="ui grid">
                  {(summary && summary.incidentSummary.length > 0) ?
                    <div>
                      <br />
                      <h4>Detected Incidents:</h4>
                      <table className="ui basic table">
                        <thead>
                          <tr>
                            <th>Incident Id</th>
                            <th>Incident Start</th>
                            <th>Incident Duration</th>
                            <th>Root Cause Type</th>
                            <th>Root Cause Scope</th>
                            <th>Root Cause Affected Functions</th>
                            <th>Suggested Actions</th>
                            <th>
                              <Button className="orange labeled"
                                onClick={() => this.setState({ showTenderModal: true })}>
                                Overall Causal Graph
                            </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {incidents.map((incident, index) => (
                            <tr key={index}>
                              <td>{incident.id}</td>
                              <td>{incident.start}</td>
                              <td>{incident.duration}</td>
                              <td><pre>{incident.rootCauseNames}</pre></td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td><pre>{incident.suggestedActions}</pre></td>
                              <td>
                                <Button className="orange"
                                  onClick={() => this.setState({
                                    showTenderModal: true,
                                    startTimestamp: incident.startTimestamp,
                                    endTimestamp: incident.endTimestamp
                                  })}>
                                  Causal Graph
                                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <div>
                      <br />
                      <h4>Detected Incidents:</h4>
                      <h4>Congratulations! No anomaly was detected. Please go to
                                            <a onClick={(e) => this.selectTab(e, 'heatmap')}> Heatmap View </a> or
                                            <a onClick={(e) => this.selectTab(e, 'chart')}> Chart View </a> to view data details.</h4>
                    </div>
                  }
                </div> : null
              }
              {tabStates['heatmap'] === 'active' ?
                <div className="ui grid">
                  <div style={{ 'width': '100%' }}>
                    <div style={{ 'width': '100%', 'display': 'flex', 'marginTop': '40px' }}>
                      {self.props.data ? basicStatsKeys.map(function (value, index) {
                        let name = undefined;
                        let dataValue = self.props.data['instanceMetricJson'] ? self.props.data['instanceMetricJson'][value] : undefined;
                        if (dataValue == undefined) {
                          return null;
                        }
                        if (value == "NumberOfInstances") {
                          name = "Num of Instances";
                        } else if (value == "NumberOfContainers") {
                          name = "Num of Containers";
                        } else if (value == "NumberOfMetrics") {
                          name = "Num of Metrics";
                        } else if (value == "AvgCPUUtilization") {
                          name = "Avg CPU Utilization";
                          dataValue = ((dataValue.toFixed(1)).toString() + "%");
                        } else if (value == "BillingEstimate") {
                          name = "Estimated Daily Cost";
                          dataValue = ("$" + (dataValue.toFixed(1)).toString());
                        } else if (value == "AvgInstanceUptime") {
                          name = "Avg Instance Uptime";
                          dataValue = (((dataValue * 100).toFixed(1)).toString() + "%");
                        }
                        return (
                          <PieChart key={index} radius={radius} colorChart="#3398DB" data={name}
                            dataValue={dataValue.toString()} />
                        )
                      }) : null}
                    </div>
                    <div style={{ 'width': '100%', height: (instances) * 100 + 'px' }}>
                      {this.props.data ? <AnomalySummary data={this.props.data}
                        onClose={() => this.setState({ showAnomalySummary: false })} /> : null}
                    </div>
                  </div>
                </div> :
                null
              }
            </div>
          </div>
          {this.state.showSettingModal &&
            <SettingModal onClose={() => this.setState({ showSettingModal: false })} />
          }
          {this.state.showDebug &&
            <SysCallModal timeRanking={timeRanking} freqRanking={freqRanking} dataArray={debugData} onClose={() => this.setState({ showDebug: false })} />
          }
          {this.state.showTenderModal &&
            <TenderModal dataArray={dataArray} types={types}
              endTimestamp={this.state.endTimestamp}
              startTimestamp={this.state.startTimestamp}
              onClose={() => this.setState({ showTenderModal: false })} />
          }
          {this.state.showShareModal &&
            <ShareModal dataArray={dataArray} types={types} dp={this.dp} dataChunkName={dataChunkName} latestDataTimestamp={latestDataTimestamp} fromUser={userName}
              onClose={() => this.setState({ showShareModal: false })} />
          }
          {this.state.showComments &&
            <CommentsModal dataArray={dataArray} types={types} dp={this.dp}
              onClose={() => this.setState({ showComments: false })} />
          }
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
