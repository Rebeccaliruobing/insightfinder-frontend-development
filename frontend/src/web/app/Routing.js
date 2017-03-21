import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from '../../common/app/components';
import { ForgotPassword, ForgotUsername, Login } from '../auth';
import { Help } from '../help';

import ResetPassword from '../../../components/auth/resetPassword';
import Signup from '../../../components/auth/signup';
import SignupStep2 from '../../../components/auth/signup2';
import AccountInfo from '../../../components/account-info';

import AppRootV1, { App as AppV1 } from '../../../root';
import {
  Cloud,
  InsightReport, EventSummary, ExecutiveDashboard, HistoricalReport,
  IncidentAnalysis, BehaviorChangeDetection, OutlierDetection, RolloutCheck,
  SummaryReport, AppForecast,
} from '../../../components/cloud';

const RoutingV1 = () => (<AppRootV1 />);

const RoutingNext = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/forgotUsername" component={ForgotUsername} />

      <PrivateRoute path="/help" component={Help} />

      <PrivateRoute
        path="/cloud/insight-report"
        render={() => (<Cloud><InsightReport /></Cloud>)}
      />
      <PrivateRoute
        path="/cloud/monitoring"
        render={() => (<Cloud><EventSummary /></Cloud>)}
      />
      <PrivateRoute
        path="/cloud/executive-dashboard"
        render={() => (<AppV1><Cloud><ExecutiveDashboard /></Cloud></AppV1>)}
      />
      <PrivateRoute path="/cloud/" render={HistoricalReport} path="historical-report" />
      <PrivateRoute path="/cloud/" render={IncidentAnalysis} path="incident-analysis" />
      <PrivateRoute path="/cloud/" render={BehaviorChangeDetection} path="behavior-change-detection" />
      <PrivateRoute path="/cloud/" render={OutlierDetection} path="outlier-detection" />
      <PrivateRoute path="/cloud/" render={RolloutCheck} path="rollout-check" />
      <PrivateRoute path="/cloud/" render={SummaryReport} path="summary-report" />
      <PrivateRoute path="/cloud/" render={AppForecast} path="app-forecast" />

      <PrivateRoute path="/account-info" render={() => <AppV1><AccountInfo /></AppV1>} />
      <Redirect from="*" to="/cloud/executive-dashboard" />
    </Switch>
  </BrowserRouter>
);

// const Routing = RoutingV1;
const Routing = RoutingNext;

export default Routing;
