import React, {PropTypes as T} from 'react';
import d3 from 'd3';

export default class HourlyHeatmap extends React.Component {
	static defaultProps = { data: [], duration: '7d' };

	drawHeatmap() {
      var margin = { top: 50, right: 0, bottom: 34, left: 50 },
          width = 540 - margin.left - margin.right,
          height = 940 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 14),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4",
										"#1d91c0","#225ea8","#253494","#081d58"], 
										// alternatively colorbrewer.YlGnBu[9]
          days = ["11/25", "11/26", "11/27", "11/28", "11/29", "11/30", 
									"12/1", "12/2", "12/3", "12/4", "12/5", 
									"12/6", "12/7", "12/8"],
          times = ["12a", "", "", "3a", "", "", "6a", "", "", "9a",
				 						"", "", "12p", "", "", "3p", "", "", "6p", 
										"", "", "9p", "", ""],
          datasets = ["Anomalies"],
					dataset = [ { "day":1, "hour":1, "value":16 }, { "day":1, "hour":2, "value":20 }, { "day":1, "hour":3, "value":0 }, { "day":1, "hour":4, "value":0 }, { "day":1, "hour":5, "value":0 }, { "day":1, "hour":6, "value":2 }, { "day":1, "hour":7, "value":0 }, { "day":1, "hour":8, "value":9 }, { "day":1, "hour":9, "value":25 }, { "day":1, "hour":10, "value":49 }, { "day":1, "hour":11, "value":57 }, { "day":1, "hour":12, "value":61 }, { "day":1, "hour":13, "value":37 }, { "day":1, "hour":14, "value":66 }, { "day":1, "hour":15, "value":70 }, { "day":1, "hour":16, "value":55 }, { "day":1, "hour":17, "value":51 }, { "day":1, "hour":18, "value":55 }, { "day":1, "hour":19, "value":17 }, { "day":1, "hour":20, "value":20 }, { "day":1, "hour":21, "value":9 }, { "day":1, "hour":22, "value":4 }, { "day":1, "hour":23, "value":0 }, { "day":1, "hour":24, "value":12 }, { "day":2, "hour":1, "value":6 }, { "day":2, "hour":2, "value":2 }, { "day":2, "hour":3, "value":0 }, { "day":2, "hour":4, "value":0 }, { "day":2, "hour":5, "value":0 }, { "day":2, "hour":6, "value":2 }, { "day":2, "hour":7, "value":4 }, { "day":2, "hour":8, "value":11 }, { "day":2, "hour":9, "value":28 }, { "day":2, "hour":10, "value":49 }, { "day":2, "hour":11, "value":51 }, { "day":2, "hour":12, "value":47 }, { "day":2, "hour":13, "value":38 }, { "day":2, "hour":14, "value":65 }, { "day":2, "hour":15, "value":60 }, { "day":2, "hour":16, "value":50 }, { "day":2, "hour":17, "value":65 }, { "day":2, "hour":18, "value":50 }, { "day":2, "hour":19, "value":22 }, { "day":2, "hour":20, "value":11 }, { "day":2, "hour":21, "value":12 }, { "day":2, "hour":22, "value":9 }, { "day":2, "hour":23, "value":0 }, { "day":2, "hour":24, "value":13 }, { "day":3, "hour":1, "value":5 }, { "day":3, "hour":2, "value":8 }, { "day":3, "hour":3, "value":8 }, { "day":3, "hour":4, "value":0 }, { "day":3, "hour":5, "value":0 }, { "day":3, "hour":6, "value":2 }, { "day":3, "hour":7, "value":5 }, { "day":3, "hour":8, "value":12 }, { "day":3, "hour":9, "value":34 }, { "day":3, "hour":10, "value":43 }, { "day":3, "hour":11, "value":54 }, { "day":3, "hour":12, "value":44 }, { "day":3, "hour":13, "value":40 }, { "day":3, "hour":14, "value":48 }, { "day":3, "hour":15, "value":54 }, { "day":3, "hour":16, "value":59 }, { "day":3, "hour":17, "value":60 }, { "day":3, "hour":18, "value":51 }, { "day":3, "hour":19, "value":21 }, { "day":3, "hour":20, "value":16 }, { "day":3, "hour":21, "value":9 }, { "day":3, "hour":22, "value":5 }, { "day":3, "hour":23, "value":4 }, { "day":3, "hour":24, "value":7 }, { "day":4, "hour":1, "value":0 }, { "day":4, "hour":2, "value":0 }, { "day":4, "hour":3, "value":0 }, { "day":4, "hour":4, "value":0 }, { "day":4, "hour":5, "value":0 }, { "day":4, "hour":6, "value":2 }, { "day":4, "hour":7, "value":4 }, { "day":4, "hour":8, "value":13 }, { "day":4, "hour":9, "value":26 }, { "day":4, "hour":10, "value":58 }, { "day":4, "hour":11, "value":61 }, { "day":4, "hour":12, "value":59 }, { "day":4, "hour":13, "value":53 }, { "day":4, "hour":14, "value":54 }, { "day":4, "hour":15, "value":64 }, { "day":4, "hour":16, "value":55 }, { "day":4, "hour":17, "value":52 }, { "day":4, "hour":18, "value":53 }, { "day":4, "hour":19, "value":18 }, { "day":4, "hour":20, "value":3 }, { "day":4, "hour":21, "value":9 }, { "day":4, "hour":22, "value":12 }, { "day":4, "hour":23, "value":2 }, { "day":4, "hour":24, "value":8 }, { "day":5, "hour":1, "value":2 }, { "day":5, "hour":2, "value":0 }, { "day":5, "hour":3, "value":8 }, { "day":5, "hour":4, "value":2 }, { "day":5, "hour":5, "value":0 }, { "day":5, "hour":6, "value":2 }, { "day":5, "hour":7, "value":4 }, { "day":5, "hour":8, "value":14 }, { "day":5, "hour":9, "value":31 }, { "day":5, "hour":10, "value":48 }, { "day":5, "hour":11, "value":46 }, { "day":5, "hour":12, "value":50 }, { "day":5, "hour":13, "value":66 }, { "day":5, "hour":14, "value":54 }, { "day":5, "hour":15, "value":56 }, { "day":5, "hour":16, "value":67 }, { "day":5, "hour":17, "value":54 }, { "day":5, "hour":18, "value":23 }, { "day":5, "hour":19, "value":14 }, { "day":5, "hour":20, "value":6 }, { "day":5, "hour":21, "value":8 }, { "day":5, "hour":22, "value":7 }, { "day":5, "hour":23, "value":0 }, { "day":5, "hour":24, "value":8 }, { "day":6, "hour":1, "value":2 }, { "day":6, "hour":2, "value":0 }, { "day":6, "hour":3, "value":2 }, { "day":6, "hour":4, "value":0 }, { "day":6, "hour":5, "value":0 }, { "day":6, "hour":6, "value":0 }, { "day":6, "hour":7, "value":4 }, { "day":6, "hour":8, "value":8 }, { "day":6, "hour":9, "value":8 }, { "day":6, "hour":10, "value":6 }, { "day":6, "hour":11, "value":14 }, { "day":6, "hour":12, "value":12 }, { "day":6, "hour":13, "value":9 }, { "day":6, "hour":14, "value":14 }, { "day":6, "hour":15, "value":0 }, { "day":6, "hour":16, "value":4 }, { "day":6, "hour":17, "value":7 }, { "day":6, "hour":18, "value":6 }, { "day":6, "hour":19, "value":0 }, { "day":6, "hour":20, "value":0 }, { "day":6, "hour":21, "value":0 }, { "day":6, "hour":22, "value":0 }, { "day":6, "hour":23, "value":0 }, { "day":6, "hour":24, "value":0 }, { "day":7, "hour":1, "value":7 }, { "day":7, "hour":2, "value":6 }, { "day":7, "hour":3, "value":0 }, { "day":7, "hour":4, "value":0 }, { "day":7, "hour":5, "value":0 }, { "day":7, "hour":6, "value":0 }, { "day":7, "hour":7, "value":0 }, { "day":7, "hour":8, "value":0 }, { "day":7, "hour":9, "value":0 }, { "day":7, "hour":10, "value":0 }, { "day":7, "hour":11, "value":2 }, { "day":7, "hour":12, "value":2 }, { "day":7, "hour":13, "value":5 }, { "day":7, "hour":14, "value":6 }, { "day":7, "hour":15, "value":0 }, { "day":7, "hour":16, "value":4 }, { "day":7, "hour":17, "value":0 }, { "day":7, "hour":18, "value":2 }, { "day":7, "hour":19, "value":10 }, { "day":7, "hour":20, "value":7 }, { "day":7, "hour":21, "value":0 }, { "day":7, "hour":22, "value":19 }, { "day":7, "hour":23, "value":9 }, { "day":7, "hour":24, "value":4 }, { "day":8, "hour":1, "value":16 }, { "day":8, "hour":2, "value":20 }, { "day":8, "hour":3, "value":0 }, { "day":8, "hour":4, "value":0 }, { "day":8, "hour":5, "value":0 }, { "day":8, "hour":6, "value":2 }, { "day":8, "hour":7, "value":0 }, { "day":8, "hour":8, "value":9 }, { "day":8, "hour":9, "value":25 }, { "day":8, "hour":10, "value":49 }, { "day":8, "hour":11, "value":57 }, { "day":8, "hour":12, "value":61 }, { "day":8, "hour":13, "value":37 }, { "day":8, "hour":14, "value":66 }, { "day":8, "hour":15, "value":70 }, { "day":8, "hour":16, "value":55 }, { "day":8, "hour":17, "value":51 }, { "day":8, "hour":18, "value":55 }, { "day":8, "hour":19, "value":17 }, { "day":8, "hour":20, "value":20 }, { "day":8, "hour":21, "value":9 }, { "day":8, "hour":22, "value":4 }, { "day":8, "hour":23, "value":0 }, { "day":8, "hour":24, "value":12 }, { "day":9, "hour":1, "value":6 }, { "day":9, "hour":2, "value":2 }, { "day":9, "hour":3, "value":0 }, { "day":9, "hour":4, "value":0 }, { "day":9, "hour":5, "value":0 }, { "day":9, "hour":6, "value":2 }, { "day":9, "hour":7, "value":4 }, { "day":9, "hour":8, "value":11 }, { "day":9, "hour":9, "value":28 }, { "day":9, "hour":10, "value":49 }, { "day":9, "hour":11, "value":51 }, { "day":9, "hour":12, "value":47 }, { "day":9, "hour":13, "value":38 }, { "day":9, "hour":14, "value":65 }, { "day":9, "hour":15, "value":60 }, { "day":9, "hour":16, "value":50 }, { "day":9, "hour":17, "value":65 }, { "day":9, "hour":18, "value":50 }, { "day":9, "hour":19, "value":22 }, { "day":9, "hour":20, "value":11 }, { "day":9, "hour":21, "value":12 }, { "day":9, "hour":22, "value":9 }, { "day":9, "hour":23, "value":0 }, { "day":9, "hour":24, "value":13 }, { "day":10, "hour":1, "value":5 }, { "day":10, "hour":2, "value":8 }, { "day":10, "hour":3, "value":8 }, { "day":10, "hour":4, "value":0 }, { "day":10, "hour":5, "value":0 }, { "day":10, "hour":6, "value":2 }, { "day":10, "hour":7, "value":5 }, { "day":10, "hour":8, "value":12 }, { "day":10, "hour":9, "value":34 }, { "day":10, "hour":10, "value":43 }, { "day":10, "hour":11, "value":54 }, { "day":10, "hour":12, "value":44 }, { "day":10, "hour":13, "value":40 }, { "day":10, "hour":14, "value":48 }, { "day":10, "hour":15, "value":54 }, { "day":10, "hour":16, "value":59 }, { "day":10, "hour":17, "value":60 }, { "day":10, "hour":18, "value":51 }, { "day":10, "hour":19, "value":21 }, { "day":10, "hour":20, "value":16 }, { "day":10, "hour":21, "value":9 }, { "day":10, "hour":22, "value":5 }, { "day":10, "hour":23, "value":4 }, { "day":10, "hour":24, "value":7 }, { "day":11, "hour":1, "value":0 }, { "day":11, "hour":2, "value":0 }, { "day":11, "hour":3, "value":0 }, { "day":11, "hour":4, "value":0 }, { "day":11, "hour":5, "value":0 }, { "day":11, "hour":6, "value":2 }, { "day":11, "hour":7, "value":4 }, { "day":11, "hour":8, "value":13 }, { "day":11, "hour":9, "value":26 }, { "day":11, "hour":10, "value":58 }, { "day":11, "hour":11, "value":61 }, { "day":11, "hour":12, "value":59 }, { "day":11, "hour":13, "value":53 }, { "day":11, "hour":14, "value":54 }, { "day":11, "hour":15, "value":64 }, { "day":11, "hour":16, "value":55 }, { "day":11, "hour":17, "value":52 }, { "day":11, "hour":18, "value":53 }, { "day":11, "hour":19, "value":18 }, { "day":11, "hour":20, "value":3 }, { "day":11, "hour":21, "value":9 }, { "day":11, "hour":22, "value":12 }, { "day":11, "hour":23, "value":2 }, { "day":11, "hour":24, "value":8 }, { "day":12, "hour":1, "value":2 }, { "day":12, "hour":2, "value":0 }, { "day":12, "hour":3, "value":8 }, { "day":12, "hour":4, "value":2 }, { "day":12, "hour":5, "value":0 }, { "day":12, "hour":6, "value":2 }, { "day":12, "hour":7, "value":4 }, { "day":12, "hour":8, "value":14 }, { "day":12, "hour":9, "value":31 }, { "day":12, "hour":10, "value":48 }, { "day":12, "hour":11, "value":46 }, { "day":12, "hour":12, "value":50 }, { "day":12, "hour":13, "value":66 }, { "day":12, "hour":14, "value":54 }, { "day":12, "hour":15, "value":56 }, { "day":12, "hour":16, "value":67 }, { "day":12, "hour":17, "value":54 }, { "day":12, "hour":18, "value":23 }, { "day":12, "hour":19, "value":14 }, { "day":12, "hour":20, "value":6 }, { "day":12, "hour":21, "value":8 }, { "day":12, "hour":22, "value":7 }, { "day":12, "hour":23, "value":0 }, { "day":12, "hour":24, "value":8 }, { "day":13, "hour":1, "value":2 }, { "day":13, "hour":2, "value":0 }, { "day":13, "hour":3, "value":2 }, { "day":13, "hour":4, "value":0 }, { "day":13, "hour":5, "value":0 }, { "day":13, "hour":6, "value":0 }, { "day":13, "hour":7, "value":4 }, { "day":13, "hour":8, "value":8 }, { "day":13, "hour":9, "value":8 }, { "day":13, "hour":10, "value":6 }, { "day":13, "hour":11, "value":14 }, { "day":13, "hour":12, "value":12 }, { "day":13, "hour":13, "value":9 }, { "day":13, "hour":14, "value":14 }, { "day":13, "hour":15, "value":0 }, { "day":13, "hour":16, "value":4 }, { "day":13, "hour":17, "value":7 }, { "day":13, "hour":18, "value":6 }, { "day":13, "hour":19, "value":0 }, { "day":13, "hour":20, "value":0 }, { "day":13, "hour":21, "value":0 }, { "day":13, "hour":22, "value":0 }, { "day":13, "hour":23, "value":0 }, { "day":13, "hour":24, "value":0 }, { "day":14, "hour":1, "value":7 }, { "day":14, "hour":2, "value":6 }, { "day":14, "hour":3, "value":0 }, { "day":14, "hour":4, "value":0 }, { "day":14, "hour":5, "value":0 }, { "day":14, "hour":6, "value":0 }, { "day":14, "hour":7, "value":0 }, { "day":14, "hour":8, "value":0 }, { "day":14, "hour":9, "value":0 }, { "day":14, "hour":10, "value":0 }, { "day":14, "hour":11, "value":2 }, { "day":14, "hour":12, "value":2 }, { "day":14, "hour":13, "value":5 }, { "day":14, "hour":14, "value":6 }, { "day":14, "hour":15, "value":0 }, { "day":14, "hour":16, "value":4 }, { "day":14, "hour":17, "value":0 }, { "day":14, "hour":18, "value":2 }, { "day":14, "hour":19, "value":10 }, { "day":14, "hour":20, "value":7 }, { "day":14, "hour":21, "value":0 }, { "day":14, "hour":22, "value":19 }, { "day":14, "hour":23, "value":9 }, { "day":14, "hour":24, "value":4 } ];

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
						//  What anchor point does text-anchor support?  left?  begin?  VVVVVVVVVVVV
            .style("text-anchor", "")
            .attr("transform", "translate(" + gridSize / 4 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "timeLabel mono axis axis-workday" : "timeLabel mono axis"); });

      var heatmapChart = function(error, data) {
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);
					
          var cards = svg.selectAll(".day")
              .data(data, function(d) {return d.hour+':'+d.day;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.day - 1) * gridSize; })
              .attr("y", function(d) { return (d.hour - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "day bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1500)
              .style("fill", function(d) { return colorScale(d.value); });
					//  Is this supposed to build an event handler???   VVVVVVVVVVVV
          cards.select("title").text(function(d) {console.log(d.value); return d.value; });
          
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

      };

      heatmapChart(false, dataset);
      
      //var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      //  .data(datasets);

      //datasetpicker.enter()
      //  .append("input")
      //  .attr("value", function(d){ return "Dataset " + d })
      //  .attr("type", "button")
      //  .attr("class", "dataset-button")
      //  .on("click", function(d) {
      //    //heatmapChart(d);
      //  });

	}

	render() {
		console.log("In render() function");
	  return (
    	<div id="chart">
				{this.drawHeatmap()}
			</div>
		)
	}
}
