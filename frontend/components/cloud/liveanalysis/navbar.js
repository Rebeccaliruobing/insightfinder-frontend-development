import _ from 'lodash';
import React from 'react';
import {Link, Accordion} from '../../../artui/react';

const Navbar = ({groupMetrics}) => {

  let elem = null;
  if (groupMetrics) {
    
    let items = [];
    
    _.forEach(groupMetrics, (v, k) => {
      items.push((
        <div key={k} className="item">
          <a key='link' href={window.location}>Metric Group {k}</a>
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
        <a key="summary" href={window.location} className="item">Summary</a>
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
};

export default Navbar;