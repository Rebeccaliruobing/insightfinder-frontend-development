/*
 * Page header
 */

import React from 'react';
import {Link, IndexLink} from 'react-router';

const logoSrc = require('../images/logo.png');

class Header extends React.Component {
  render() {
    return (
        <div className="ui inverted top fixed menu">
          <div className="item">
            <IndexLink to="/" className="ui small image">
              <img src={logoSrc} />
            </IndexLink>
          </div>
          <Link to="/monitoring" className="item">Cloud Monitoring</Link>
          <Link to="/analysis" className="item">File Analysis</Link>
          <Link to="/settings" className="item">Alert Settings</Link>
          <div className="ui right simple dropdown item">
            <i className="user icon circular teal inverted"></i>
            Guest
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">
                <i className="icon power"></i>Logout
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Header;
