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
            color:['#00448a','#0580b9','#28c6b9','#84e6f1','#dddddd','00bfdb','57b43b'],
            title: {
                text: title,
                x: 'center'
            },
            calculable: true,
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: '80%',
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
        let {data} = this.props;
        let seriesData = JSON.parse(data);
        if ((_.keysIn(seriesData)).length == 0) {
            return (
                <div style={{'height': '300px',width: '40%'}}>
                    <div className="circle-charts">
                        <div className="circle-absolute">
                            No Anomaly
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '300px', width: '50%'}}
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

    getOption() {
        let {title,data,useData,colorChart} = this.props;
        let optionData = {
            title: {
                text: title,
                x: 'center',
                y: 'bottom'
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
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: useData ? _.keysIn(data) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    //name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: useData ? _.keysIn(data).map(function (value, index) {
                        return data[value]
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
        return optionData;
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
        dataValue: React.PropTypes.string
    };
    static defaultProps = {
        dataValue: '',
        pieChartStyle: {},
        colorChart: '',
        data: ""
    };

    getOption() {
        let {data,dataValue,colorChart} = this.props;
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
        var labelBottom = {
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
            series: [
                {
                    type: 'pie',
                    center: ['47%', '40%'],
                    radius: [60, 85],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: data, value: dataValue, itemStyle: labelBottom}
                    ]
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div style={{'width': '25%','margin': '0 auto'}}>
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '100%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>
                <div style={{'textAlign': 'center'}}>
                    <span style={{'color':this.props.colorChart,'fontSize': '25px','fontWeight': 'bold'}}>{this.props.data}</span>
                </div>
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
        apis.postInsightReport().then((resp)=> {
            this.setState({projectName: projectName, loadingIndex: false, detailData: resp.data});
        });
    }

    handleData(data) {
        this.setState({data: data}, ()=> {
            console.log(data);
        })
    }

    handleFilterChange(data) {
        this.setState({loading: true}, () => {
            this.setState({loading: false,projectName: data['projectName']});
        });
    }
    render() {
        let pieChartLeft = {'marginLeft': '10px', 'height': '250px', 'width': '32%', 'float': 'left'};
        let pieChartRight = {'marginLeft': '10px', 'height': '250px', 'width': '32%', 'float': 'left'};
        const {showAddPanel,projectName,detailData,loadingIndex,tabStates} = this.state;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        let chartsData = detailData[projectName];
        return (
            <Console.Content className={loadingIndex?"ui form loading":""}>
                {loadingIndex ? null :
                    <div className="ui main tiny container loading" ref={c => this._el = c}>
                        <div className="ui clearing vertical segment">
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
                                <div className="insight-basic-charts">
                                    {_.keys(chartsData['basicProjectStats']).map(function (value, index) {
                                        let name = "";
                                        let dataValue = (chartsData['basicProjectStats'][value]).toString();
                                        if (value == 'Host') {
                                            name = "Host";
                                        }
                                        else if(value == "NumberOfInstances"){
                                            name = "Instances";
                                        }
                                        else if (value == "AvgMetricUptime") {
                                            name = "Avg Metric Uptime";
                                            dataValue = (((chartsData['basicProjectStats'][value] * 100).toFixed(0)).toString()+"%");
                                        }
                                        else if (value.indexOf('NumberOf') != -1) {
                                            name = "Avg # of " + value.split("NumberOf")[1];
                                        }
                                        return <PieChart key={index} colorChart="#3398DB" data={name}
                                                         dataValue={dataValue}/>
                                    })}
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
                                            <BarChart title="Anomaly Count" pieChartStyle={pieChartLeft}
                                                      data={chartsData['anomalyTimeseries']['AnomalyCountByDay']}
                                                      colorChart="#3398DB"
                                                      useData={true}/>

                                            <BarChart title="Avg Duration" pieChartStyle={pieChartLeft}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDurationByDay']}
                                                      colorChart="#00bfdb"
                                                      useData={true}/>

                                            <BarChart title="Avg Degree" pieChartStyle={pieChartLeft}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDegreeByDay']}
                                                      colorChart="#57b43b"
                                                      useData={true}/>
                                      </div>
                                        : null}
                                  </div>
                                <div className={tabStates['dow'] + ' ui tab '}>
                                    {tabStates['dow'] === 'active' ?
                                          <div className="insight-anomalies">
                                            <BarChart title="Anomaly Count" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyCountByDayOfWeek']}
                                                      colorChart="#3398DB"/>

                                            <BarChart title="Avg Duration" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDurationByDayOfWeek']}
                                                      colorChart="#00bfdb"/>

                                            <BarChart title="Avg Degree" pieChartStyle={pieChartRight}
                                                      data={chartsData['anomalyTimeseries']['AnomalyDegreeByDayOfWeek']}
                                                      colorChart="#57b43b"/>

                                          </div>
                                        : null}
                                  </div>

                            </div>
                            <div className="insight-pieTick-base">
                                <div className="insight-basic-top"><h3 className="anomaly-source-h3">Anomaly Source</h3></div>
                                <div className="insight-anomaly-source">
                                    <PieTickChart title="Metric Attribution (frequency)" name="Metric"
                                                  data={chartsData['anomalySources']['countByMetric']}/>
                                    <PieTickChart title="Instance Attribution (frequency)" name="Instance"
                                                  data={chartsData['anomalySources']['countByInstance']}/>
                                </div>
                                <div className="insight-anomaly-source">
                                    <PieTickChart title="Metric Attribution (degree)" name="Metric"
                                                  data={chartsData['anomalySources']['degreeByMetric']}/>
                                    <PieTickChart title="Instance Attribution (degree)" name="Instance"
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
export default InsightReport;
