/*
 * Cloud Monitoring
 */

import React from 'react';
import {Link} from 'react-router';
import {Console} from '../../artui/react';

export Projects from './projects';
export Summary from './summary';
export LiveMonitoring from './live';

export class Monitoring extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Console.Navbar>
          <div className="ui vertical menu inverted">
            <div className="item">
              <div className="header">Projects</div>
              <div className="menu">
                <Link to="/monitoring/projects" className="item">Projects</Link>
              </div>
            </div>
            <div className="item">
              <div className="header">Monitoring</div>
              <div className="menu">
                <Link to="/monitoring/summary" className="item">Daily Summary</Link>
                <Link to="/monitoring/live" className="item">Live Monitoring</Link>
                <div className="item">Incident Analysis</div>
                <div className="item">Cluster Outlier Detection</div>
                <div className="item">Software Rollout Check</div>
              </div>
            </div>
          </div>
        </Console.Navbar>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}