import React from "react";
import {
    BaseComponent, Console, ButtonGroup, Button, Popup, Modal,
    Dropdown, Accordion, Message
} from '../../../artui/react';
import ReactEcharts from 'echarts-for-react';
const PieTickChart = React.createClass({
    getOption: function () {
        var option = {
            title: {
                text: 'test',
                subtext: 'test-to-test',
                x: 'center'
            },
            calculable: true,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
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
                style={{height: '300px', width: '100%'}}
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
                data: [
                    'Host', 'Facebook', 'Youtube', 'google'
                ]
            },
            series: [
                {
                    type: 'pie',
                    center: ['20%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Host', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['40%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Facebook', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['60%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'Youtube', value: 46, itemStyle: labelBottom}
                    ]
                },
                {
                    type: 'pie',
                    center: ['80%', '40%'],
                    radius: [80, 105],
                    x: '0%',
                    itemStyle: labelFromatter,
                    data: [
                        {name: 'google', value: 46, itemStyle: labelBottom}
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
                <PieChart />
                <BarChart />
                <BarChart />
                <BarChart />
                <BarChart />
                <PieTickChart />
            </Console.Content>
        )
    }
}
export default InsightReport;
