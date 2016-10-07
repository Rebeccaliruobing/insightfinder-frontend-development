/**
 * Page header for standalone pages.
 */

import React from 'react';
import {Console} from '../artui/react';

const logo = require('../images/logo.png');

const Header = ({title}) => (
  <Console.Topbar logo={logo}>
    <div className="topbar-text">
      <div className="title" dangerouslySetInnerHTML={{ __html: title }}/>
      <div className="legend">
        <div>Anomaly color map:</div>
        <div className="colormap2">
          <div style={{ float: 'left' }}>Normal</div>
          <div style={{ float: 'right' }}>Abnormal</div>
        </div>
      </div>
    </div>
  </Console.Topbar>
);

export default Header;
