import React from "react";
import ReactEcharts from 'echarts-for-react';
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

export {PieTickChart, PieChart, BarChart};
