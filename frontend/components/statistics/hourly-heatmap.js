import React from 'react';
import d3 from 'd3';

class HourlyHeatmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { dataset } = this.props;
    console.log(dataset);
    return (
      <div>good</div>
    );
  }
}

export default HourlyHeatmap;
