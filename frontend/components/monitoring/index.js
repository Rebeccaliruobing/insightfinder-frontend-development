/*
 * Cloud Monitoring
 */

import React from 'react';
import {Link} from 'react-router';

export Projects from './projects';

export class Monitoring extends React.Component {
  render() {
    return (
        <div className="ui grid">
          <div className="three wide column">
            <div className="ui large fluid vertical menu">
              <div className="item">
                <div className="header">Projects</div>
                <div className="menu">
                  <Link to="/monitoring/projects" className="item">Projects</Link>
                </div>
              </div>
              <div className="item">
                <div className="header">Monitoring</div>
                <div className="menu">
                  <div className="item">Daily Summary</div>
                  <div className="item">Live Monitoring</div>
                  <div className="item">Incident Analysis</div>
                  <div className="item">Cluster Outlier Detection</div>
                  <div className="item">Software Rollout Check</div>
                </div>
              </div>
            </div>
          </div>
          <div className="thirteen wide column">
            {this.props.children}
          </div>
        </div>
    )
  }
}