import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {autobind} from 'core-decorators';
import moment from 'moment';
import _ from 'lodash';
import {Console, ButtonGroup, Button, Popup} from '../../../artui/react';
import FilterBar from './filter-bar';
import apis from '../../../apis';
import "./summaryReport.less";
const colorMapLow = require('../../../images/color-map-low.png');

class RenderSummaryReport extends Component {

    static contextTypes = {
        dashboardUservalues: React.PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.summary = null;
        this.metricStats = [];
        this.anomalySummary = [];
        this.instances = {};
        this.anomalyNumList = [];
    }

    calculateData(projectName, summary) {
        if (this.summary != summary && summary) {
            // Append 0 if list is less than 7 items.
            let anomalyNumList = _.slice(summary.anomalyNumList, 0, 30);
            if (anomalyNumList.length > 0 && anomalyNumList.length < 7) {
                for (let i = anomalyNumList.length; i < 7; i++) {
                    anomalyNumList.push(0);
                }
            }
            this.anomalyNumList = _.reverse(anomalyNumList);
            this.metricStats = summary.metricStats || [];
            this.anomalySummary = summary.anomalySummary || [];

            const instances = {};
            _.forEach(summary.metricStats, stat => {
                const name = stat['Instance'];
                if (!instances[name]) {
                    instances[name] = [];
                }
                instances[name].push(stat);
            });
            this.instances = instances;

            // Get the incident for the summary
            let {incidentAllInfo} = this.context.dashboardUservalues;
            let incidentListEntry = (incidentAllInfo || []).find((item)=>item.projectName == projectName);
            let incidentList = (incidentListEntry || {}).incidentList || [];

            _.forEach(this.anomalySummary, (s) => {
                const stime = moment.utc(s['Start Time']);
                let matchInst;
                _.forEach(incidentList, inst => {
                    const instSTime = moment.utc(inst.incidentStartTime);
                    const instETime = moment.utc(inst.incidentEndTime);
                    // FIXME: stime is GMT, stime, etime is java time, GMT will add timezone.
                    if (stime.isBetween(instSTime, instETime)) {
                        matchInst = inst;
                    }
                });

                if (matchInst)  {
                    const params = {
                        projectName,
                        startTime: matchInst.incidentStartTime,
                        endTime: matchInst.incidentEndTime,
                        pvalue: matchInst.pValue,
                        cvalue: matchInst.cValue,
                        modelType: matchInst.modelType,
                        modelStartTime: matchInst.modelStartTime,
                        modelEndTime: matchInst.modelEndTime,
                        isExistentIncident: true,
                    };
                    s.link = `/incidentAnalysis?${$.param(params)}`
                }
            });

            this.summary = summary;
        }
    }

