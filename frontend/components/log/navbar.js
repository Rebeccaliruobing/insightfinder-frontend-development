import React from 'react';
import { Console, Link } from '../../artui/react/index';
import store from 'store';

export default function (props) {
  let userName = store.get('userName');
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/log/incident-log-analysis" className="item text-white">
          <i className="file text icon"></i>
          <span> Log Analysis </span>
        </Link>
      </div>
    </Console.Navbar>
  )
}