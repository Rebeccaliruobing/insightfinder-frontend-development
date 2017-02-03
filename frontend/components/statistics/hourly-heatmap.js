import React, { PropTypes as T } from 'react';
import d3 from 'd3';

export default class HourlyHeatmap extends React.Component {
  static defaultProps = { dataset: [], duration:7, endTime: new Date().getTime(), period:3 };

  drawHeatmap(timeframe="historic",duration=7,dataset) {
	console.log("dataset['data']: "+JSON.stringify(dataset['data']));
/*	if (dataset['data'] === undefined) {
		console.log("Heatmap dataset is undefined.");
		return;
	} else if (dataset['data'] === {}) {
		console.log("Heatmap dataset is empty.");
		return;
	} else {
		for (var key in dataset) {
			console.log("dataset["+key+"] = "+dataset[key]);
		}
	}

	console.log("timeframe: "+timeframe);
	console.log("duration: "+duration);
	console.log("dataset: "+dataset);
*/
	let margin = { top: 50, right: 0, bottom: 30, left: 50 },
        width = 540 - margin.left - margin.right,
        height = 740 - margin.top - margin.bottom,
        buckets = 7,
        cellHeight = 80,
        cellWidth = Math.floor(width / duration),
        legendElementWidth = Math.floor(width / buckets),
        historicColors = ['#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        predictedColors = ['#c7b4e9', '#7fbbcd', '#41c4b6', '#1dc091', '#22a85e', '#259434', '#08581d'],
        colors = historicColors,  // Setting default color scheme
        times = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p']; // FIXME : 'times' is hardcoded and should be dynamic by period
    let days = dataset['dayLabels'];
    void((days == undefined)&&(days = []));
	// Remove the children if exist
    d3.select('#'+timeframe+' > svg').remove();

    if (days.length > 0) {
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
	            .style('text-anchor', 'middle')
	            .attr('transform', 'translate(' + cellWidth / 2 + ', -6)')
	            .attr('class', (d, i) => { return ((i >= 7 && i <= 16) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });
	
	    if (timeframe == "historic") {
	    	let timeLabels = svg.selectAll('.timeLabel')
	          .data(times)
	          .enter().append('text')
	            .text((d) => { return d; })
	            .attr('x', 0)
	            .attr('y', (d, i) => { return i * cellHeight; })
	            .style('text-anchor', 'end')
	            .attr('transform', 'translate(-6,14)')  // Vertical offset
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
	              .style('fill', colors[0])
	              .on('click', function(d,i){alert("Day Index: "+d.day+"\nPeriod Index: "+d.period+"\nValue: "+d.value);});
	
	        cards.transition().duration(1500)
	              .style('fill', (d) => { return colorScale(d.value); });
	        cards.select('title').text((d) => { console.log(d.value); return d.value; });
	
	        cards.exit().remove();
	
	        let legend = svg.selectAll('.legend')
	             .data([0].concat(colorScale.quantiles()), (d) => { return d; });
	
	        legend.enter().append('g')
	              .attr('class', 'legend');
	
	        legend.append('rect')
	            .attr('x', (d, i) => { return legendElementWidth * i; })
	            .attr('y', height - 10)
	            .attr('width', legendElementWidth)
	            .attr('height', 20)
	            .style('fill', (d, i) => { return colors[i]; });
	
	        legend.append('text')
	            .attr('class', 'mono')
	            .text((d) => { return '≥ ' + Math.round(d); })
	            .style('text-anchor', 'middle')
	            .attr('x', (d, i) => { return (legendElementWidth * i) + (.5 * legendElementWidth); })
	            .attr('y', 680 );
	
	        legend.exit().remove();
	      };
	      
	    heatmapChart(false, dataset);
    } // if
  } // drawHeatmap

  render() {
	  let {duration}=this.props;
	  let {endTime}=this.props;
	  let {dataset}=this.props;
	  if (dataset === undefined || dataset === {}) {
		  console.log("hourly-heatmap.js:render()   DATASET IS UNDEFINED");
		  return (
				  <div>	
				  	<h3>No Anomaly Events detected during previous {{duration}} days.</h3>
				  </div>
				  );
	  } else {
		  console.log("hourly-heatmap.js:render()   dataset: "+dataset.toString());
		  return (
		      <div id="chart">
		      	<span id="historic">
		      		{this.drawHeatmap("historic",duration,dataset)}
		      	</span>
		      </div>
		  );
	  }
  } // render
} // export