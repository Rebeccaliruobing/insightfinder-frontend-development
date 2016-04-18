import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function(props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Models</a>
          <div className="active content menu">
            <div className="item">Create Model</div>
            <div className="item">Update Model</div>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Analysis</a>
          <div className="active content menu">
            <div className="item">Detect Anomalies</div>
            <div className="item">Visualize Data</div>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}