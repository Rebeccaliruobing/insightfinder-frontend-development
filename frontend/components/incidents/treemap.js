import React, {PropTypes as T} from 'react';
import * as d3 from 'd3';
import Faux from 'react-faux-dom';

const IncidentsTreeMap = React.createClass({
  mixins: [
    Faux.mixins.core,
    Faux.mixins.anim,
  ],

  getInitialState () {
    return {
      chart: 'loading...'
    }
  },

  componentDidMount () {

    const {data} = this.props;
    const faux = this.connectFauxDOM('div.treemap', 'chart')

    d3.select(faux)
      .html('Hello World!')
  },

  render () {
    const {data} = this.props;
    console.log(data);
    return (
      <div className="incidents treemap">
        {this.state.chart}
      </div>
    )
  }
});

export default IncidentsTreeMap;
