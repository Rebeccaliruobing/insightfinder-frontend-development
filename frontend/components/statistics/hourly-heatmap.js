import React, {PropTypes as T} from 'react';
import d3 from 'd3';

export default class HourlyHeatmap extends React.Component {
	static defaultProps = { dataset: [], duration: '7d' };
	drawHeatmap() {
      var margin = { top: 20, right: 50, bottom: 25, left: 50 },
          width = 624 - margin.left - margin.right,
          height = 645 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4",
										"#1d91c0","#225ea8","#253494","#081d58"], 
										// alternatively colorbrewer.YlGnBu[9]
          days = ["11/25", "11/26", "11/27", "11/28", "11/29", "11/30", "12/1", 									"12/2", "12/3", "12/4", "12/5", "12/6", "12/7", "12/8"],
          times = ["12a", "", "", "3a", "", "", "6a", "", "", "9a",
				 						"", "", "12p", "", "", "3p", "", "", "6p", 
										"", "", "9p", "", ""],
          datasets = ["Anomalies", "Anomaly Events"],
					datasetObject = [ [ 1, 1, 16 ], [ 1, 2, 20 ], [ 1, 3, 0 ], [ 1, 4, 0 ], [ 1, 5, 0 ], [ 1, 6, 2 ], [ 1, 7, 0 ], [ 1, 8, 9 ], [ 1, 9, 25 ], [ 1, 10, 49 ], [ 1, 11, 57 ], [ 1, 12, 61 ], [ 1, 13, 37 ], [ 1, 14, 66 ], [ 1, 15, 70 ], [ 1, 16, 55 ], [ 1, 17, 51 ], [ 1, 18, 55 ], [ 1, 19, 17 ], [ 1, 20, 20 ], [ 1, 21, 9 ], [ 1, 22, 4 ], [ 1, 23, 0 ], [ 1, 24, 12 ], [ 2, 1, 6 ], [ 2, 2, 2 ], [ 2, 3, 0 ], [ 2, 4, 0 ], [ 2, 5, 0 ], [ 2, 6, 2 ], [ 2, 7, 4 ], [ 2, 8, 11 ], [ 2, 9, 28 ], [ 2, 10, 49 ], [ 2, 11, 51 ], [ 2, 12, 47 ], [ 2, 13, 38 ], [ 2, 14, 65 ], [ 2, 15, 60 ], [ 2, 16, 50 ], [ 2, 17, 65 ], [ 2, 18, 50 ], [ 2, 19, 22 ], [ 2, 20, 11 ], [ 2, 21, 12 ], [ 2, 22, 9 ], [ 2, 23, 0 ], [ 2, 24, 13 ], [ 3, 1, 5 ], [ 3, 2, 8 ], [ 3, 3, 8 ], [ 3, 4, 0 ], [ 3, 5, 0 ], [ 3, 6, 2 ], [ 3, 7, 5 ], [ 3, 8, 12 ], [ 3, 9, 34 ], [ 3, 10, 43 ], [ 3, 11, 54 ], [ 3, 12, 44 ], [ 3, 13, 40 ], [ 3, 14, 48 ], [ 3, 15, 54 ], [ 3, 16, 59 ], [ 3, 17, 60 ], [ 3, 18, 51 ], [ 3, 19, 21 ], [ 3, 20, 16 ], [ 3, 21, 9 ], [ 3, 22, 5 ], [ 3, 23, 4 ], [ 3, 24, 7 ], [ 4, 1, 0 ], [ 4, 2, 0 ], [ 4, 3, 0 ], [ 4, 4, 0 ], [ 4, 5, 0 ], [ 4, 6, 2 ], [ 4, 7, 4 ], [ 4, 8, 13 ], [ 4, 9, 26 ], [ 4, 10, 58 ], [ 4, 11, 61 ], [ 4, 12, 59 ], [ 4, 13, 53 ], [ 4, 14, 54 ], [ 4, 15, 64 ], [ 4, 16, 55 ], [ 4, 17, 52 ], [ 4, 18, 53 ], [ 4, 19, 18 ], [ 4, 20, 3 ], [ 4, 21, 9 ], [ 4, 22, 12 ], [ 4, 23, 2 ], [ 4, 24, 8 ], [ 5, 1, 2 ], [ 5, 2, 0 ], [ 5, 3, 8 ], [ 5, 4, 2 ], [ 5, 5, 0 ], [ 5, 6, 2 ], [ 5, 7, 4 ], [ 5, 8, 14 ], [ 5, 9, 31 ], [ 5, 10, 48 ], [ 5, 11, 46 ], [ 5, 12, 50 ], [ 5, 13, 66 ], [ 5, 14, 54 ], [ 5, 15, 56 ], [ 5, 16, 67 ], [ 5, 17, 54 ], [ 5, 18, 23 ], [ 5, 19, 14 ], [ 5, 20, 6 ], [ 5, 21, 8 ], [ 5, 22, 7 ], [ 5, 23, 0 ], [ 5, 24, 8 ], [ 6, 1, 2 ], [ 6, 2, 0 ], [ 6, 3, 2 ], [ 6, 4, 0 ], [ 6, 5, 0 ], [ 6, 6, 0 ], [ 6, 7, 4 ], [ 6, 8, 8 ], [ 6, 9, 8 ], [ 6, 10, 6 ], [ 6, 11, 14 ], [ 6, 12, 12 ], [ 6, 13, 9 ], [ 6, 14, 14 ], [ 6, 15, 0 ], [ 6, 16, 4 ], [ 6, 17, 7 ], [ 6, 18, 6 ], [ 6, 19, 0 ], [ 6, 20, 0 ], [ 6, 21, 0 ], [ 6, 22, 0 ], [ 6, 23, 0 ], [ 6, 24, 0 ], [ 7, 1, 7 ], [ 7, 2, 6 ], [ 7, 3, 0 ], [ 7, 4, 0 ], [ 7, 5, 0 ], [ 7, 6, 0 ], [ 7, 7, 0 ], [ 7, 8, 0 ], [ 7, 9, 0 ], [ 7, 10, 0 ], [ 7, 11, 2 ], [ 7, 12, 2 ], [ 7, 13, 5 ], [ 7, 14, 6 ], [ 7, 15, 0 ], [ 7, 16, 4 ], [ 7, 17, 0 ], [ 7, 18, 2 ], [ 7, 19, 10 ], [ 7, 20, 7 ], [ 7, 21, 0 ], [ 7, 22, 19 ], [ 7, 23, 9 ], [ 7, 24, 4 ] 
];

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

			// "dataset" is a placeholder
      var heatmapChart = function(datasetObject) {
				// Removed TSV file loader/parser
				datasetObject.forEach(function(d) {
					return {
						day: +d.day,
						hour: +d.hour,
						value: +d.value
					};
				},
        function(error, datasetObject) {
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.hour - 1) * gridSize; })
              .attr("y", function(d) { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });  
      };

      heatmapChart(datasetObject);
      
      var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
        .data(datasets);

      datasetpicker.enter()
        .append("input")
        .attr("value", function(d){ return "Dataset " + d })
        .attr("type", "button")
        .attr("class", "dataset-button")
        .on("click", function(d) {
          heatmapChart(d);
        });

	}

	render() {
	  return (
    	<div id="chart">
				{this.drawHeatmap()}
			</div>
		)
	}
}
