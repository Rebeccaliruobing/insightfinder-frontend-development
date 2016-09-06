import React from "react";
import {
    BaseComponent, Console, ButtonGroup, Button, Popup, Modal,
    Dropdown, Accordion, Message
} from '../../../artui/react';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import apis from '../../../apis';
import FilterBar from './filter-bar';
import './insightReport.less';
import moment from 'moment';

class PieTickChart extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        name: React.PropTypes.string,
        data: React.PropTypes.string
    };
    static defaultProps = {
        title: "Title",
        name: "Name",
        data: ""
    };

    getOption() {
        let {title,name,data} = this.props;
        let seriesData = JSON.parse(data);
        var optionData = {
            // FIXME: add 11 colors here
            //color:['#990033', '#CC0000','#C15000', '#FF3C3C', '#C13100','#CC6600','#FF9900','#FF6600','#C74C00','#FFCC00','#E68000'],
            color:['#CC0000', '#CC3300','#CC6600','#CC9900', '#CCAA00', '#990000','#993300','#996600','#999900','#AA6600','#AA9900'],
            title: {
                text: title,
                x: 'center'
            },
            calculable: true,
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: '73%',
                    center: ['50%', '60%'],
                    data: _.keysIn(seriesData).map(function (value, index) {
                        return {value: seriesData[value], name: value}
                    })
                }
            ]
        };
        return optionData;
    }

    render() {
        let {title, data} = this.props;
        let seriesData = JSON.parse(data);
        if ((_.keysIn(seriesData)).length == 0) {
            return (
                <div>
                <div className="circle-charts-header">{title}</div>
                <div style={{'height': '300px',width: '40%'}}>
                    <div className="circle-charts">
                        <div className="circle-absolute">
                            No Anomaly
                        </div>
                    </div>
                </div>
                </div>
            )
        }
        else {
            return (
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '350px', width: '50%'}}
                    className='echarts-for-echarts'
                    theme='my_theme'/>

            )
        }
    }
}
class BarChart extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        pieChartStyle: React.PropTypes.object,
        data: React.PropTypes.object,
        useData: React.PropTypes.bool,
        colorChart: React.PropTypes.string
    };
    static defaultProps = {
        title: 'Title',
        pieChartStyle: {},
        data: {},
        useData: false,
        colorChart: '#3398DB'
    };
    setDate(data){
        let theDate = new Date(data);
        let m = theDate.getMonth()+1;
        let d = theDate.getDate();
        m = m>9?m:'0'+m;
        d = d>9?d:'0'+d;
        return m+'/'+ d;
    }
    setDateAdd(data){
        let theDate = new Date(data);
        let m = theDate.getMonth()+1;
        let d = theDate.getDate();
        let y = theDate.getFullYear();
        m = m>9?m:'0'+m;
        d = d>9?d:'0'+d;
        return y+ m + d;
    }
    getOption() {
        let {title,data,useData,colorChart, option} = this.props;
        let momentDateListSort = undefined;
        let momentDateList = undefined;
        let self = this;
        if(useData){
            momentDateList = _.keysIn(data).map(function (value,index) {
                return moment(value, "YYYYMMDD").format();
            });
            momentDateListSort = momentDateList.sort(function (v1,v2) {
                return (new Date(v1)).getTime() - (new Date(v2)).getTime()
            });
        }
        let optionData = {
            title: {
                text: title,
                x: 'center'
                //y: 'bottom'    title到底部
            },
            color: [colorChart],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',    // 15% title是到底部
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: useData ? momentDateListSort.map(function (value,index) {
                        return self.setDate(value)
                    }) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: 'none'   // 不显示y轴的线
                }
            ],
            series: [
                {
                    //name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: useData ? momentDateListSort.map(function (value, index) {
                        return data[self.setDateAdd(value)]
                    }) :
                        [
                            data['Sunday'] || 0,
                            data['Monday'] || 0,
                            data['Tuesday'] || 0,
                            data['Wednesday'] || 0,
                            data['Thursday'] || 0,
                            data['Friday'] || 0,
                            data['Saturday'] || 0
                        ]
                }
            ]
        };
        return _.merge(optionData, option);
    }

    render() {
        let {pieChartStyle} = this.props;
        return (
            <ReactEcharts
                option={this.getOption()}
                style={pieChartStyle}
                className='echarts-for-echarts'
                theme='my_theme'/>
        )
    }
}
class PieChart extends React.Component {
    static propTypes = {
        data: React.PropTypes.string,
        colorChart: React.PropTypes.string,
        pieChartStyle: React.PropTypes.object,
        pieChartCanvasStyle: React.PropTypes.object,
        titleStyle: React.PropTypes.object,
        dataValue: React.PropTypes.string
    };
    static defaultProps = {
        dataValue: '',
        pieChartStyle: {},
        pieChartCanvasStyle: {height: '200px', width: '100%'},
        titleStyle: {'width': '25%','margin': '0 auto'},
        colorChart: '',
        data: "",
        radius: [60, 85],
        optionCenterStyle: ['50%', '50%']
    };

