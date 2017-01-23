import React, { PropTypes as T } from 'react';
import d3 from 'd3';

export default class HourlyHeatmap extends React.Component {
  static defaultProps = { data: [], duration: '7d' };

  drawHeatmap(timeframe,duration=7) {
	let margin = { top: 50, right: 0, bottom: 30, left: 50 },
        width = 540 - margin.left - margin.right,
        height = 740 - margin.top - margin.bottom,
        buckets = 7,
        cellHeight = 80,
        cellWidth = Math.floor(width / duration),
        legendElementWidth = Math.floor(width / buckets),
//  Original palette:        
//        historicColors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4',
//            '#1d91c0', '#225ea8', '#253494', '#081d58'],
        historicColors = ['#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        predictedColors = ['#c7b4e9', '#7fbbcd', '#41c4b6', '#1dc091', '#22a85e', '#259434', '#08581d'],
        colors = historicColors,  // Setting default color scheme
        // Replace "days" below with dynamic calculated labels for $duration
        days = ['1/15', '1/16', '1/17', '1/18', '1/19', '1/20', '1/21'],
        predictedDays = ['1/22', '1/23', '1/24', '1/25', '1/26', '1/27', '1/28'],

        times = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'],
        datasets = ['Anomalies'],
        dataset = [{ 'day': 1, 'period': 1, 'value': 11, 'title':"1:1" }, { 'day': 1, 'period': 2, 'value': 12 }, { 'day': 1, 'period': 3, 'value': 13 }, { 'day': 1, 'period': 4, 'value': 14 }, { 'day': 1, 'period': 5, 'value': 15 }, { 'day': 1, 'period': 6, 'value': 16 }, { 'day': 1, 'period': 7, 'value': 17 }, { 'day': 1, 'period': 8, 'value': 18 }, { 'day': 2, 'period': 1, 'value': 21 }, { 'day': 2, 'period': 2, 'value': 22 }, { 'day': 2, 'period': 3, 'value': 23 }, { 'day': 2, 'period': 4, 'value': 24 }, { 'day': 2, 'period': 5, 'value': 25 }, { 'day': 2, 'period': 6, 'value': 26 }, { 'day': 2, 'period': 7, 'value': 27 }, { 'day': 2, 'period': 8, 'value': 28 }, { 'day': 3, 'period': 1, 'value': 31 }, { 'day': 3, 'period': 2, 'value': 32 }, { 'day': 3, 'period': 3, 'value': 33 }, { 'day': 3, 'period': 4, 'value': 34 }, { 'day': 3, 'period': 5, 'value': 35 }, { 'day': 3, 'period': 6, 'value': 36 }, { 'day': 3, 'period': 7, 'value': 37 }, { 'day': 3, 'period': 8, 'value': 38 }, { 'day': 4, 'period': 1, 'value': 41 }, { 'day': 4, 'period': 2, 'value': 42 }, { 'day': 4, 'period': 3, 'value': 43 }, { 'day': 4, 'period': 4, 'value': 44 }, { 'day': 4, 'period': 5, 'value': 45 }, { 'day': 4, 'period': 6, 'value': 46 }, { 'day': 4, 'period': 7, 'value': 47 }, { 'day': 4, 'period': 8, 'value': 48 }, { 'day': 5, 'period': 1, 'value': 51 }, { 'day': 5, 'period': 2, 'value': 52 }, { 'day': 5, 'period': 3, 'value': 53 }, { 'day': 5, 'period': 4, 'value': 54 }, { 'day': 5, 'period': 5, 'value': 55 }, { 'day': 5, 'period': 6, 'value': 56 }, { 'day': 5, 'period': 7, 'value': 57 }, { 'day': 5, 'period': 8, 'value': 58 }, { 'day': 6, 'period': 1, 'value': 61 }, { 'day': 6, 'period': 2, 'value': 62 }, { 'day': 6, 'period': 3, 'value': 63 }, { 'day': 6, 'period': 4, 'value': 64 }, { 'day': 6, 'period': 5, 'value': 65 }, { 'day': 6, 'period': 6, 'value': 66 }, { 'day': 6, 'period': 7, 'value': 67 }, { 'day': 6, 'period': 8, 'value': 68 }, { 'day': 7, 'period': 1, 'value': 71 }, { 'day': 7, 'period': 2, 'value': 72 }, { 'day': 7, 'period': 3, 'value': 73 }, { 'day': 7, 'period': 4, 'value': 74 }, { 'day': 7, 'period': 5, 'value': 75 }, { 'day': 7, 'period': 6, 'value': 76 }, { 'day': 7, 'period': 7, 'value': 77 }, { 'day': 7, 'period': 8, 'value': 78 }]; 

	if (timeframe == "predicted") {
		colors = predictedColors;		
		days = predictedDays;
	}
	
      // Remove the children if exist
    d3.select('#'+timeframe+' > svg').remove();

    let svg = d3.select('#'+timeframe).append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let dayLabels = svg.selectAll('.dayLabel')
          .data(days)
          .enter().append('text')
            .text((d) => { return d; })
            .attr('x', (d, i) => { return i * cellWidth; })
            .attr('y', 0)
            .style('text-anchor', 'start')
            .attr('transform', 'translate(' + cellWidth / 8 + ', -6)')
            .attr('class', (d, i) => { return ((i >= 7 && i <= 16) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });

    if (timeframe == "historic") {
    	let timeLabels = svg.selectAll('.timeLabel')
          .data(times)
          .enter().append('text')
            .text((d) => { return d; })
            .attr('x', 0)
            .attr('y', (d, i) => { return i * cellHeight; })
            .style('text-anchor', 'end')
            .attr('transform', 'translate(-6,' + cellWidth / 1.5 + ')')
            .attr('class', (d, i) => { return ((i >= 0 && i <= 4) ? 'timeLabel mono axis axis-workday' : 'timeLabel mono axis'); });
    }	

    let heatmapChart = function (error, data) {
        let colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, (d) => { return d.value; })])
              .range(colors);

        let cards = svg.selectAll('.day')
              .data(data, (d) => { return `${d.period}:${d.day}`; });

        cards.append('title');

        cards.enter().append('rect')
              .attr('x', (d) => { return (d.day - 1) * cellWidth; })
              .attr('y', (d) => { return (d.period - 1) * cellHeight; })
              .attr('rx', 4)
              .attr('ry', 4)
              .attr('class', 'day bordered')
              .attr('width', cellWidth)
              .attr('height', cellHeight)
              .style('fill', colors[0]);

        cards.transition().duration(500)
              .style('fill', (d) => { return colorScale(d.value); });
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
            .attr('height', cellHeight / 2)
            .style('fill', (d, i) => { return colors[i]; });

        legend.append('text')
            .attr('class', 'mono')
            .text((d) => { return '≥ ' + Math.round(d); })
            .attr('x', (d, i) => { return legendElementWidth * i; })
            .attr('y', height + cellHeight);

        legend.exit().remove();
      };

  heatmapChart(false, dataset);

//       var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
//        .data(datasets);
//
//       datasetpicker.enter()
//        .append("input")
//        .attr("value", function(d){ return "Dataset " + d })
//        .attr("type", "button")
//        .attr("class", "dataset-button")
//        .on("click", function(d) {
//          //heatmapChart(d);
//        });

  }

  render() {
    console.log(this.state);
	  return (
      <div id="chart">
      	<span id="historic">
      		{this.drawHeatmap("historic")}
      	</span>
      	<span id="predicted">
      		{this.drawHeatmap("predicted")}
      	</span>
      </div>
    );
  }
}
