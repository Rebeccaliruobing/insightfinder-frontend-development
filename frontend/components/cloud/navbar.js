import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function(props) {
  return (
    <Console.Navbar>
      <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Monitoring</a>
          <div className="active content menu">
            <Link to="/cloud/monitoring" className="item">Live Monitoring</Link>
            <Link to="/cloud/incident-analysis" className="item">Incident Analysis</Link>
            <Link to="/cloud/outlier-detection" className="item">Cluster Outlier Detection</Link>
            <Link to="/cloud/software-rollout-check" className="item">Software Rollout Check</Link>
            <Link to="/cloud/summary-report" className="item">Summary Report</Link>
            <Link to="/cloud/display-model" className="item">Display Model</Link>
          </div>
        </div>
        <div className="item">
          <a className="active title"><i className="dropdown icon"/>Project Management</a>
          <div className="active content menu">
            <Link to="/cloud/newproject" className="item">Register Project</Link>
            <Link to="/cloud/removeproject" className="item">Remove Project</Link>
          </div>
        </div>
      </Accordion>
    </Console.Navbar>
  )
}