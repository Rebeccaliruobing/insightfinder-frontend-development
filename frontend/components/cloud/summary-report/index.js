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
export default class RenderSummaryReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryData: this.props.summaryData || {},
            createDate: this.props.createDate || "",
            userName: store.get('userName')
        };
    }

    componentDidMount() {

    }

    render() {
        let {summaryData, userName, createDate} = this.state;
        let instanceListNumber = {};
        let instanceValue = [];
        let instanceList = _.keyBy(summaryData['metricStats'], function(o){return o['Instance']});
        _.forEach(instanceList, function (value,key) {
            instanceListNumber[key] = (_.partition(summaryData['metricStats'], function(o){return o['Instance'] == key})[0]).length;
        });
        instanceList = [];
        let instanceKeys = Object.keys(instanceListNumber);
        (instanceKeys).map(function (value,index) {
            let num = 0;
            for(let j=0;j<index;j++){
                num+=instanceListNumber[instanceKeys[j]];
            }
            instanceList.push(num);
        });
        _.forEach(instanceListNumber, function (value,key) {
            instanceValue.push(value);
        });
        return (
            <div>
                <div style={{'marginBottom': '16px'}}>
                    <span>Dear customer {userName}</span>
                </div>
                <div>
                    <div><span>Here is the summary report about your projects:</span></div>
                    <div><span>Time: {createDate}</span></div>
                </div>
                <div style={{'marginBottom': '16px'}}>
                    <div><span>GAE Project gae2</span></div>
                    <div>Anomaly number time series: [{(summaryData.anomalyNumList || []).map(function (value, index) {
                        return value + (index == summaryData.anomalyNumList.length - 1 ? "" : ", ")
                    })}]
                    </div>
                </div>
                <div>
                    <div>
                        <span>Basic metric value statistics for {(summaryData['metricStats'] || []).length} metrics</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={summaryData['metricTableColormap']}/>
                    </div>
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
                                {(summaryData['metricStats'] || []).map(function (value,index) {
                                    let showNumber = instanceList.indexOf(index);
                                    console.log(showNumber!=-1);
                                    return(
                                        <tr key={index}>
                                            {showNumber!=-1?
                                            <td rowSpan={instanceValue[showNumber]}>
                                                {value['Instance']}
                                            </td>:
                                                ""
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
                    <div style={{'marginTop': '16px'}}>
                        <div><span>Anomaly summary in the past 24 hours: &nbsp;&nbsp;&nbsp;<img src='/oldstatic/color-map-normal.png' /></span></div>
                        <div>
                            <table className="metric-table">
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
                                {(summaryData['anomalySummary'] || []).map(function (value,index) {
                                    return(
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
                    <div style={{'marginTop': '24px'}}>
                        <div><span>Anomaly details in the past 24 hours:</span></div>
                        <div>
                            <table className="metric-table" style={{'width': '50%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{'width': '10%'}}>
                                            ID
                                        </td>
                                        <td>
                                            Details
                                        </td>
                                    </tr>
                                {(summaryData['anomalyDetails'] || []).map(function (value,index) {
                                    return(
                                        <tr key={index}>
                                            <td>
                                                {value['ID']}
                                            </td>
                                            <td>
                                                {value['Details']}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
            filterBar: {projectName: 'appAWS'},
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
        let self = this;
        apis.postDashboardDailySummaryReportNew().then((resp) => {
            resp.data.loading = false;
            self.setState(resp.data);
        }).catch(()=> {
        });
    }

    handleRefresh() {
        this.handleFilterSubmit(this.state.projectName);
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
                    loading
                </Console.Content>
            )
        }
        let summaryData = this.state[this.state.filterBar.projectName];
        return (
            <Console.Content>
                <div className="ui main tiny container" ref={c => this._el = c}>
                    <div className="ui clearing vertical segment">
                        <ButtonGroup className="left floated">
                            <Button className="labeled icon " onClick={this.handleRefresh.bind(this)}>
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
                        <RenderSummaryReport summaryData={summaryData} createDate={createDate}/>
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