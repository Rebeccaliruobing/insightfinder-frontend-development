import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const defaultSize = 132;

const dataPropTypes = React.PropTypes.arrayOf(React.PropTypes.shape({
  value: React.PropTypes.number,
  colIndex: React.PropTypes.number,
  rowIndex: React.PropTypes.number,
}));

class HeatMap extends React.Component {
  static propTypes:{
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    itemSize: React.PropTypes.number,
    duration: React.PropTypes.number,
    colorCalibration: React.PropTypes.array,
    data: dataPropTypes
    };

  static defaultProps = {
    width: defaultSize,
    height: defaultSize,
    itemSize: defaultSize / 24,
    cellSize: defaultSize / 24 - 1,
    margin: {top: 0, right: 0, bottom: 0, left: 0},
    colorCalibration: [
      "red", "yellow", "blue"
    ],
    duration: 100
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className={cx('heatmap inlin-block')} style={{backgroundColor: '#FFF'}}>
        <svg ref={this._refSvg.bind(this)}></svg>
      </div>
    )
  }

  _refSvg(svg) {
    setTimeout(()=> {

      let {width, height, margin, itemSize, cellSize, data, colorCalibration, duration} = this.props;
      var dayOffset = 0;
      this.svg = d3.select(ReactDOM.findDOMNode(svg));
      var heatmap = this.svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      var rect = heatmap.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', (item) =>itemSize * item.colIndex)
        .attr('y', (item) =>itemSize * item.rowIndex)
        .attr('fill', '#ffffff');

      var flatArray = data.map((item)=>parseFloat(item.value));
      var dataMax = Math.max.apply(Math, data.map((item)=>parseFloat(item.value)));
      var dataMin = Math.min.apply(Math, data.map((item)=>parseFloat(item.value)));
      var colorScale = d3.scale.linear().domain([dataMin, (dataMin+dataMax)/2, dataMax]).range(["red", "yellow", "blue"]);

      rect
        .filter((item) =>(item.value >= 0))
        .transition()
        .attrTween('fill', function (d, i, a) {
          return ()=>colorScale(parseFloat(d.value));
        });
    }, 1);
  }
}

export default HeatMap;
