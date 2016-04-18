import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function(props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Settings</a>
          <div className="active content menu">
            <div className="item">Threshold Settings</div>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Integration</a>
          <div className="active content menu">
            <div className="item">PagerDuty Integration</div>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}