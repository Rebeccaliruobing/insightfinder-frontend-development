import $ from 'jquery';
import React from 'react';
import store from 'store';
import ReactEcharts from 'echarts-for-react';
import {Modal, Dropdown} from '../../../artui/react';
import {ChartsRefreshInterval, GridColumns, DefaultView} from '../../storeKeys';

const HotMapCharts = React.createClass({
    getOption() {
        let instanceMetricJson = this.props['instanceMetricJson'];
        let anomalyHeatmapJson = this.props['anomalyHeatmapJson'];
        let heatMapX = instanceMetricJson['instances'].split(',');
        let heatMapY = instanceMetricJson['metrics'].split(',');
        let filterMapList = instanceMetricJson['newInstances'].split(',');
        let flagShow = true;
        if (anomalyHeatmapJson['_maxAnomalyRatio']) {
            flagShow = true;
        }
        else if (anomalyHeatmapJson['_missingFlag']) {
            flagShow = false;
        }
        heatMapX[0] = (heatMapX[0].split('['))[1];
        heatMapX[heatMapX.length - 1] = (heatMapX[heatMapX.length - 1].split(']'))[0];
        heatMapY[0] = (heatMapY[0].split('['))[1];
        heatMapY[heatMapY.length - 1] = (heatMapY[heatMapY.length - 1].split(']'))[0];
        filterMapList[0] = (filterMapList[0].split('['))[1];
        filterMapList[filterMapList.length - 1] = (filterMapList[filterMapList.length - 1].split(']'))[0];
        heatMapX = heatMapX.map(function (value,index) {
            return $.trim(value);
        });
        heatMapY = heatMapY.map(function (value,index) {
            return $.trim(value);
        });
        filterMapList = filterMapList.map(function (value,index) {
            return $.trim(value);
        });
        var hours = heatMapY;
        var days = heatMapX;
        var maxMap = 10;
        var minMap = 0.01;
        let showData = [];
        console.log(hours, days, filterMapList);
        for (let i = 0; i < days.length; i++) {
            let newInstanceFlag = filterMapList.indexOf(days[i]);
            let missFlag = anomalyHeatmapJson[days[i]]['_missingFlag'];
            missFlag = missFlag == true;
            for (let j = 0; j < hours.length; j++) {
                let anomalyData = 0.01;
                if (newInstanceFlag!=-1) {
                    anomalyData = 2;
                }
                else if(missFlag){
                    anomalyData = 0;
                }
                else {
                    let anomaly = anomalyHeatmapJson[days[i]] ? anomalyHeatmapJson[days[i]][hours[j]] : 0.01;
                    anomalyData = anomaly ? anomaly : 0.01;
                    anomalyData > maxMap ? maxMap = anomalyData : null;
                }
                showData.push([i, j, anomalyData]);
            }
        }
        var data = showData;

        data = data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });

        var option = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: hours,
                splitArea: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: days,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: minMap,
                max: maxMap,
                color: ['#ff0000', '#ffff00', '#00ff00'],
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Anomaly Summary',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }]
        };
        return option;
    },
    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '100%', width: '100%'}}
                className='echarts-for-echarts'
                opts={{height: '100%', width: '100%'}}
                theme='my_theme'/>
        )
    }
});
class AnomalySummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {data} = this.props;
        return (
            <HotMapCharts instanceMetricJson={data['instanceMetricJson']}
                          anomalyHeatmapJson={data['anomalyHeatmapJson']}/>
        )
    }
}

export default AnomalySummary;