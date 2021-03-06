/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { PrivateRoute } from '../../common/app/components';
import { BaseUrls } from './Constants';
import { Login } from '../auth';
import { Help } from '../help';
import { SinglePage } from '../app/components';
import { MetricAnalysis, HistoricalMetricAnalysis } from '../metric';
import { LogLiveAnalysis, LogFileAnalysis } from '../log';
import { BugRepository } from '../usecase';
import { SettingsLeftbar, ProjectSettings, ProjectWizard, SettingsProjectList } from '../settings';

// TODO: v1 components needs upgrade
import AccountInfo from '../../../components/account-info';
import EventSummary from '../../../containers/event-summary';
import {
  ForgotPassword, ResetPassword, ForgotUsername, Signup, SignupStep2,
} from '../../../components/auth';

import {
  liveMonitoringApp,
  FilesMonitoringApp,
  FilesDetectionMonitoringApp,
  useCaseApp,
} from '../../../root';

import withRouteApp from './withRouteApp';
import { RoutingV1Settings, RoutingV1FileTabs } from './RoutingNextV1';

const liveMonitoringAppV1 = withRouteApp(liveMonitoringApp);
const FilesMonitoringAppV1 = withRouteApp(FilesMonitoringApp);
const FilesDetectionMonitoringAppV1 = withRouteApp(FilesDetectionMonitoringApp);
const useCaseAppV1 = withRouteApp(useCaseApp);

const MetricRoutings = () => {
  return (
    <SinglePage>
      <Switch>
        <Route path={BaseUrls.MetricAnalysis} component={MetricAnalysis} />
        <Route
          path={BaseUrls.MetricHistoricalMetricAnalysis}
          component={HistoricalMetricAnalysis}
        />
        <Route path={BaseUrls.MetricEvents} component={EventSummary} />
        <Route
          path={BaseUrls.MetricLineCharts}
          render={() => React.createElement(liveMonitoringAppV1)}
        />
        <Redirect from="*" to={BaseUrls.MetricAnalysisBase} />
      </Switch>
    </SinglePage>
  );
};

const LogRoutings = () => {
  return (
    <SinglePage>
      <Switch>
        <Route path={BaseUrls.LogAnalysis} component={LogLiveAnalysis} />
        <Route path={BaseUrls.LogHistoricalLogAnalysis} component={LogFileAnalysis} />
        <Redirect from="*" to={BaseUrls.LogAnalysisBase} />
      </Switch>
    </SinglePage>
  );
};

const UseCaseRoutings = () => {
  return (
    <SinglePage>
      <Switch>
        <Route path={BaseUrls.Usecase} component={BugRepository} />
      </Switch>
    </SinglePage>
  );
};

// TODO: Merge with routing in RoutingNextV1.
const SettingsRoutings = () => {
  return (
    <SinglePage leftbar={<SettingsLeftbar />}>
      <Switch>
        <Route path={BaseUrls.SettingsProjectList} exact component={SettingsProjectList} />
        <Route path={BaseUrls.SettingsProject} exact component={ProjectSettings} />
      </Switch>
    </SinglePage>
  );
};

/**
 * The private routing defines the routings needs authentication. When access these pages
 * without login, it will be redirected to login page and be redirected back after login.
 **/
const PrivateRoutings = () => (
  <Switch>
    <Route
      path={BaseUrls.Help}
      render={props => (<SinglePage><Help {...props} /></SinglePage>)}
    />
    <Route
      path={BaseUrls.AccountInfo}
      render={props => (<SinglePage><AccountInfo {...props} /></SinglePage>)}
    />

    <Route path={BaseUrls.Metric} component={MetricRoutings} />
    <Route path={BaseUrls.Log} component={LogRoutings} />
    <Route path={BaseUrls.UsecaseBase} component={UseCaseRoutings} />

    <Route path={BaseUrls.SettingsProjectList} component={SettingsRoutings} />
    <Route
      path={BaseUrls.SettingsProjectWizard} exact
      render={props => (
        <SinglePage leftbar={<SettingsLeftbar {...props} />}><ProjectWizard /></SinglePage>
      )}
    />

    <Route
      path="/liveMonitoring"
      render={() => React.createElement(liveMonitoringAppV1)}
    />
    <Route
      path="/useCaseDetails"
      render={() => React.createElement(useCaseAppV1)}
    />
    <Route
      path="/filesMonitoring"
      render={() => React.createElement(FilesMonitoringAppV1)}
    />
    <Route
      path="/filesdetectionMonitoring"
      render={() => React.createElement(FilesDetectionMonitoringAppV1)}
    />
    <Route path="/settings" component={RoutingV1Settings} />
    <Route path="/filetabs" component={RoutingV1FileTabs} />

    <Redirect from="*" to={BaseUrls.Metric} />
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
      <PrivateRoute component={PrivateRoutings} />
    </Switch>
  </Router>
);

export default Routing;
