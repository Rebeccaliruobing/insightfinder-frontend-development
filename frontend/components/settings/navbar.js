import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react';

export default function (props) {
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/settings/project" className="item">
          <i className="icon iconfont icon-threshold "></i> <span>Project Settings</span>
        </Link>
        <Link to="/settings/extsvc" className="item">
          <i className="icon iconfont icon-puzzlepiece1 "></i> <span>External Service</span>
        </Link>
      </div>
    </Console.Navbar>
  )
}