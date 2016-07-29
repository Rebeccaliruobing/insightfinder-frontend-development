import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import _ from 'lodash';
import store from 'store';
import {Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message} from '../../../artui/react';
import FilterBar from './filter-bar';
import apis from '../../../apis';
import "./summaryReport.less";
import ReactD3 from 'react-d3-components';
var BarChart = ReactD3.BarChart;

export default class RenderSummaryReport extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let anomalyNumList = _.slice(this.props.summaryData.anomalyNumList,0,30);
        if(anomalyNumList.length>0&&anomalyNumList.length<7){
            for (let i=anomalyNumList.length;i<7;i++){
                anomalyNumList.push(0);
            }
        }
        this.state = {
            summaryData: this.props.summaryData || {},
            createDate: this.props.createDate || "",
            userName: store.get('userName'),
            anomalyNumList: anomalyNumList,
            barChartList: anomalyNumList.map(function (value,index) {
                today = new Date(moment(today).subtract(1, 'days'));
                let month = today.getMonth()+1;
                let day = today.getDate();
                return  {x: month+"/"+day, y: value}
            })
        };
    }

    componentDidMount() {
    }

    rand(min, max, num) {
        var rtn = [];
        while (rtn.length < num) {
            rtn.push((Math.random() * (max - min)) + min);
        }
        return rtn;
    }

    render() {
        let {summaryData, userName, createDate,barChartList,anomalyNumList} = this.state;
        let hasSummary;
        if(summaryData['anomalyDetails'].length){
            hasSummary = true;
        }
        let hasMetrics;
        if(summaryData['metricStats'].length){
            hasMetrics = true;
        }
        let instanceListNumber = {};
        let instanceValue = [];
        let instanceList = _.keyBy(summaryData['metricStats'], function (o) {
            return o['Instance']
        });
        _.forEach(instanceList, function (value, key) {
            instanceListNumber[key] = (_.partition(summaryData['metricStats'], function (o) {
                return o['Instance'] == key
            })[0]).length;
        });
        instanceList = [];
        let instanceKeys = Object.keys(instanceListNumber);
        (instanceKeys).map(function (value, index) {
            let num = 0;
            for (let j = 0; j < index; j++) {
                num += instanceListNumber[instanceKeys[j]];
            }
            instanceList.push(num);
        });
        _.forEach(instanceListNumber, function (value, key) {
            instanceValue.push(value);
        });

        var data = [{
            label: 'Anomaly number time series',
            values: _.reverse(barChartList)
        }];
        anomalyNumList = _.reverse(anomalyNumList);
        return (
            <div>
                <div style={{'marginBottom': '16px'}}>
                    <div>Anomaly number time series: [{(anomalyNumList || []).map(function (value, index) {
                        return value + (index == anomalyNumList.length - 1 ? "" : ", ")
                    })}]
                    </div>
                    {hasMetrics && 
                    <div>
                        <span>Basic metric value statistics for {(summaryData['metricStats'] || []).length}
                             metrics</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={summaryData['metricTableColormap']}/>
                    </div>
                    }
                    {hasMetrics && 
                    <div>
                        <table className="metric-table">
                            <tbody>
                            <tr>
                                <td>
                                    Instance
                                </td>
                                <td>
                                    Metric
                                </td>
                                <td>
                                    Uptime
                                </td>
                                <td>
                                    Min
                                </td>
                                <td>
                                    Max
                                </td>
                                <td>
                                    Avg
                                </td>
                                <td>
                                    Std
                                </td>
                                <td>
                                    Anomaly Relevance Score
                                </td>
                                <td>
                                    Status
                                </td>
                            </tr>
                            {(summaryData['metricStats'] || []).map(function (value, index) {
                                let showNumber = instanceList.indexOf(index);
                                return (
                                    <tr key={index}>
                                        {showNumber != -1 ?
                                            <td rowSpan={instanceValue[showNumber]}>
                                                {value['Instance']}
                                            </td> :
                                            null
                                        }

                                        <td>
                                            {value['Metric']}
                                        </td>
                                        <td>
                                            {value['Uptime']}
                                        </td>
                                        <td>
                                            {value['Min']}
                                        </td>
                                        <td>
                                            {value['Max']}
                                        </td>
                                        <td>
                                            {value['Avg']}
                                        </td>
                                        <td>
                                            {value['Stddev']}
                                        </td>
                                        <td>
                                            {value['Anomaly Relevance Score']}
                                        </td>
                                        <td style={{'backgroundColor': value['Status']}}>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div>
                            <span>Number of anomalies in the past 24 hours: {summaryData['anomalyCount'] || 0}</span>
                        </div>
                    </div>
                    }
                    {hasSummary &&
                    <div style={{'marginTop': '16px'}}>
                        <div><span>Anomaly summary in the past 24 hours: &nbsp;&nbsp;&nbsp;<img
                            src='/oldstatic/color-map-normal.png'/></span></div>
                        <div>
                            <table className="anomaly-table">
                                <tbody>
                                <tr>
                                    <td>
                                        ID
                                    </td>
                                    <td>
                                        Start Time
                                    </td>
                                    <td>
                                        Duration (min)
                                    </td>
                                    <td>
                                        Avg Anomaly Degree
                                    </td>
                                    <td>
                                        Status
                                    </td>
                                </tr>
                                {(summaryData['anomalySummary'] || []).map(function (value, index) {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {value['ID']}
                                            </td>
                                            <td>
                                                {value['Start Time']}
                                            </td>
                                            <td>
                                                {value['Duration (min)']}
                                            </td>
                                            <td>
                                                {value['Avg Anomaly Degree']}
                                            </td>
                                            <td style={{'backgroundColor': value['Status']}}>
                                            </td>
                                        </tr>
                                    )
                                })}
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
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        let weeks = 1;
        this.state = {
            view: 'chart',
            dateIndex: 0,
            timeIndex: 0,
            summaryReport: '',
            showAddPanel: true,
            filterBar: {projectName: ''},
            loading: true,
            params: {
                projects: [],
                weeks: weeks,
                endTime: moment(new Date()).toDate(),
                startTime: moment(new Date()).add(-7 * weeks, 'days')
            }
        };
    }

    componentDidMount() {
        this.handleGetSummaryData(false);
    }

    handleRefresh() {
        $('#loadingRefresh').addClass('loading');
        this.handleGetSummaryData(true);
    }
    handleGetSummaryData(forceReload){
        let self = this;
        apis.postDashboardDailySummaryReportNew(forceReload).then((resp) => {
            $('#loadingRefresh').removeClass('loading');
            resp.data.loading = false;
            self.setState(resp.data);
        }).catch(()=> {
        });
    }
    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    handleFilterChange(data) {
        //this.$filterPanel.slideUp();
        //apis.postDashboardDailySummaryReport(false).then((resp) => {
        //  this.setState({summaryReport: resp.data.content, projectName: data.projectName})
        //}).catch(()=> {
        //
        //});
        this.setState({filterBar: data});
    }

    handleFilterSubmit(data) {
        this.setState({filterBar: data});
        //apis.postDashboardDailySummaryReport(true).then((resp) => {
        //  this.setState({summaryReport: resp.data.content, projectName: data.projectName})
        //}).catch(()=> {
        //
        //});
    }

    render() {
        const {loading,view, showAddPanel, params,createDate} = this.state;
        const {userInstructions} = this.context;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        var summaryReport = this.state.summaryReport;
        summaryReport = summaryReport.split("<\/th>").join("").split("<\/td>").join("");
        if (loading) {
            return (
                <Console.Content>
                    <div className="ui form loading" style={{'marginTop': '36px'}}>
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
                            <Button id="loadingRefresh" className="labeled icon" onClick={this.handleRefresh.bind(this)}>
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
                            <Button>
                                <i className="setting icon"/>
                            </Button>
                        </ButtonGroup>
                    </div>

                    <div className="ui vertical segment filterPanel"
                         ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
                        <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
                           onClick={this.handleToggleFilterPanel.bind(this)}/>
                        <FilterBar {...this.props} onSubmit={this.handleFilterSubmit.bind(this)}
                                                   onChange={this.handleFilterChange.bind(this)}/>
                        {userInstructions.clouddailysummary &&
                        <Message dangerouslySetInnerHTML={{__html: summaryReport}}/>
                        }
                    </div>

                    <div key={Date.now()} className="ui vertical segment">
                        {summaryData?<RenderSummaryReport summaryData={summaryData} createDate={createDate}/>:
                            <div>Report unavailable</div>
                        }
                    </div>
                </div>
            </Console.Content>
        );

    }

    summaryRef(r) {
        // TODO: 接口返回有误,修正后改回
        // true line
        let productName = this.state.projectName && this.state.projectName.replace('@', '---');
        $(ReactDOM.findDOMNode(r)).find(`#dailysummary_${productName}`).show();

        // temp line
        // $(ReactDOM.findDOMNode(r)).find("[id^=dailysummary_]").show();
    }
}