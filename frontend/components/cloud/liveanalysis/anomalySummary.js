import $ from 'jquery';
import React from 'react';
import store from 'store';
import ReactEcharts from 'echarts-for-react';
import {Modal, Dropdown} from '../../../artui/react';
import {ChartsRefreshInterval, GridColumns, DefaultView} from '../../storeKeys';
import apis from '../../../apis/index';


const HotMapCharts = React.createClass({
    getOption() {
        let instanceMetricJson = this.props['instanceMetricJson'];
        let anomalyMapJson = this.props['anomalyMapJson'];
        let heatMapX = instanceMetricJson['instances'].split(',');
        let heatMapY = instanceMetricJson['metrics'].split(',');
        let filterMapList = instanceMetricJson['newInstances'].split(',');
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
        _.each(instances, function (inst, idxInst) {
            let a = anomalyMapJson[inst];
            if (a != undefined) {
                let maxAr = 0;
                for (var key in a) {
                    let ar = parseFloat(a[key]);
                    if (ar > maxAr) {
                        maxAr = ar;
                    }
                }
                instancesMax[inst] = maxAr;
            }
        });
        // sort instances by first anomaly second no anomaly
        instances = instances.sort(function (a, b) {
            let aAnomaly = (anomalyMapJson[a] == undefined);
            let bAnomaly = (anomalyMapJson[b] == undefined);
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
            let missFlag = anomalyMapJson[instances[i]] ? anomalyMapJson[instances[i]]['_missingFlag'] : undefined;
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
                    let anomaly = anomalyMapJson[instances[i]] ? anomalyMapJson[instances[i]][metrics[j]] : 0.000001;
                    anomalyData = anomaly ? anomaly : 0.000001;
                    anomalyData > maxMap ? maxMap = anomalyData : null;
                }
                anomalyData = anomalyData.toFixed(2);
                showData.push([i, j, anomalyData]);
            }
        }
        var data = showData;
        let self = this;
        data = data.map(function (item, index) {
            return {
                projectName: self.props.projectName,
                name: heatMapY[index % (heatMapY.length)],
                value: [item[1], item[0], item[2] || '-'],
                heatMap_x: heatMapX[parseInt(index / (heatMapY.length))]
            }
        });
        let height = 65 + heatMapX.length;
        var option = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: (height >= 85 ? 85 : height) + '%',
                y: '0%',
                x: '200px'
            },
            xAxis: {
                type: 'category',
                data: metrics,
                splitArea: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    rotate: 90
                }
            },
            yAxis: {
                type: 'category',
                data: instances,
                splitArea: {
                    show: true
                },
                axisLabel: {
                    interval: 0
                }
            },
            visualMap: {
                min: minMap,
                max: maxMap,
                color: ['#ff0000', '#ffff00', '#00ff00'],
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                show:false
            },
            series: [{
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
    onChartClick(e){
        let params = {
            projectName: e.data['projectName'],
            metricName: e.data['name'],
            instanceName: e.data['heatMap_x']
        };
        window.location.href = `/projectDataOnly?${$.param(params)}`;
        //apis.postProjectDataSimple(e.data['projectName'], e.data['name'], e.data['heatMap_x']).then(resp=> {
        //    console.log(resp);
        //});
    },
    render() {
        let onEvents = {
            'click': this.onChartClick
        };
        if(!this.props['instanceMetricJson'] || !this.props['instanceMetricJson']){
            return null;
        }
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '100%', width: '100%'}}
                className='echarts-for-echarts'
                onEvents={onEvents}
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
            <HotMapCharts projectName={data['projectName']}
                          instanceMetricJson={data['instanceMetricJson']}
                          anomalyMapJson={data['anomalyMapJson']}/>
        )
    }
}

export default AnomalySummary;