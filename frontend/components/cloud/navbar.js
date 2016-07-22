import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react/index';

export default function (props) {
  // <Link to="/cloud/display-model" className="item">Display Model</Link>
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/cloud/monitoring" className="item text-white">
          <i className="line chart icon"></i>
          <span> Real-time Alert </span>
        </Link>
        <Link to="/cloud/incident-analysis" className="item text-white">
          <i className="zoom icon"></i>
          <span> Incident Triage </span>
        </Link>
        <Link to="/cloud/outlier-detection" className="item text-white">
          <i className="icon icon-icons01 iconfont "/>
          <span> Cluster Outlier Detection</span>
        </Link>
        <Link to="/cloud/rollout-check" className="item text-white">
          <i className="checkmark box icon"/>
          <span> Behavior Change Detection</span>
        </Link>
        <Link to="/cloud/summary-report" className="item text-white">
          <i className="icon icon-report iconfont"/>
          <span> Summary Report </span>
        </Link>
        <Link to="/cloud/incident-log-analysis" className="item text-white">
          <i className="file text icon"></i>
          <span> Log Analysis (beta) </span>
        </Link>
      </div>
    </Console.Navbar>
  )
}