import React from 'react';
import { Console, Link } from '../../artui/react';

export default function () {
  return (
    <Console.Navbar>
      <div className="ui vertical menu text icon-menu">
        <Link to="/filetabs/fileNewModel" className="item text-white">
          <i className="add circle icon" />
          <span> Create Model </span>
        </Link>
        <Link to="/filetabs/uploadModel" className="item text-white">
          <i className="upload icon" />
          <span> Upload Model </span>
        </Link>
        <Link to="/filetabs/filedetection" className="item text-white">
          <i className="line chart icon" />
          <span> Detect Anomalies </span>
        </Link>
        <Link to="/filetabs/fileupdatemodel" className="item text-white">
          <i className="refresh icon" />
          <span> Update Model </span>
        </Link>
        <Link to="/filetabs/filedisplaymodel" className="item text-white">
          <i className="photo icon" />
          <span> Display Model </span>
        </Link>
        <Link to="/filetabs/fileupload" className="item text-white">
          <i className="area chart icon" />
          <span> Visualize Data </span>
        </Link>
      </div>
    </Console.Navbar>
  );
}
