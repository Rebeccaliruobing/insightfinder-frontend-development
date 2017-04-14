import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { PrivateRoute } from '../../common/app/components';
import { Login } from '../auth';
import { Help } from '../help';
import { SinglePage } from '../app/components';
import { ExecutiveDashboard } from '../dashboard';
import { LogLiveAnalysis } from '../log';

import {
  ForgotPassword, ResetPassword,
  ForgotUsername, Signup, SignupStep2,
} from '../../../components/auth';

import {
  liveMonitoringApp,
  FilesMonitoringApp,
  FilesDetectionMonitoringApp,
  projectDataOnlyApp,
  incidentAnalysisApp,
  incidentLogAnalysisApp,
  useCaseApp,
  ExecutiveDashboardApp,
} from '../../../root';

import withRouteApp from './withRouteApp';
import RoutingNextV1 from './RoutingNextV1';

const liveMonitoringAppV1 = withRouteApp(liveMonitoringApp);
const FilesMonitoringAppV1 = withRouteApp(FilesMonitoringApp);
const FilesDetectionMonitoringAppV1 = withRouteApp(FilesDetectionMonitoringApp);
const projectDataOnlyAppV1 = withRouteApp(projectDataOnlyApp);
const incidentAnalysisAppV1 = withRouteApp(incidentAnalysisApp);
const incidentLogAnalysisAppV1 = withRouteApp(incidentLogAnalysisApp);
const useCaseAppV1 = withRouteApp(useCaseApp);
const ExecutiveDashboardAppV1 = withRouteApp(ExecutiveDashboardApp);

type RouteProps = {
  match: Object,
};

const DashboardRouting = ({ match }: RouteProps) => {
  return (
    <SinglePage>
      <Switch>
        <Route path={`${match.url}/executive/:view?`} component={ExecutiveDashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </SinglePage>
  );
};

const LogRouting = ({ match }: RouteProps) => {
  return (
    <SinglePage>
      <Switch>
        <Route path={`${match.url}/:projectId?/:logId?`} component={LogLiveAnalysis} />
      </Switch>
    </SinglePage>
  );
};

const PrivateRouting = () => (
  <Switch>
    <Route path="/help" component={Help} />

    <Route path="/cloud/dashboard" component={DashboardRouting} />
    <Route path="/dashboard" component={DashboardRouting} />
    <Route path="/log/live-analysis" component={LogRouting} />

    <Route
      path="/liveMonitoring"
      render={() => React.createElement(liveMonitoringAppV1)}
    />
    <Route
      path="/filesMonitoring"
      render={() => React.createElement(FilesMonitoringAppV1)}
    />
    <Route
      path="/filesdetectionMonitoring"
      render={() => React.createElement(FilesDetectionMonitoringAppV1)}
    />
    <Route
      path="/projectDataOnly"
      render={() => React.createElement(projectDataOnlyAppV1)}
    />
    <Route
      path="/incidentAnalysis"
      render={() => React.createElement(incidentAnalysisAppV1)}
    />
    <Route
      path="/incidentLogAnalysis"
      render={() => React.createElement(incidentLogAnalysisAppV1)}
    />
    <Route
      path="/useCaseDetails"
      render={() => React.createElement(useCaseAppV1)}
    />
    <Route
      path="/executiveDashboard"
      render={() => React.createElement(ExecutiveDashboardAppV1)}
    />

    <Route component={RoutingNextV1} />
  </Switch>
);

type Props = {
  history: Object,
};

const Routing = ({ history }: Props) => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/forgotUsername" component={ForgotUsername} />
      <Route path="/signup" component={Signup} />
      <Route path="/signup2" component={SignupStep2} />
      <Route path="/resetPassword" component={ResetPassword} />
      <PrivateRoute component={PrivateRouting} />
    </Switch>
  </Router>
);

export default Routing;
