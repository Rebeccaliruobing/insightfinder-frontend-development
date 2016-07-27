import React from "react";
import {
    BaseComponent, Console, ButtonGroup, Button, Popup, Modal,
    Dropdown, Accordion, Message
} from '../../../artui/react';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import apis from '../../../apis';
import FilterBar from './filter-bar';

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
            title: {
                text: title,
                x: 'center'
            },
            calculable: true,
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: '55%',
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
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '50%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>

        )
    }
}
class BarChart extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        pieChartStyle: React.PropTypes.object,
        data: React.PropTypes.string
    };
    static defaultProps = {
        title: 'Title',
        pieChartStyle: {},
        data: {}
    };

    getOption() {
        let {title,data} = this.props;
        let optionData = {
            title: {
                text: title
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
                    data: [
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
        pieChartStyle: React.PropTypes.object,
        data: React.PropTypes.string
    };
    static defaultProps = {
        pieChartStyle: {},
        data: {}
    };

    getOption() {
        let {data} = this.props;
        let centerBase = -5;
        let legendData = _.keysIn(data).map(function (value, index) {
            let baseLegend = {};
            if (value == 'Host') {
                baseLegend[value] = data[value];
                return baseLegend;
            }
            else if (value == "AvgMetricUptime") {
                baseLegend['Avg Metric Uptime'] = data[value];
                return baseLegend;
            }
            else if (value.indexOf('NumberOf') != -1) {
                baseLegend["Avg # of " + value.split("NumberOf")[1]] = data[value];
                return baseLegend;
            }
        });
        var labelFromatter = {
            normal: {
                label: {
                    formatter: function (params) {
                        return 100 - params.value
                    },
                    textStyle: {
                        baseline: 'top',
                        fontSize: '70'
                    }
                }
            }
        };
        var labelBottom = {
            normal: {
                color: '#e5cf0d',
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
            legend: {
                x: 'center',
                y: 'bottom',
                itemGap: 50,
                textStyle: {fontWeight: 'bold', fontSize: '25'},
                data: _.keysIn(data).map(function (value, index) {
                    console.log(value);
                    if (value == 'Host') {
                        return value;
                    }
                    else if (value == "AvgMetricUptime") {
                        return "Avg Metric Uptime";
                    }
                    else if (value.indexOf('NumberOf') != -1) {
                        return "Avg # of " + value.split("NumberOf")[1];
                    }
                })
            },
            series: _.keysIn(data).map(function (value, index) {
                centerBase = centerBase + 20;
                return {
                    type: 'pie',
                    center: [centerBase + '%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {
                            name: value="Host"?value:(value == "AvgMetricUptime"?"Avg Metric Uptime":"Avg # of " + value.split("NumberOf")[1]),
                            value: value == "AvgMetricUptime"?'111':data[value].toString(),
                            itemStyle: labelBottom
                        }
                    ]
                }
            })
        };
        return option;
    }

    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '100%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>
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
            detailData: {}
        };
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
            console.log(data);
            this.setState({loading: false});
        });
    }

    render() {
        let pieChartLeft = {'marginLeft': '30px', 'height': '280px', 'width': '40%', 'float': 'left'};
        let pieChartRight = {'marginRight': '30px', 'height': '280px', 'width': '40%', 'float': 'right'};
        const {showAddPanel,projectName,detailData,loadingIndex} = this.state;
        const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
        let chartsData = detailData[projectName];
        console.log(chartsData);
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
                        <div><h3>Basic Stats</h3></div>
                        <PieChart data={chartsData['basicProjectStats']}/>

                        <div><h3>Anoamlies</h3></div>
                        <div style={{'display': 'inline-block','width': '100%'}}>
                            <BarChart title="Anomaly Count by Day" pieChartStyle={pieChartLeft}
                                      data={chartsData['anomalyTimeseries']['AnomalyCountByDay']}/>
                            <BarChart title="Anomaly Count by Day-Of-Week" pieChartStyle={pieChartRight}
                                      data={chartsData['anomalyTimeseries']['AnomalyCountByDayOfWeek']}/>
                        </div>
                        <div style={{'display': 'inline-block','width': '100%'}}>
                            <BarChart title="Avg Anomaly Duration by Day" pieChartStyle={pieChartLeft}
                                      data={chartsData['anomalyTimeseries']['AnomalyDurationByDay']}/>
                            <BarChart title="Avg Anomaly Duration by Day-Of-Week" pieChartStyle={pieChartRight}
                                      data={chartsData['anomalyTimeseries']['AnomalyDurationByDayOfWeek']}/>
                        </div>
                        <div style={{'display': 'inline-block','width': '100%'}}>
                            <BarChart title="Avg Anomaly Degree by Day" pieChartStyle={pieChartLeft}
                                      data={chartsData['anomalyTimeseries']['AnomalyDegreeByDay']}/>
                            <BarChart title="Avg Anomaly Degree by Day-Of-Week" pieChartStyle={pieChartRight}
                                      data={chartsData['anomalyTimeseries']['AnomalyDegreeByDayOfWeek']}/>
                        </div>
                        <div><h3>Anomaly Source</h3></div>
                        <div style={{'display': 'flex'}}>
                            <PieTickChart title="Anomaly Frequency by Metric" name="Metric"
                                          data={chartsData['anomalySources']['countByMetric']}/>
                            <PieTickChart title="Anomaly Frequency by Instance" name="Instance"
                                          data={chartsData['anomalySources']['countByInstance']}/>
                        </div>
                        <div style={{'display': 'flex'}}>
                            <PieTickChart title="Anomaly Degree by Metric" name="Metric"
                                          data={chartsData['anomalySources']['degreeByMetric']}/>
                            <PieTickChart title="Anomaly Degree by Instance" name="Instance"
                                          data={chartsData['anomalySources']['degreeByInstance']}/>
                        </div>
                    </div>
                }
            </Console.Content>
        )
    }
}
export default InsightReport;
