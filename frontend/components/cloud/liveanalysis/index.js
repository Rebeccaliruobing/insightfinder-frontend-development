import React from 'react';
import store from 'store';
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import {autobind} from 'core-decorators';

import {Console, ButtonGroup, Button} from '../../../artui/react';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import AnomalySummary from './anomalySummary';
import TenderModal from './tenderModal';
import SettingDebug from './debug';
import ShareModal from './shareModal';
import CommentsModal from './commentsModal';
import { PieChart } from '../insight-report';

import {GridColumns, DefaultView} from '../../storeKeys';
import {DataSummaryChart, DataGroupCharts} from '../../share/charts';


class LiveAnalysisCharts extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    static propTypes = {
        data: React.PropTypes.object,
        loading: React.PropTypes.bool,
        enablePublish: React.PropTypes.bool,
        onRefresh: React.PropTypes.func
    };

    static defaultProps = {
        loading: true,
        enablePublish: false,
        onRefresh: () => {
        }
    };

    constructor(props) {

        super(props);

        this.dp = null;

        this.state = {
            instanceName: false,
            view: (store.get(DefaultView, 'list')).toLowerCase(),
            columns: (store.get(GridColumns, 'two')).toLowerCase(),
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
            tabStates: {
                rootcause: 'active',
                prediction: '',
                chart: '',
                heatmap: ''
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    calculateData() {

        // Cache the data, and recalculate it if changed.
        let { data, loading, onRefresh, ...rest } = this.props;
        if (this._data !== data && !!data) {
            this.dp = new DataParser(data, rest);
            this.dp.getSummaryData();

            // FIXME: getGroupsData vs getGroupsDataTest?
            this.dp.getGroupsDataTest();

            // Sort the grouped data
            this.summary = this.dp.summaryData;
            this.causalDataArray = this.dp.causalDataArray;
            this.causalTypes = this.dp.causalTypes;
            this.groups = this.dp.groupsData || [];
            this.groupMetrics = this.dp.groupmetrics || null;
            this._data = data;
        }
    }

    _getRootCauseNameFromHints(incidentText){
      // parse rootcause text and extract simplified rootcause names
      const rootCauseNameMap = {
        "cpu": "High CPU usage", 
        "mem": "High memory usage", 
        "disk": "High disk usage", 
        "network": "Network Traffic surge", 
        "load": "High load", 
        "request": "High request count", 
        "latency": "High latency", 
      };

      let rootcauseNames = new Set();
      let durationLine = incidentText.split("\n",3)[0];
      let duration = durationLine.substring(9,durationLine.indexOf("minutes")-1);
      let startLine = incidentText.split("\n",3)[1];
      let start = startLine.substring(12,startLine.indexOf(","));
      let hintStr = incidentText.split("\n",3)[2];
      let hints = hintStr.split("\n");
      let retObj = {};
      _.each(hints,function(h,ih){
        let parts = h.split(",");
        if(parts[0].indexOf("missing")!=-1){
          rootcauseNames.add("Missing metric data");
        } else {
          // iterate through map
          for (var key in rootCauseNameMap) {
            if(parts[2].toLowerCase().indexOf(key)!=-1){
              rootcauseNames.add(rootCauseNameMap[key]);
              break;
            }
          }
        }
      });
      retObj["rootcauseName"] = Array.from(rootcauseNames).join("\n");
      retObj["start"] = start;
      retObj["duration"] = duration;
      retObj["startTimestamp"] = 0+moment(start);
      retObj["endTimestamp"] = 0+moment(start)+parseInt(duration)*60000;

      return retObj;
    }

    @autobind
    handleDateWindowSync(dateWindow) {
        this.setState({chartDateWindow: dateWindow});
    }

    selectTab(e, tab) {
        var tabStates = this.state['tabStates'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({tabStates: tabStates});
    }

    render() {

        let { loading, onRefresh, enablePublish, enableComments, debugData, timeMockup, freqMockup} = this.props;
        const { view, columns,tabStates } = this.state;
        debugData = debugData || [];
        timeMockup = timeMockup || [];
        freqMockup = freqMockup || [];
        this.calculateData();
        let self = this;

        const summary = this.summary;
        const dataArray = this.causalDataArray;
        const types = this.causalTypes;
        const groups = this.groups;
        let settingData = (_.keysIn(debugData)).length != 0 || timeMockup.length != 0 || freqMockup != 0;
        let radius = [60,85];
        let propsData = this.props.data?this.props.data['instanceMetricJson']:{};
        //propsData['instances'] = "[i-eb45e5da, i-55d26464, i-df1ae3c7,i-eb45e5da, i-55d26464, i-df1ae3c7,i-eb45e5da, i-55d26464, i-df1ae3c7,i-eb45e5da, i-55d26464, i-df1ae3c7, i-55d26464, i-df1ae3c7,i-eb45e5da, i-55d26464, i-df1ae3c7]";
        let latestDataTimestamp = propsData?propsData['latestDataTimestamp']:"";
        let instances = (propsData&&propsData['instances'])?propsData['instances'].split(',').length: 1;
        let basicStatsKeys = ["AvgCPUUtilization","AvgInstanceUptime","NumberOfInstances","NumberOfContainers","NumberOfMetrics","BillingEstimate"];
        // incident table
        let incidents = [];
        if(summary){
            incidents =  _.map(summary.incidentSummary, a => {
              let incidentObj = this._getRootCauseNameFromHints(a.text);
              return {
                id: a.id,
                rootcauseName: incidentObj.rootcauseName,
                start:incidentObj.start,
                duration:incidentObj.duration+" minutes",
                startTimestamp:incidentObj.startTimestamp,
                endTimestamp:incidentObj.endTimestamp,
                text: a.text
                //.replace(/\n/g, "<br />")
              }
            });
        }


        return (
            <Console.Wrapper>
                <Console.Content style={{ paddingLeft: 0 }} className={ loading ? 'ui form loading' : ''}>
                    <div className="ui main tiny container"
                         style={{ minHeight: '100%', display: loading && 'none' }}
                        >
                        <div className="ui vertical segment">
                            <Button className="orange labeled icon"
                                    onClick={() => this.setState({ showTenderModal: true })} style={{'display': 'none'}}>
                                <i className="icon random"/>Causal Graph
                            </Button>
                            <Button className="orange labeled icon"
                                    onClick={() => this.setState({ showDebug: true })} style={{display: settingData?'':'none'}}>
                                <i className="icon random"/>Syscall Results
                            </Button>
                            <Button className="labeled icon" style={{ display: !enablePublish && 'none' }}
                                    onClick={()=> this.setState({ showShareModal: true })}>
                                <i className="icon share alternate"/>Publish
                            </Button>
                            <Button className="labeled icon" style={{ display: !enableComments && 'none' }}
                                    onClick={() => this.setState({ showComments: true })}>
                                <i className="icon comments"/>Comments
                            </Button>
                            <Button className="labeled icon" onClick={() => onRefresh()}>
                                <i className="icon refresh"/>Refresh
                            </Button>
                            <ButtonGroup className="right floated basic icon">
                                <Button onClick={()=> this.setState({ showSettingModal: true })}>
                                    <i className="icon setting"/>
                                </Button>
                                <Button active={view === 'list'}
                                        onClick={()=>this.setState({ view: 'list' })}>
                                    <i className="align justify icon"/>
                                </Button>
                                <Button active={view === 'grid'}
                                        onClick={()=>this.setState({ view: 'grid' })}>
                                    <i className="grid layout icon"/>
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="ui vertical segment">
                                <div className="ui pointing secondary menu">
                                  <a className={tabStates['rootcause'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'rootcause')}>Root Cause Result</a>
                                  <a className={tabStates['prediction'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'prediction')}>Predicted Incident</a>
                                  <a className={tabStates['heatmap'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'heatmap')}>Heatmap View</a>
                                  <a className={tabStates['chart'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'chart')}>Chart View</a>
                                </div>
                            {tabStates['chart'] === 'active' ?
                                <div className="ui grid">
                                    {!!summary &&
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
                                        key={view + '_group_charts'}
                                        groups={groups} view={view} columns={columns}
                                        onDateWindowChange={this.handleDateWindowSync}
                                        dateWindow={this.state['chartDateWindow']}
                                        />
                                    }
                                </div>:
                                null
                            }
                            {tabStates['rootcause'] === 'active' ?
                                <div className="ui grid">
                                    {(summary && summary.incidentSummary.length>0) ?
                                      <div>
                                        <br />
                                        <h4>Detected Incidents:</h4>
                                        <table className="ui basic table">
                                          <thead>
                                          <tr>
                                            <th>Incident Id</th>
                                            <th>Root Cause Name</th>
                                            <th>Incident Start</th>
                                            <th>Incident Duration</th>
                                            <th>Incident Description</th>
                                            <th></th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {incidents.map((incident, index)=>(
                                            <tr key={index}>
                                              <td>{incident.id}</td>
                                              <td>{incident.rootcauseName}</td>
                                              <td>{incident.start}</td>
                                              <td>{incident.duration}</td>
                                              <td><pre>{incident.text}</pre></td>
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
                                </div>:null
                            }
                            {tabStates['prediction'] === 'active' ?
                                <div className="ui grid">
                                    <br />
                                    <h4>Predicted Incidents:</h4>
                                    <h5>None</h5>
                                </div>:null
                            }
                            {tabStates['heatmap'] === 'active' ?
                                <div className="ui grid">
                                    <div style={{'width': '100%'}}>
                                        <div style={{'width': '100%','display': 'flex','marginTop':'40px'}}>
                                            {self.props.data?basicStatsKeys.map(function (value,index) {
                                                let name = undefined;
                                                let dataValue = self.props.data['instanceMetricJson']?self.props.data['instanceMetricJson'][value]: undefined;
                                                if(dataValue == undefined){
                                                    return null;
                                                    }
                                                if(value == "NumberOfInstances"){
                                                    name = "Num of Instances";
                                                } else if (value == "NumberOfContainers") {
                                                    name = "Num of Containers";
                                                } else if (value == "NumberOfMetrics") {
                                                    name = "Num of Metrics";
                                                } else if (value == "AvgCPUUtilization") {
                                                    name = "Avg CPU Utilization";
                                                    dataValue = ((dataValue.toFixed(1)).toString()+"%");
                                                } else if (value == "BillingEstimate") {
                                                    name = "Estimated Daily Cost";
                                                    dataValue = ("$"+(dataValue.toFixed(1)).toString());
                                                } else if (value == "AvgInstanceUptime") {
                                                    name = "Avg Instance Uptime";
                                                    dataValue = (((dataValue * 100).toFixed(1)).toString()+"%");
                                                }
                                                return (
                                                    <PieChart key={index} radius={radius} colorChart="#3398DB" data={name}
                                                                     dataValue={dataValue.toString()}/>
                                                )
                                            }): null}
                                        </div>
                                        <div style={{'width': '100%',height: (instances)*100+'px'}}>
                                            {this.props.data ? <AnomalySummary data={this.props.data}
                                                                               onClose={() => this.setState({ showAnomalySummary: false })}/> : null}
                                        </div>
                                    </div>
                                </div>:
                                null
                            }
                        </div>
                    </div>
                    { this.state.showSettingModal &&
                    <SettingModal onClose={() => this.setState({ showSettingModal: false })}/>
                    }
                    { this.state.showDebug &&
                    <SettingDebug timeMockup={timeMockup} freqMockup={freqMockup} dataArray={debugData} onClose={() => this.setState({ showDebug: false })}/>
                    }
                    { this.state.showTenderModal &&
                    <TenderModal dataArray={dataArray} types={types}
                                 endTimestamp={this.state.endTimestamp}
                                 startTimestamp={this.state.startTimestamp}
                                 onClose={() => this.setState({ showTenderModal: false })}/>
                    }
                    { this.state.showShareModal &&
                    <ShareModal dataArray={dataArray} types={types} dp={this.dp}
                                onClose={() => this.setState({ showShareModal: false })}/>
                    }
                    { this.state.showComments &&
                    <CommentsModal dataArray={dataArray} types={types} dp={this.dp}
                                   onClose={() => this.setState({ showComments: false })}/>
                    }
                </Console.Content>
            </Console.Wrapper>
        )
    }
}

export default LiveAnalysisCharts;