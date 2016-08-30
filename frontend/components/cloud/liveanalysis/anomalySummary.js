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
        var hours = heatMapY;
        var days = heatMapX;
        let showData = [];
        console.log(hours, days);
        for(let i=0;i<days.length;i++){
            for(let j=0;j<hours.length;j++){
                if(flagShow){
                    showData.push([i,j,0]);
                }
                else{
                    let anomaly = anomalyHeatmapJson[days[i]]?anomalyHeatmapJson[days[i]][hours[j]]:0;
                    showData.push([i,j,anomaly]);
                }
            }
        }
        console.log(showData);
        //var data = [[0,0,5],[0,1,1],[0,2,3],[0,3,1],[0,4,1],[0,5,1],[0,6,1],[0,7,1],[0,8,2],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,10],[1,8,6]];
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
                    show: true
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
                min: 0,
                max: 10,
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
                        show: true
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