    render() {
        const { projectName, summaryData } = this.props;
        this.calculateData(projectName, summaryData);

        const hasMetrics = this.metricStats.length > 0;
        const hasSummary = this.anomalySummary.length > 0;
        let currentInstance;

        return (
            <div>
                <div style={{ 'marginBottom': '16px' }}>
                    <div>Anomaly number time series: [{this.anomalyNumList.join(',')}]</div>
                    {hasMetrics &&
                    <div>
                        <span style={{marginRight: 20}}>
                            Basic metric value statistics for {this.metricStats.length} metrics
                        </span>
                        <img src={colorMapLow} />
                    </div>
                    }
                    {hasMetrics &&
                    <div>
                        <table className="metric-table">
                            <thead>
                            <tr>
                                <th>Instance</th>
                                <th>Metric</th>
                                <th>Uptime</th>
                                <th>Min</th>
                                <th>Max</th>
                                <th>Avg</th>
                                <th>Std</th>
                                <th>Anomaly Relevance Score</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.metricStats.map((stat, index) => {
                                    const name = stat['Instance'];
                                    const ret = (
                                        <tr key={index}>
                                            {name !== currentInstance &&
                                            <td rowSpan={this.instances[name].length}>{name}</td>
                                            }
                                            <td>{stat['Metric']}</td>
                                            <td>{stat['Uptime']}</td>
                                            <td>{stat['Min']}</td>
                                            <td>{stat['Max']}</td>
                                            <td>{stat['Avg']}</td>
                                            <td>{stat['Stddev']}</td>
                                            <td>{stat['Anomaly Relevance Score']}</td>
                                            <td style={{ 'backgroundColor': stat['Status'] }}/>
                                        </tr>
                                    );
                                    currentInstance = name;
                                    return ret;
                            })}
                            </tbody>
                        </table>
                        <div>
                            <span>
                                Number of anomalies in the past 24 hours: {this.summary.anomalyCount || 0}
                            </span>
                        </div>
                    </div>
                    }
                    {hasSummary &&
                    <div style={{ 'marginTop': '16px' }}>
                        <div>
                            <span style={{marginRight: 20}}>Anomaly summary in the past 24 hours:</span>
                            <img src={colorMapLow}/>
                        </div>
                        <div>
                            <table className="anomaly-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Start Time</th>
                                    <th>Duration (min)</th>
                                    <th>Avg Anomaly Degree</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.anomalySummary.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value['ID']}</td>
                                        <td>
                                            {value.link ?
                                                <a target="_blank" href={value.link}>{value['Start Time']}</a> :
                                                value['Start Time']
                                            }
                                        </td>
                                        <td>{value['Duration (min)']}</td>
                                        <td>{value['Avg Anomaly Degree']}</td>
                                        <td style={{ 'backgroundColor': value['Status'] }}/>
                                    </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default class SummaryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPanel: true,
            filterBar: { projectName: '' },
            loading: true,
        };
    }

    componentDidMount() {
        this.handleGetSummaryData(false);
    }

    handleRefresh() {
        $('#loadingRefresh').addClass('loading');
        this.handleGetSummaryData(true);
    }

    handleGetSummaryData(forceReload) {
        let self = this;
        apis.postDashboardDailySummaryReportNew(forceReload).then((resp) => {
            $('#loadingRefresh').removeClass('loading');
            resp.data.loading = false;
            self.setState(resp.data);
        }).catch(()=> {
        });
    }

    @autobind
    handleToggleFilterPanel() {
        this.setState({ showAddPanel: !this.state.showAddPanel }, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    @autobind
    handleFilterChange(data) {
        this.setState({ filterBar: data });
    }

    @autobind
    handleFilterSubmit(data) {
        this.setState({ filterBar: data });
    }

    render() {
        const { loading, showAddPanel, createDate } = this.state;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        if (loading) {
            return (
                <Console.Content>
                    <div className="ui form loading" style={{ 'marginTop': '36px' }}>
                    </div>
                </Console.Content>
            )
        }
        let summaryData = this.state[this.state.filterBar.projectName];
        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                        <ButtonGroup className="left floated">
                            <Button id="loadingRefresh" className="labeled icon"
                                    onClick={this.handleRefresh.bind(this)}>
                                <i className="icon refresh"/>Refresh
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="right floated basic icon">
                            <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                                <Popup position="bottom right">
                                    <i className={panelIconStyle}/>
                                    <span className="ui mini popup">Expand & Close</span>
                                </Popup>
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="ui vertical segment filterPanel"
                         ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
                        <i className="close link icon" style={{ float: 'right', marginTop: '-10px' }}
                           onClick={this.handleToggleFilterPanel}/>
                        <FilterBar {...this.props} onSubmit={this.handleFilterSubmit}
                                   onChange={this.handleFilterChange}/>
                    </div>

                    <div key={Date.now()} className="ui vertical segment">
                        {summaryData ?
                            <RenderSummaryReport summaryData={summaryData}
                                                 projectName={this.state.filterBar.projectName}
                                                 createDate={createDate}/> :
                            <div>Report unavailable</div>
                        }
                    </div>
                </div>
            </Console.Content>
        );

    }
}
