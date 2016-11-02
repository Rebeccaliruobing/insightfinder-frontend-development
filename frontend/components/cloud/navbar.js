import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react/index';
import store from 'store';

export default function (props) {
  // <Link to="/cloud/display-model" className="item">Display Model</Link>

        // <Link to="/cloud/historical-report" className="item text-white">
        //   <i className="bar chart icon"></i>
        //   <span> Historical Report </span>
        // </Link>
        // <Link to="/cloud/behavior-change-detection" className="item text-white">
        //   <i className="checkmark box icon"/>
        //   <span> Behavior Change Detection</span>
        // </Link>
        // <Link to="/cloud/summary-report" className="item text-white">
        //   <i className="icon icon-report iconfont"/>
        //   <span> Summary Report </span>
        // </Link>
        // <Link to="/cloud/insight-report" className="item text-white">
        //  <i className="bar chart icon"></i>
        //  <span> Insight Report </span>
        // </Link>
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/cloud/monitoring" className="item text-white">
          <i className="zoom icon"></i>
          <span> Live Analysis </span>
        </Link>
        <Link to="/cloud/app-forecast" className="item text-white">
          <i className="line chart icon"></i>
          <span> Application Forecast </span>
        </Link>
        <Link to="/cloud/behavior-change-detection" className="item text-white">
          <i className="checkmark box icon"/>
          <span> Behavior Change Detection</span>
        </Link>
        <Link to="/cloud/incident-log-analysis" className="item text-white">
          <i className="file text icon"></i>
          <span> Log Analysis </span>
        </Link>
      </div>
    </Console.Navbar>
  )
}