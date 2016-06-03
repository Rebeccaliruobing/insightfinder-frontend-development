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
    debugger;
    return (
      <div className="ui card">
        <div className="image" style={{backgroudColor: '#FFF'}}>
          <a target="_blank" onClick={this.showPopup.bind(this)}>
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
        {showPopup &&
        <div className="ui dimmer modals page transition visible active"
             style={{display: 'block !important', overflow: 'auto'}} key={Date.now()}>
          <div className="ui standard test modal transition visible active scrolling"
               style={{display: 'block !important', top: 188}}>
            <div className="header">
              {this.props.title}
            </div>
            <div className="content">
                
              <div style={{width: '100%'}}>

                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
              <div style={{width: '100%'}}>
                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
              <div style={{width: '100%'}}>
                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
            </div>
            <div className="actions">
              <div className="ui black deny button" onClick={this.hidePopup.bind(this)}>
                Close
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}
