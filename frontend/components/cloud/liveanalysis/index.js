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
            tabStates: {
                anomaly: '',
                analysis: 'active'
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
            let periodData = data.periodString ? data.periodString.split(",") : [];
            let periodString = {};
            if (data.periodString) {
                _.compact(
                    periodData.map(function (value, index) {
                        if (index % 2 == 1) {
                            if (Number.parseInt(value) != -1) {
                                periodString[periodData[index - 1].split('[')[0]] = value;
                            }
                        }
                    }));
                this.periodString = periodString;
            } else {
                this.periodString = null;
            }
            this._data = data;
        }
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
        const periodString = this.periodString;
        let settingData = (_.keysIn(debugData)).length != 0 || timeMockup.length != 0 || freqMockup != 0;
        let radius = [60,85];
        let propsData = this.props.data?this.props.data['instanceMetricJson']:{};
        let latestDataTimestamp = this.props.data?this.props.data['instanceMetricJson']['latestDataTimestamp']:"";
        let basicStatsKeys = ["AvgCPUUtilization","AvgInstanceUptime","NumberOfInstances","NumberOfContainers","NumberOfMetrics","BillingEstimate"];

        // incident table
        let incidents = [];
        if(summary){
            incidents =  _.map(summary.incidentSummary, a => {
              return {
                id: a.id,
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
                                    onClick={() => this.setState({ showTenderModal: true })}>
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
                                  <a className={tabStates['analysis'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'analysis')}>Chart View</a>
                                  <a className={tabStates['anomaly'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'anomaly')}>Heatmap View</a>
                            </div>
                            {tabStates['analysis'] === 'active' ?
                                <div className="ui grid">
                                    {!!summary && summary.incidentSummary.length>0 &&
                                      <div>
                                        <table className="ui basic table">
                                          <thead>
                                          <tr>
                                            <th>Incident ID</th>
                                            <th>Incident Description</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {incidents.map((incident, index)=>(
                                            <tr key={index}>
                                              <td>{incident.id}</td>
                                              <td><pre>{incident.text}</pre></td>
                                            </tr>
                                          ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    }
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
                                        period={periodString}
                                        groups={groups} view={view} columns={columns}
                                        onDateWindowChange={this.handleDateWindowSync}
                                        dateWindow={this.state['chartDateWindow']}
                                        />
                                    }

                                </div>:
                                null
                            }
                            {tabStates['anomaly'] === 'active' ?
                                <div className="ui grid">
                                    <div style={{'width': '100%'}}>
                                        <div style={{'width': '100%','display': 'flex','marginTop':'40px'}}>
                                            {self.props.data?basicStatsKeys.map(function (value,index) {
                                                let name = undefined;
                                                let dataValue = self.props.data['instanceMetricJson'][value];
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
                                                    if(self.props.data['instanceMetricJson']['NumberOfContainers']){
                                                        name = "Avg Container Uptime";
                                                    }else{
                                                        name = "Avg Instance Uptime";
                                                    }
                                                    dataValue = (((dataValue * 100).toFixed(1)).toString()+"%");
                                                }
                                                return (
                                                    <PieChart key={index} radius={radius} colorChart="#3398DB" data={name}
                                                                     dataValue={dataValue.toString()}/>
                                                )
                                            }): null}
                                        </div>
                                        <h4 className="ui header" style={{'marginTop': '30px'}}>Anomaly Summary</h4>
                                        <div style={{'width': '100%'}}>
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