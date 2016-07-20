import React from 'react';
import {Console, Link} from '../../artui/react/index';
import {Route, IndexRedirect} from 'react-router';

import Navbar from './navbar';

import LiveMonitoring from './monitoring';
import IncidentAnalysis from './incident-analysis';
import IncidentLogAnalysis from './incident-log-analysis';
import OutlierDetection from './outlier-detection';
import RolloutCheck from './rollout-check';
import SummaryReport from './summary-report';
import DisplayModel from './display-model';

export class Cloud extends React.Component {
  render() {
    return (
      <Console.Wrapper className="cloud-page">
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export const cloudRoute = (
    <Route component={Cloud} path="cloud">
      <IndexRedirect to="monitoring" />
      <Route component={LiveMonitoring} path="monitoring" />
      <Route component={IncidentAnalysis} path="incident-analysis" />
      <Route component={IncidentLogAnalysis} path="incident-log-analysis" />
      <Route component={OutlierDetection} path="outlier-detection" />
      <Route component={RolloutCheck} path="rollout-check" />
      <Route component={SummaryReport} path="summary-report" />
    </Route>
);