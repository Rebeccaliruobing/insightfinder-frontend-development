import React, {PropTypes as T} from 'react';
import d3 from 'd3';
import HourlyGridScript from './hourly-grid.js';

export default class HourlyHeatmap extends React.Component {
	static defaultProps = { dataset: [], duration: '7d' };
	prepareData() {
		$('.className').append('<script type="text/javascript">'+{HourlyGridScript}+'</script>');
	}

	render() {
	  return (
    	<div id="chart">
				$('.className').append('<script type="text/javascript">'+{HourlyGridScript}+'</script>');
			</div>
		)
	}
}
