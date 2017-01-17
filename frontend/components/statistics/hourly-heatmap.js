import React, { PropTypes as T } from 'react';
import d3 from 'd3';

export default class HourlyHeatmap extends React.Component {
  static defaultProps = { data: [], duration: '7d' };

  drawHeatmap() {
  let margin = { top: 50, right: 0, bottom: 34, left: 50 },
        width = 540 - margin.left - margin.right,
        height = 940 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 14),
        legendElementWidth = gridSize * 2,
        buckets = 9,
        colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4',
            '#1d91c0', '#225ea8', '#253494', '#081d58'],
										// alternatively colorbrewer.YlGnBu[9]
        days = ['11/25', '11/26', '11/27', '11/28', '11/29',
            '11/30', '12/1', '12/2', '12/3', '12/4',
            '12/5', '12/6', '12/7', '12/8'],
        times = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'],
        datasets = ['Anomalies'],
        dataset = [
{ 'day': 1, 'period': 1, 'value': 11 }, { 'day': 1, 'period': 2, 'value': 12 }, { 'day': 1, 'period': 3, 'value': 13 }, { 'day': 1, 'period': 4, 'value': 14 }, { 'day': 1, 'period': 5, 'value': 15 }, { 'day': 1, 'period': 6, 'value': 16 }, { 'day': 1, 'period': 7, 'value': 17 }, { 'day': 1, 'period': 8, 'value': 18 }, { 'day': 2, 'period': 1, 'value': 21 }, { 'day': 2, 'period': 2, 'value': 22 }, { 'day': 2, 'period': 3, 'value': 23 }, { 'day': 2, 'period': 4, 'value': 24 }, { 'day': 2, 'period': 5, 'value': 25 }, { 'day': 2, 'period': 6, 'value': 26 }, { 'day': 2, 'period': 7, 'value': 27 }, { 'day': 2, 'period': 8, 'value': 28 }, { 'day': 3, 'period': 1, 'value': 31 }, { 'day': 3, 'period': 2, 'value': 32 }, { 'day': 3, 'period': 3, 'value': 33 }, { 'day': 3, 'period': 4, 'value': 34 }, { 'day': 3, 'period': 5, 'value': 35 }, { 'day': 3, 'period': 6, 'value': 36 }, { 'day': 3, 'period': 7, 'value': 37 }, { 'day': 3, 'period': 8, 'value': 38 }, { 'day': 4, 'period': 1, 'value': 41 }, { 'day': 4, 'period': 2, 'value': 42 }, { 'day': 4, 'period': 3, 'value': 43 }, { 'day': 4, 'period': 4, 'value': 44 }, { 'day': 4, 'period': 5, 'value': 45 }, { 'day': 4, 'period': 6, 'value': 46 }, { 'day': 4, 'period': 7, 'value': 47 }, { 'day': 4, 'period': 8, 'value': 48 }, { 'day': 5, 'period': 1, 'value': 51 }, { 'day': 5, 'period': 2, 'value': 52 }, { 'day': 5, 'period': 3, 'value': 53 }, { 'day': 5, 'period': 4, 'value': 54 }, { 'day': 5, 'period': 5, 'value': 55 }, { 'day': 5, 'period': 6, 'value': 56 }, { 'day': 5, 'period': 7, 'value': 57 }, { 'day': 5, 'period': 8, 'value': 58 }, { 'day': 6, 'period': 1, 'value': 61 }, { 'day': 6, 'period': 2, 'value': 62 }, { 'day': 6, 'period': 3, 'value': 63 }, { 'day': 6, 'period': 4, 'value': 64 }, { 'day': 6, 'period': 5, 'value': 65 }, { 'day': 6, 'period': 6, 'value': 66 }, { 'day': 6, 'period': 7, 'value': 67 }, { 'day': 6, 'period': 8, 'value': 68 }, { 'day': 7, 'period': 1, 'value': 71 }, { 'day': 7, 'period': 2, 'value': 72 }, { 'day': 7, 'period': 3, 'value': 73 }, { 'day': 7, 'period': 4, 'value': 74 }, { 'day': 7, 'period': 5, 'value': 75 }, { 'day': 7, 'period': 6, 'value': 76 }, { 'day': 7, 'period': 7, 'value': 77 }, { 'day': 7, 'period': 8, 'value': 78 }, { 'day': 8, 'period': 1, 'value': 81 }, { 'day': 8, 'period': 2, 'value': 82 }, { 'day': 8, 'period': 3, 'value': 83 }, { 'day': 8, 'period': 4, 'value': 84 }, { 'day': 8, 'period': 5, 'value': 85 }, { 'day': 8, 'period': 6, 'value': 86 }, { 'day': 8, 'period': 7, 'value': 87 }, { 'day': 8, 'period': 8, 'value': 88 }, { 'day': 9, 'period': 1, 'value': 91 }, { 'day': 9, 'period': 2, 'value': 92 }, { 'day': 9, 'period': 3, 'value': 93 }, { 'day': 9, 'period': 4, 'value': 94 }, { 'day': 9, 'period': 5, 'value': 95 }, { 'day': 9, 'period': 6, 'value': 96 }, { 'day': 9, 'period': 7, 'value': 97 }, { 'day': 9, 'period': 8, 'value': 98 }, { 'day': 10, 'period': 1, 'value': 101 }, { 'day': 10, 'period': 2, 'value': 102 }, { 'day': 10, 'period': 3, 'value': 103 }, { 'day': 10, 'period': 4, 'value': 104 }, { 'day': 10, 'period': 5, 'value': 105 }, { 'day': 10, 'period': 6, 'value': 106 }, { 'day': 10, 'period': 7, 'value': 107 }, { 'day': 10, 'period': 8, 'value': 108 }, { 'day': 11, 'period': 1, 'value': 111 }, { 'day': 11, 'period': 2, 'value': 112 }, { 'day': 11, 'period': 3, 'value': 113 }, { 'day': 11, 'period': 4, 'value': 114 }, { 'day': 11, 'period': 5, 'value': 115 }, { 'day': 11, 'period': 6, 'value': 116 }, { 'day': 11, 'period': 7, 'value': 117 }, { 'day': 11, 'period': 8, 'value': 118 }, { 'day': 12, 'period': 1, 'value': 121 }, { 'day': 12, 'period': 2, 'value': 122 }, { 'day': 12, 'period': 3, 'value': 123 }, { 'day': 12, 'period': 4, 'value': 124 }, { 'day': 12, 'period': 5, 'value': 125 }, { 'day': 12, 'period': 6, 'value': 126 }, { 'day': 12, 'period': 7, 'value': 127 }, { 'day': 12, 'period': 8, 'value': 128 }, { 'day': 13, 'period': 1, 'value': 131 }, { 'day': 13, 'period': 2, 'value': 132 }, { 'day': 13, 'period': 3, 'value': 133 }, { 'day': 13, 'period': 4, 'value': 134 }, { 'day': 13, 'period': 5, 'value': 135 }, { 'day': 13, 'period': 6, 'value': 136 }, { 'day': 13, 'period': 7, 'value': 137 }, { 'day': 13, 'period': 8, 'value': 138 }, { 'day': 14, 'period': 1, 'value': 141 }, { 'day': 14, 'period': 2, 'value': 142 }, { 'day': 14, 'period': 3, 'value': 143 }, { 'day': 14, 'period': 4, 'value': 144 }, { 'day': 14, 'period': 5, 'value': 145 }, { 'day': 14, 'period': 6, 'value': 146 }, { 'day': 14, 'period': 7, 'value': 147 }, { 'day': 14, 'period': 8, 'value': 148 }]; 

      // Remove the children if exist
  d3.select('#chart > svg').remove();

  let svg = d3.select('#chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  let dayLabels = svg.selectAll('.dayLabel')
          .data(days)
          .enter().append('text')
            .text((d) => { return d; })
            .attr('x', (d, i) => { return i * gridSize; })
            .attr('y', 0)
            .style('text-anchor', 'start')
            .attr('transform', 'translate(' + gridSize / 8 + ', -6)')
            .attr('class', (d, i) => { return ((i >= 7 && i <= 16) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });

  let timeLabels = svg.selectAll('.timeLabel')
          .data(times)
          .enter().append('text')
            .text((d) => { return d; })
            .attr('x', 0)
            .attr('y', (d, i) => { return i * gridSize; })
            .style('text-anchor', 'end')
            .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
            .attr('class', (d, i) => { return ((i >= 0 && i <= 4) ? 'timeLabel mono axis axis-workday' : 'timeLabel mono axis'); });

  let heatmapChart = function (error, data) {
        let colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, (d) => { return d.value; })])
              .range(colors);

        let cards = svg.selectAll('.day')
              .data(data, (d) => { return `${d.period}:${d.day}`; });

        cards.append('title');

        cards.enter().append('rect')
              .attr('x', (d) => { return (d.day - 1) * gridSize; })
              .attr('y', (d) => { return (d.period - 1) * gridSize; })
              .attr('rx', 4)
              .attr('ry', 4)
              .attr('class', 'day bordered')
              .attr('width', gridSize)
              .attr('height', gridSize)
              .style('fill', colors[0]);

        cards.transition().duration(1500)
              .style('fill', (d) => { return colorScale(d.value); });
					//  Is this supposed to build an event handler???   VVVVVVVVVVVV
        cards.select('title').text((d) => { console.log(d.value); return d.value; });

        cards.exit().remove();

        let legend = svg.selectAll('.legend')
             .data([0].concat(colorScale.quantiles()), (d) => { return d; });

        legend.enter().append('g')
              .attr('class', 'legend');

        legend.append('rect')
            .attr('x', (d, i) => { return legendElementWidth * i; })
            .attr('y', height)
            .attr('width', legendElementWidth)
            .attr('height', gridSize / 2)
            .style('fill', (d, i) => { return colors[i]; });

        legend.append('text')
            .attr('class', 'mono')
            .text((d) => { return '≥ ' + Math.round(d); })
            .attr('x', (d, i) => { return legendElementWidth * i; })
            .attr('y', height + gridSize);

        legend.exit().remove();
      };

  heatmapChart(false, dataset);

      // var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      //  .data(datasets);

      // datasetpicker.enter()
      //  .append("input")
      //  .attr("value", function(d){ return "Dataset " + d })
      //  .attr("type", "button")
      //  .attr("class", "dataset-button")
      //  .on("click", function(d) {
      //    //heatmapChart(d);
      //  });
  }

  render() {
//    console.log('In render() function');
	  return (
      <div id="chart">
       {this.drawHeatmap()}
      </div>
    );
  }
}
