import React from 'react';
import { Console, Link } from '../../artui/react';

export default function () {
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/settings/project" className="item">
          <i className="icon iconfont icon-threshold" /><span>Project Settings</span>
        </Link>
        <Link to="/settings/extsvc" className="item">
          <i className="icon iconfont icon-puzzlepiece1 " /> <span>External Service</span>
        </Link>
      </div>
    </Console.Navbar>
  );
}