    getOption() {
        let {data,dataValue,colorChart,radius,optionCenterStyle} = this.props;
        let fontSize = (dataValue.length > 2 ? 70 - dataValue.length * 6 : 70) + '';
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return params.value
                    },
                    textStyle: {
                        baseline: 'top',
                        fontSize: fontSize
                    }
                }
            }
        };
        var labelStyle = {
            normal: {
                color: colorChart,
                label: {
                    show: true,
                    position: 'center'
                },
                labelLine: {
                    show: false
                }
            }
        };
        var option = {
            animation: false,
            series: [
                {
                    type: 'pie',
                    center: optionCenterStyle,
                    radius: radius,
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: data, value: dataValue, itemStyle: labelStyle}
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div style={this.props.titleStyle}>
                <div style={{'textAlign': 'center'}}>
                    <span style={{'color':this.props.colorChart,'fontSize': '20px','fontWeight': 'bold'}}>{this.props.data}</span>
                </div>
                <ReactEcharts
                    option={this.getOption()}
                    style={this.props.pieChartCanvasStyle}
                    className='echarts-for-echarts'
                    theme='my_theme'/>
            </div>
        )
    }
}
class InsightReport extends BaseComponent {
    static contextTypes = {
        userInstructions: React.PropTypes.object,
        dashboardUservalues: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            showAddPanel: true,
            loadingIndex: true,
            projectName: undefined,
            detailData: {},
            tabStates: {
                date: 'active',
                dow: ''
            },
            tabStatesBasic: {
                latest: 'active',
                history: ''
            }
        };
    }

    selectTab(e, tab) {
        var tabStates = this.state['tabStates'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({tabStates: tabStates});
    }

    selectTabBasic(e, tab) {
        var tabStates = this.state['tabStatesBasic'];
        tabStates = _.mapValues(tabStates, function (val) {
            return '';
        });
        tabStates[tab] = 'active';
        this.setState({tabStatesBasic: tabStates});
    }

    handleToggleFilterPanel() {
        this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
            this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
        })
    }

    componentDidMount() {
        let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
        let projectName = projects[0] ? projects[0]['projectName'] : undefined;
        this.getData(projectName);
    }

    getData(projectName = undefined) {
        apis.postInsightReport(false).then((resp)=> {
            this.setState({projectName: projectName, loadingIndex: false, detailData: resp.data});
        });
    }

    handleData(data) {
        this.setState({data: data}, ()=> {
            // console.log(data);
        })
    }

    handleFilterChange(data) {
        this.setState({loading: true}, () => {
            this.setState({loading: false,projectName: data['projectName']});
        });
    }
    handleRefresh() {
        $('#loadingRefresh').addClass('loading');
        this.handleGetSummaryData(true);
    }
    handleGetSummaryData(forceReload){
        let self = this;
        apis.postInsightReport(forceReload).then((resp) => {
            $('#loadingRefresh').removeClass('loading');
            self.setState({loading: false,detailData: resp.data});
        }).catch(()=> {
        });
    }
    render() {
        let pieChartTop = {'height': '250px', 'width': '20%', 'margin': '0 auto'};
        let pieChartLeft = {'marginLeft': '10px', 'height': '250px', 'width': '32%', 'float': 'left'};
        let pieChartRight = {'marginLeft': '10px', 'height': '250px', 'width': '32%', 'float': 'left'};
        const {showAddPanel,projectName,detailData,loadingIndex,tabStates,tabStatesBasic} = this.state;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        let chartsData = detailData[projectName];
        let basicStatsKeys = ["AvgCPUUtilization","AvgInstanceUptime","NumberOfInstances","NumberOfContainers","NumberOfMetrics","BillingEstimate"];
        return (
            <Console.Content className={loadingIndex?"ui form loading":""}>
                {loadingIndex ? null :
                    <div className="ui main tiny container loading" ref={c => this._el = c}>
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
                            <FilterBar loading={this.state.loading} {...this.props}
                                       onSubmit={this.handleFilterChange.bind(this)}/>
                        </div>
                        {chartsData?
                        <div>
                            <div className="insight-basic-stats">
                                    <div className="ui pointing secondary menu">
                                      <a className={tabStatesBasic['latest'] + ' item'}
                                         onClick={(e) => this.selectTabBasic(e, 'latest')}>Latest</a>
                                      <a className={tabStatesBasic['history'] + ' item'}
                                         onClick={(e) => this.selectTabBasic(e, 'history')}>History</a>
                                    </div>
                                    <div className={tabStatesBasic['latest'] + ' ui tab '}>
                                      {tabStatesBasic['latest'] === 'active' ?
                                      <div className="insight-basic-charts">
                                        {basicStatsKeys.map(function (value, index) {
                                            let name = "";
                                            let dataItem = chartsData['basicProjectStats'][value];
                                            if(dataItem==undefined){
                                                return null;
                                            } else {
                                                let dataValue = dataItem.toString();
                                                if(value == "NumberOfInstances"){
                                                    name = "Num of Instances";
                                                } else if (value == "NumberOfContainers") {
                                                    name = "Num of Containers";
                                                } else if (value == "NumberOfMetrics") {
                                                    name = "Num of Metrics";
                                                } else if (value == "AvgCPUUtilization") {
                                                    name = "Avg CPU Utilization";
                                                    dataValue = ((dataItem.toFixed(1)).toString()+"%");
                                                } else if (value == "BillingEstimate") {
                                                    name = "Estimated Daily Cost";
                                                    dataValue = ("$"+(dataItem.toFixed(1)).toString());
                                                } else if (value == "AvgInstanceUptime") {
                                                    if(chartsData['basicProjectStats']['NumberOfContainers']){
                                                        name = "Avg Container Uptime";
                                                    }else{
                                                        name = "Avg Instance Uptime";
                                                    }
                                                    dataValue = (((dataItem * 100).toFixed(1)).toString()+"%");
                                                }
                                                let radius = [60,85];
                                                return <PieChart key={index} radius={radius} colorChart="#3398DB" data={name}
                                                             dataValue={dataValue}/>
                                            }
                                        })}
                                      </div>
                                      : null}
                                    </div>
                                    <div className={tabStatesBasic['history'] + ' ui tab '}>
                                      {tabStatesBasic['history'] === 'active' && chartsData['basicProjectStatsTimeseries'] ?
                                      <div className="insight-basic-charts">
                                        {basicStatsKeys.map(function (value, index) {
                                            let name = "";
                                            let dataItem = chartsData['basicProjectStats'][value];
                                            if(dataItem==undefined){
                                                return null;
                                            } else {
                                                if(value == "NumberOfInstances"){
                                                    name = "Num of Instances";
                                                } else if (value == "NumberOfContainers") {
                                                    name = "Num of Containers";
                                                } else if (value == "NumberOfMetrics") {
                                                    name = "Num of Metrics";
                                                } else if (value == "BillingEstimate") {
                                                    name = "Estimated Daily Cost";
                                                } else if (value == "AvgInstanceUptime") {
                                                    name = "Avg Instance Uptime";
                                                }
                                                return (<BarChart title={name}  pieChartStyle={pieChartTop}
                                                    data={chartsData['basicProjectStatsTimeseries'][value]}
                                                    option={{title: {y: 'top'}}}
                                                    colorChart="#3398DB"
                                                    useData={true}/>)
                                            }
                                        })}
                                      </div>
                                      : null}
                                    </div>
                                
                            </div>

                            <div className="insight-barchart-base">
                                <div className="ui pointing secondary menu">
                                  <a className={tabStates['date'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'date')}>By Date</a>
                                  <a className={tabStates['dow'] + ' item'}
                                     onClick={(e) => this.selectTab(e, 'dow')}>By Day-of-Week</a>
                                </div>

                                <div className={tabStates['date'] + ' ui tab '}>
                                  {tabStates['date'] === 'active' ?
                                      <div className="insight-anomalies">
                                          <BarChart title="Number of Incidents" pieChartStyle={pieChartLeft}
                                                    data={chartsData['anomalyTimeseries']['AnomalyCountByDay']}
                                                    option={{title: {y: 'top'}}}
                                                    colorChart="#C13100"
                                                    useData={true}/>

                                          <BarChart title="Average Incident Duration (min)" pieChartStyle={pieChartLeft}
                                                    data={chartsData['anomalyTimeseries']['AnomalyDurationByDay']}
                                                    option={{title: {y: 'top'}}}
                                                    colorChart="#CC6600"
                                                    useData={true}/>

                                          <BarChart title="Incident Severity" pieChartStyle={pieChartLeft}
                                                    data={chartsData['anomalyTimeseries']['AnomalyDegreeByDay']}
                                                    option={{title: {y: 'top'}}}
                                                    colorChart="#FF9900"
                                                    useData={true}/>
                                    </div>
                                      : null}
                                </div>
                                <div className={tabStates['dow'] + ' ui tab '}>
                                    {tabStates['dow'] === 'active' ?
                                          <div className="insight-anomalies">
                                            <BarChart title="Anomaly Count" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyCountByDayOfWeek']}
                                                      colorChart="#C13100"/>

                                            <BarChart title="Avg Duration (min)" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDurationByDayOfWeek']}
                                                      colorChart="#CC6600"/>

                                            <BarChart title="Avg Degree" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDegreeByDayOfWeek']}
                                                      colorChart="#FF9900"/>

                                          </div>
                                        : null}
                                  </div>

                            </div>

                            <div className="insight-pieTick-base">
                                <div className="insight-anomaly-source">
                                    <PieTickChart title="Metric Attribution (by frequency)" name="Metric"
                                                  data={chartsData['anomalySources']['countByMetric']}/>
                                    <PieTickChart title="Metric Attribution (by degree)" name="Metric"
                                                  data={chartsData['anomalySources']['degreeByMetric']}/>
                                </div>
                                <div className="insight-anomaly-source">
                                    <PieTickChart title="Instance Attribution (by frequency)" name="Instance"
                                                  data={chartsData['anomalySources']['countByInstance']}/>
                                    <PieTickChart title="Instance Attribution (by degree)" name="Instance"
                                                  data={chartsData['anomalySources']['degreeByInstance']}/>
                                </div>
                            </div>
                        </div>
                            :
                            <div>
                            <span>No data</span>
                            </div>
                        }
                    </div>
                }
            </Console.Content>
        )
    }
}
export {InsightReport, PieChart};
