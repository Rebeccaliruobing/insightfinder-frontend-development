import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function(props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Projects</a>
          <div className="active content menu">
            <Link to="/monitoring/projects" className="item">Projects</Link>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Monitoring</a>
          <div className="active content menu">
            <Link to="/monitoring/summary" className="item">Daily Summary</Link>
            <Link to="/monitoring/live" className="item">Live Monitoring</Link>
            <Link to="/monitoring/ii" className="item">Incident Analysis</Link>
            <Link to="/monitoring/ii" className="item">Cluster Outlier Detection</Link>
            <Link to="/monitoring/ii" className="item">Software Rollout Check</Link>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}