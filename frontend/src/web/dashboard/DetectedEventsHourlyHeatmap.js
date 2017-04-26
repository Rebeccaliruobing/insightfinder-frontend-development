import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import Measure from 'react-measure';
import { State } from '../../common/types';

class DetectedEventsHourlyHeatmapCore extends React.Component {

  @autobind
  handleMeasure(dimensions) {
    console.log(dimensions);
  }

  render() {
    return (
      <Measure onMeasure={this.handleMeasure}>
        <div>
          <h3>Detected Events</h3>
          <div className="hourly-heatmap d3-container">
          </div>
        </div>
      </Measure>
    );
  }
}

const DetectedEventsHourlyHeatmap = injectIntl(DetectedEventsHourlyHeatmapCore);
export default connect(
  (state: State) => {
    return { };
  },
  {},
)(DetectedEventsHourlyHeatmap);
