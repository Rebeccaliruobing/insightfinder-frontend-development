import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import { calculateRGBByAnomalyScore } from '../utils';

class HourlyHeatmap extends React.Component {

  constructor(props) {
    super(props);

    this.$container = null;
    this.cellWidth = 24;
    this.cellHeight = 24;
    this.hoursCount = 24;
    this.labelXHeight = 14;
    this.labelYWidth = 40;
    this.chartMargin = 10;

    this.state = {
      faux: null,
    };
  }

  componentDidMount() {
    this.displayData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.displayData(nextProps);
  }

  @autobind
  setHeatmap(dataset, props) {
    const width = this.$container.width();
    const height = this.$container.height();

    const { statSelector } = props;
    const { data, timeLabels, dayLabels } = dataset;
    console.log(dataset);

    const faux = ReactFauxDOM.createElement('svg');
    const svg = d3.select(faux)
      .attr({ width, height, viewBox: `0 0 ${width} ${height}` })
      .append('g');

    // Time labels
    svg.append('g')
      .selectAll('.timeLabel')
      .data(timeLabels)
      .enter()
      .append('text')
      .text(d => d)
      .attr('class', 'label-x')
      .attr('x', (d, i) => ((i + 0.5) * this.cellWidth) + this.labelYWidth)
      .attr('text-anchor', 'middle')
      .attr('y', 10)
      ;

    // Day labels
    svg.append('g')
      .selectAll('.dayLabel')
      .data(dayLabels)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', 0)
      .attr('class', 'label-y')
      .attr('y', (d, i) => ((i + 0.75) * this.cellHeight) + this.labelXHeight)
      ;

    // data
    svg.append('g')
      .selectAll('.hour')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => (d.x * this.cellWidth) + this.labelYWidth + 0.5)
      .attr('y', d => (d.y * this.cellHeight) + this.labelXHeight + 0.5)
      .attr('width', this.cellWidth - 1)
      .attr('height', this.cellHeight - 1)
      .attr('fill', d => calculateRGBByAnomalyScore(statSelector(d)))
      ;

    this.setState({ faux: faux.toReact() });
  }

  @autobind
  displayData(props) {
    const dataset = props.dataset;
    if (dataset && !_.isEmpty(dataset) && this.$container) {
      this.setHeatmap(dataset, props);
    }
  }

  render() {
    const { faux } = this.state;
    const { style, numberOfDays } = this.props;
    const width = (this.hoursCount * this.cellHeight) + this.labelYWidth + this.chartMargin;
    const height = ((numberOfDays || 0) * this.cellHeight) + this.labelXHeight;

    return (
      <div className="hourly-heatmap d3-container" style={style}>
        <div
          style={{ width, height, margin: 'auto' }}
          ref={(c) => { this.$container = $(c); }}
        >{faux}</div>
      </div>
    );
  }
}

export default HourlyHeatmap;
