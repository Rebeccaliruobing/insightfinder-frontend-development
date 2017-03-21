import React, { Element } from 'react';
import $ from 'jquery';
import { omit, min, max } from 'lodash';
import d3 from 'd3';
import { autobind } from 'core-decorators';
import ReactFauxDOM from 'react-faux-dom';

type Props = {
  dataset: Array,
  countPerRow: number,
  colorCalibration: Array,
  valueAccessor: Function,
};

class Heatmap extends React.Component {
  props: Props;

  static defaultProps = {
    dataset: [],
    countPerRow: 1,
    colorCalibration: ['red', 'yellow', 'blue'],
    valueAccessor: d => d,
  };

  constructor(props) {
    super(props);
    this.$container = null;

    this.state = {
      chart: null,
    };
  }

  componentDidMount() {
    this.displayData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.displayData(nextProps);
  }

  @autobind
  displayData(props) {
    const dataset = props.dataset;
    if (dataset && this.$container) {
      this.setHeatmap(dataset, props);
    }
  }

  @autobind
  setHeatmap(dataset, props) {
    const width = this.$container.width();
    const height = this.$container.height();
    const { countPerRow, colorCalibration, valueAccessor } = props;
    const cellSize = width / countPerRow;

    const chart = ReactFauxDOM.createElement('svg');
    const heatmap = d3.select(chart)
      .attr({ width, height, viewBox: `0 0 ${width} ${height}` })
      .append('g');
    const rect = heatmap.selectAll('rect')
      .data(dataset)
      .enter().append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', (d, idx) => (idx % countPerRow) * cellSize)
      .attr('y', (d, idx) => (Math.floor(idx / countPerRow) * cellSize))
      .attr('fill', '#fff');
    const dmax = max(dataset);
    const dmin = min(dataset);
    const colorScale = d3.scale.linear()
      .domain([dmin, (dmax + dmin) / 2, dmax])
      .range(colorCalibration);

    rect
      .filter(d => d >= 0)
      .attr('fill', d => colorScale(valueAccessor(d)));

    this.setState({ chart: chart.toReact() });
  }

  render() {
    const { dataset, countPerRow, colorCalibration, valueAccessor, ...rest } = this.props;
    const { chart } = this.state;

    return (
      <div className="fui heatmap" ref={(c) => { this.$container = $(c); }} {...rest}>
        {chart}
      </div>
    );
  }
}

export default Heatmap;
