import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function(props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Register</a>
          <div className="active content menu">
            <Link to="/settings/project-list" className="item">Register Project</Link>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Settings</a>
          <div className="active content menu">
            <Link to="/settings/threshold" className="item">Threshold Settings</Link>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Integration</a>
          <div className="active content menu">
            <Link to="/settings/extsvc" className="item">PagerDuty Integration</Link>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}