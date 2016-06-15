import _ from 'lodash';
import React from 'react';
import {Link, Accordion} from '../../../artui/react';

class Navbar extends React.Component {
  
  shouldComponentUpdate(nextProps, extState) {
    return nextProps.groupMetrics !== this.props.groupMetrics;
  }
  
  render() {
    
    let {groupMetrics} = this.props;
    let elem = null;
    let baseUrl = window.location.href.split('#')[0];
    if (groupMetrics) {

      let items = [];

      _.forEach(groupMetrics, (v, k) => {
        items.push((
          <div key={k} className="item">
            <a key='link' href={baseUrl + '#metric_group_' + k}>Metric Group {k}</a>
            <div key="metrics" className="menu">
              {v.map(g=> {
                return (<div key={g} className="item">- {g}</div>)
              })}
            </div>
          </div>
        ));
      });

      elem = (
        <div className="active content menu">
          <a key="summary" href={baseUrl + '#summary'} className="item">Summary</a>
          {items}
        </div>
      );
    }

    return (
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a key="root" className="active title"><i className="dropdown icon"/>List of Charts</a>
          {elem}
        </div>
      </Accordion>
    )
  }
}

export default Navbar;