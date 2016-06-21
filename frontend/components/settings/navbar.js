import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function (props) {
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/settings/project-list" className="item">
          <i className="edit icon"></i> <span> Register Project</span>
        </Link>
        <Link to="/settings/threshold" className="item">
          <i className="icon iconfont icon-threshold "></i> <span>Threshold Settings</span>
        </Link>
        <Link to="/settings/extsvc" className="item">
          <i className="icon iconfont icon-puzzlepiece1 "></i> <span>PagerDuty Integration</span>
        </Link>
      </div>
    </Console.Navbar>
  )
}