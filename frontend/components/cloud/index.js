import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Console } from '../../artui/react/index';

import HistoricalReport from './historical-report';
import { InsightReport } from './insight-report';
import IncidentAnalysis from './incident-analysis';
import IncidentLogAnalysis from './incident-log-analysis';
import OutlierDetection from './outlier-detection';
import RolloutCheck from './rollout-check';
import SummaryReport from './summary-report';
import BehaviorChangeDetection from './behavior-change-detection';
import EventSummary from '../../containers/event-summary';
import ExecutiveDashboard from '../../containers/executive-dashboard';
import AppForecast from '../../containers/app-forecast';
import Navbar from './navbar';

export const Cloud = props => (
  <Console.Wrapper className="cloud-page">
    <Navbar />
    {props.children}
  </Console.Wrapper>
);

export const cloudRoute = (
  <Route component={Cloud} path="cloud">
    <IndexRedirect to="executive-dashboard" />
    <Route component={InsightReport} path="insight-report" />
    <Route component={EventSummary} path="monitoring" />
    <Route component={ExecutiveDashboard} path="executive-dashboard" />
    <Route component={AppForecast} path="app-forecast" />
    <Route component={HistoricalReport} path="historical-report" />
    <Route component={IncidentAnalysis} path="incident-analysis" />
    <Route component={IncidentLogAnalysis} path="incident-log-analysis" />
    <Route component={BehaviorChangeDetection} path="behavior-change-detection" />
    <Route component={OutlierDetection} path="outlier-detection" />
    <Route component={RolloutCheck} path="rollout-check" />
    <Route component={SummaryReport} path="summary-report" />
  </Route>
);
