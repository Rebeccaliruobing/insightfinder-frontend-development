import React, {Component} from 'react';
import HeatMap from './graph/HeatMap';
import {Dygraph} from '../../artui/react/dataviz';
import LiveAnalysis from '../cloud/liveanalysis';
class DisplayChart extends Component {

  handleHighlight(v) {
    return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
  }

  render() {
    return (
      <Dygraph
        data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
        labels={['x', 'y']}
        style={{height: 150}}
        highlightCircleSize={2}
        highlightSeriesOpts={{
                  strokeWidth: 3,
                  strokeBorderWidth: 1,
                  highlightCircleSize: 5}}
        highlightCallback={this.handleHighlight}/>

    )
  }
}
export default class HeatMapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      chart: <DisplayChart/>
    };
  }

  handleHighlight(v) {
    return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
  }

  showPopup() {
    this.setState({showPopup: true});
  }

  hidePopup() {
    this.setState({showPopup: false});
  }

  render() {
    let {showPopup} = this.state;
    let {duration, itemSize, dateIndex, data} = this.props;

    let groups = [
      'Summary',
      'Metric Group 1', 'Metric Group 2', 'Metric Group 3',
    ];
    
    return (
      <div className="ui card">
        <div className="image" style={{backgroudColor: '#FFF'}}>
          <a target="_blank" href={this.props.link}>
            <HeatMap duration={duration} itemSize={itemSize} data={data}/>
          </a>
        </div>
        <div className="content">
          <div className="meta" style={{textAlign: 'center'}}>
              <span className="date">
                  {this.props.title}
              </span>
          </div>
        </div>
      </div>
    )
  }
}
