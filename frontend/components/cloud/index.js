import React from 'react';
import {Console, Link} from '../../artui/react/index';
import {Route, IndexRedirect} from 'react-router';

import Navbar from './navbar';

import LiveMonitoring from './monitoring';
import HistoricalReport from './historical-report';
import {InsightReport} from './insight-report';
import IncidentAnalysis from './incident-analysis';
import IncidentLogAnalysis from './incident-log-analysis';
import OutlierDetection from './outlier-detection';
import RolloutCheck from './rollout-check';
import SummaryReport from './summary-report';
import BehaviorChangeDetection from './behavior-change-detection';
import DisplayModel from './display-model';
import LiveAnalysis from '../../containers/live-analysis';
import LiveAnalysis3 from '../../containers/live-analysis3';

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
      <Route component={InsightReport} path="insight-report" />
      <Route component={LiveAnalysis} path="monitoring0" />
      <Route component={LiveAnalysis3} path="monitoring" />
      <Route component={HistoricalReport} path="historical-report" />
      <Route component={IncidentAnalysis} path="incident-analysis" />
      <Route component={IncidentLogAnalysis} path="incident-log-analysis" />
      <Route component={BehaviorChangeDetection} path="behavior-change-detection" />
      <Route component={OutlierDetection} path="outlier-detection" />
      <Route component={RolloutCheck} path="rollout-check" />
      <Route component={SummaryReport} path="summary-report" />
    </Route>
);