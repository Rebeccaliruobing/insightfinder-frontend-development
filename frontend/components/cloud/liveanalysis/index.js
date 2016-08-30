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
            view: (store.get(DefaultView, 'grid')).toLowerCase(),
            columns: (store.get(GridColumns, 'two')).toLowerCase(),
            selectedGroupId: undefined,
            selectedAnnotation: null,
            showSettingModal: false,
            showTenderModal: false,
            showAnomalySummary: false,
            showShareModal: false,
            showComments: false,
            showDebug: false
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

    render() {

        let { loading, onRefresh, enablePublish, enableComments, debugData, timeMockup, freqMockup} = this.props;
        const { view, columns } = this.state;
        debugData = debugData || [];
        timeMockup = timeMockup || [];
        freqMockup = freqMockup || [];
        this.calculateData();

        const summary = this.summary;
        const dataArray = this.causalDataArray;
        const types = this.causalTypes;
        const groups = this.groups;
        const periodString = this.periodString;
        let settingData = (_.keysIn(debugData)).length != 0 || timeMockup.length != 0 || freqMockup != 0;
        return (
            <Console.Wrapper>
                <Console.Content style={{ paddingLeft: 0 }} className={ loading ? 'ui form loading' : ''}>
                    <div className="ui main tiny container"
                         style={{ minHeight: '100%', display: loading && 'none' }}
                        >
                        <div className="ui vertical segment">
                            <Button className="orange labeled icon"
                                    onClick={() => this.setState({ showAnomalySummary: true })}>
                                <i className="icon refresh"/>Anomaly Summary
                            </Button>
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
                            <div className="ui grid">
                                <h4 className="ui header" style={{'marginTop': '30px'}}>Anomaly Summary</h4>
                                { this.state.showAnomalySummary &&
                                    <div style={{'width': '100%','height': '300px'}}>
                                        <AnomalySummary data={this.props.data} onClose={() => this.setState({ showAnomalySummary: false })}/>
                                    </div>
                                }
                                {!!summary &&
                                <DataSummaryChart
                                    key="summary_chart"
                                    summary={summary}
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

                            </div>
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