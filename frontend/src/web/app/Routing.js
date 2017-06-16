import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { PrivateRoute } from '../../common/app/components';
import { Login } from '../auth';
import { Help } from '../help';
import { SinglePage } from '../app/components';
import { BaseUrls } from './Constants';
import { MetricAnalysis } from '../metric';
import { LogLiveAnalysis, LogFileAnalysis } from '../log';
import { BugRepository } from '../usecase';
import { SettingsLeftbar, ProjectSettings, ProjectWizard, SettingsProjectList } from '../settings';

// TODO: Components below need to be upgraded
import AccountInfo from '../../../components/account-info';
import EventSummary from '../../../containers/event-summary';
import ExecutiveDashboard from '../../../containers/executive-dashboard';
import {
  ForgotPassword, ResetPassword, ForgotUsername, Signup, SignupStep2,
} from '../../../components/auth';

import {
  liveMonitoringApp,
  FilesMonitoringApp,
  FilesDetectionMonitoringApp,
  projectDataOnlyApp,
  incidentAnalysisApp,
  incidentLogAnalysisApp,
  useCaseApp,
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

const MetricRouting = () => {
  return (
    <SinglePage>
      <Switch>
        <Route path={BaseUrls.MetricSummary} component={MetricAnalysis} />
        <Redirect from="*" to={BaseUrls.MetricSummaryBase} />
      </Switch>
    </SinglePage>
  );
};

const UseCaseRouting = () => {
  return (
    <SinglePage>
      <Switch>
        <Route path={BaseUrls.Usecase} component={BugRepository} />
      </Switch>
    </SinglePage>
  );
};

// TODO: Merge with routing in RoutingNextV1.
const SettingsRouting = () => {
  return (
    <SinglePage leftbar={<SettingsLeftbar />}>
      <Switch>
        <Route path={BaseUrls.SettingsProjectList} exact component={SettingsProjectList} />
        <Route path={BaseUrls.SettingsProject} exact component={ProjectSettings} />
      </Switch>
    </SinglePage>
  );
};

const PrivateRouting = () => (
  <Switch>
    <Route path={BaseUrls.Help} render={props => (<SinglePage><Help {...props} /></SinglePage>)} />
    <Route
      path={BaseUrls.AccountInfo}
      render={props => (<SinglePage><AccountInfo {...props} /></SinglePage>)}
    />

    <Route path={BaseUrls.Metric} component={MetricRouting} />
    <Route path={BaseUrls.UsecaseBase} component={UseCaseRouting} />

    <Route
      path="/log/live-analysis/:projectId?/:month?/:incidentId?"
      render={props => (<SinglePage><LogLiveAnalysis {...props} /></SinglePage>)}
    />
    <Route
      path="/log/incident-log-analysis/:projectId?/:incidentId?"
      render={props => (<SinglePage><LogFileAnalysis {...props} /></SinglePage>)}
    />

    <Route path={BaseUrls.SettingsProjectList} component={SettingsRouting} />
    <Route
      path={BaseUrls.SettingsProjectWizard} exact
      render={props => (
        <SinglePage leftbar={<SettingsLeftbar {...props} />}><ProjectWizard /></SinglePage>
      )}
    />

    <Route
      path="/cloud/monitoring" exact
      render={props => (<SinglePage><EventSummary {...props} /></SinglePage>)}
    />
    <Route
      path="/cloud/executive-dashboard" exact
      render={props => (<SinglePage><ExecutiveDashboard {...props} /></SinglePage>)}
    />

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
