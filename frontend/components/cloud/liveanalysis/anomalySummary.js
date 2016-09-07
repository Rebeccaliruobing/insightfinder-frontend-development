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
        heatMapX = heatMapX.map(function (value, index) {
            return $.trim(value);
        });
        heatMapY = heatMapY.map(function (value, index) {
            return $.trim(value);
        });
        filterMapList = filterMapList.map(function (value, index) {
            return $.trim(value);
        });
        var metrics = heatMapY;
        var instances = heatMapX;
        var maxMap = 10;
        var minMap = 0.00001;
        let showData = [];
        let instancesMax = {};
        _.each(instances,function(inst,idxInst){
            let a = anomalyHeatmapJson[inst];
            if(a!=undefined){
                let maxAr = 0;
                for (var key in a) {
                    let ar = parseFloat(a[key]);
                    if(ar>maxAr){
                        maxAr = ar;
                    }
                }
                instancesMax[inst] = maxAr;
            }
        });
        // sort instances by first anomaly second no anomaly
        instances = instances.sort(function (a, b) {
                                let aAnomaly = (anomalyHeatmapJson[a]==undefined);
                                let bAnomaly = (anomalyHeatmapJson[b]==undefined);
                                if (aAnomaly && !bAnomaly) {
                                    return -1;
                                } else if (!aAnomaly && bAnomaly) {
                                    return 1;
                                } else if (aAnomaly && bAnomaly) {
                                    return 0;
                                } else {
                                    let aMax = instancesMax[a];
                                    let bMax = instancesMax[b];
                                    if (aMax < bMax) {
                                        return -1;
                                    } else if (aMax > bMax) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }   
                            })

        for (let i = 0; i < instances.length; i++) {
            let newInstanceFlag = filterMapList.indexOf(instances[i]);
            let missFlag = anomalyHeatmapJson[instances[i]] ? anomalyHeatmapJson[instances[i]]['_missingFlag'] : undefined;
            missFlag = missFlag == true;
            for (let j = 0; j < metrics.length; j++) {
                let anomalyData = 0.01;
                if (newInstanceFlag != -1) {
                    anomalyData = 2;
                }
                else if (missFlag) {
                    anomalyData = 0;
                }
                else {
                    let anomaly = anomalyHeatmapJson[instances[i]] ? anomalyHeatmapJson[instances[i]][metrics[j]] : 0.000001;
                    anomalyData = anomaly ? anomaly : 0.000001;
                    anomalyData > maxMap ? maxMap = anomalyData : null;
                }
                anomalyData = anomalyData.toFixed(2);
                showData.push([i, j, anomalyData]);
            }
        }
        var data = showData;

        data = data.map(function (item,index) {
            return {
                name: heatMapY[index%(heatMapY.length)],
                value: [item[1], item[0], item[2] || '-']
            }
        });
        let height = 65+heatMapX.length;
        var option = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: (height>=95?95:height)+'%',
                y: '0%',
                x: '240px'
            },
            xAxis: {
                type: 'category',
                data: metrics,
                splitArea: {
                    show: false
                },
                axisLabel:{
                    interval: 0
                }
            },
            yAxis: {
                type: 'category',
                data: instances,
                splitArea: {
                    show: true
                },
                axisLabel:{
                    interval: 0
                }
            },
            visualMap: {
                min: minMap,
                max: maxMap,
                color: ['#ff0000', '#ffff00', '#00ff00'],
                calculable: true,
                orient: 'horizontal',
                left: 'center'
            },
            series: [{
                name: 'Anomaly Summary',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'black'
                    },
                    normal: {
                        borderColor: ['#333333'],
                        borderWidth: 0.5
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