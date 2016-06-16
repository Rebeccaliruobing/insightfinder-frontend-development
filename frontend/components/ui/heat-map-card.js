import React, {Component} from 'react';
import HeatMap from './graph/HeatMap';
import {Dygraph} from '../../artui/react/dataviz';
import LiveAnalysis from '../cloud/liveanalysis';
export default class HeatMapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {duration, itemSize, data} = this.props;

    return (
      <div className="ui card">
        <div className="image" style={{backgroudColor: '#FFF'}}>
          <a target="_blank" href={this.props.link}>
            {data ? <HeatMap duration={duration} itemSize={itemSize} data={data}/> : 'No model found for this period'}
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
