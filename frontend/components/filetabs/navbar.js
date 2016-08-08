import React from 'react';
import {Console, Accordion, Link, IndexLink} from '../../artui/react/index';
import store from 'store';

export default function (props) {
  // <Link to="/cloud/display-model" className="item">Display Model</Link>
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/filetabs/fileNewModel" className="item text-white">
          <i className="line chart icon"></i>
          <span> Create Model </span>
        </Link>
        <Link to="/filetabs/filedetection" className="item text-white">
          <i className="bar chart icon"></i>
          <span> Detect Anomalies </span>
        </Link>
        <Link to="/filetabs/fileupdatemodel" className="item text-white">
          <i className="zoom icon"></i>
          <span> Update Model </span>
        </Link>
        <Link to="/filetabs/filedisplaymodel" className="item text-white">
          <i className="checkmark box icon"/>
          <span> Display Model </span>
        </Link>
        <Link to="/filetabs/fileupload" className="item text-white">
          <i className="icon icon-report iconfont"/>
          <span> Visualize Data </span>
        </Link>
      </div>
    </Console.Navbar>
  )
}