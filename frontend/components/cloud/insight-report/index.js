import React from "react";
import {
    BaseComponent, Console, ButtonGroup, Button, Popup, Modal,
    Dropdown, Accordion, Message
} from '../../../artui/react';
import ReactEcharts from 'echarts-for-react';
const PieTickChart = React.createClass({
    getInitialState: function () {
      return {
          title: this.props.title || "None",
          name: this.props.name || "Name"
      }
    },
    getOption: function () {
        let {title,name} = this.state;
        var option = {
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
                    data: [
                        {value: 335, name: name+"1"},
                        {value: 310, name: name+'2'},
                        {value: 234, name: name+'3'},
                        {value: 135, name: name+'4'},
                        {value: 1548, name: name+'5'}
                    ]
                }
            ]
        };
        return option;
    },
    render: function () {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '50%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>

        )
    }
});
const BarChart = React.createClass({
    getOption: function () {

        var option = {
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };
        return option;
    },
    render: function () {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '50%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>

        )
    }
});
const PieChart = React.createClass({
    getOption: function () {
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
                itemGap: 100,
                textStyle:{fontWeight:'bold',fontSize:'20'},
                data: [
                    'Host', 'Avg # of VMs', 'Avg # of Containers', 'Avg Metric Uptime'
                ]
            },
            series: [
                {
                    type: 'pie',
                    center: ['17%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Host', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['35%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Avg # of VMs', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['55%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Avg # of Containers', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['75%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Avg Metric Uptime', value: 46, itemStyle: labelBottom}
                    ]
                }
            ]
        };
        return option;
    },
    render: function () {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '100%'}}
                className='echarts-for-echarts'
                theme='my_theme'/>
        )
    }
});
class InsightReport extends BaseComponent {
    static contextType = {
        userInstructions: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Console.Content>
                <div><h3>Basic Stats</h3></div>
                <PieChart />
                <div><h3>Anoamlies</h3></div>
                <div style={{'display': 'flex'}}>
                    <BarChart />
                    <BarChart />
                </div>
                <div style={{'display': 'flex'}}>
                    <BarChart />
                    <BarChart />
                </div>
                <div style={{'display': 'flex'}}>
                    <BarChart />
                    <BarChart />
                </div>
                <div><h3>Anomaly Source</h3></div>
                <div style={{'display': 'flex'}}>
                    <PieTickChart title="Anomaly Frequency by Metric" name="Metric"/>
                    <PieTickChart title="Anomaly Frequency by Instance" name="Instance"/>
                </div>
                <div style={{'display': 'flex'}}>
                    <PieTickChart title="Anomaly Degree by Metric" name="Metric"/>
                    <PieTickChart title="Anomaly Degree by Instance" name="Instance"/>
                </div>
            </Console.Content>
        )
    }
}
export default InsightReport;
