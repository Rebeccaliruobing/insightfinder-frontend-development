import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from '../../common/app/components';
import { Login } from '../auth';
import { Help } from '../help';
import {
  ForgotPassword, ResetPassword,
  ForgotUsername, Signup, SignupStep2,
} from '../../../components/auth';
import AccountInfo from '../../../components/account-info';

import AppRootV1, {
  App as AppV1,
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

import {
  Cloud,
  InsightReport, EventSummary, ExecutiveDashboard, HistoricalReport,
  IncidentAnalysis, BehaviorChangeDetection, OutlierDetection, RolloutCheck,
  SummaryReport, AppForecast,
} from '../../../components/cloud';
import { Log, IncidentLogAnalysis } from '../../../components/log';
import {
  Settings,
  ThresholdSettingsOld, DataDisqualifiersSettings, AlertSensitivitySettings,
  DataSharingSettings, GroupingSettings, ThresholdSettings, LogAnalysisSettings,
  ExtSvc, Projects,
} from '../../../components/settings';

import {
  UseCase,
  ListAll, Search, Explore,
} from '../../../components/usecase';
import {
  FileTabs, FileNewModel, FileDetection, FileUpdateModel,
  FileDisplayModel, FileUpload,
} from '../../../components/filetabs';

import RoutingNextV1 from './RoutingNextV1';

const liveMonitoringAppV1 = withRouteApp(liveMonitoringApp);
const FilesMonitoringAppV1 = withRouteApp(FilesMonitoringApp);
const FilesDetectionMonitoringAppV1 = withRouteApp(FilesDetectionMonitoringApp);
const projectDataOnlyAppV1 = withRouteApp(projectDataOnlyApp);
const incidentAnalysisAppV1 = withRouteApp(incidentAnalysisApp);
const incidentLogAnalysisAppV1 = withRouteApp(incidentLogAnalysisApp);
const useCaseAppV1 = withRouteApp(useCaseApp);
const ExecutiveDashboardAppV1 = withRouteApp(ExecutiveDashboardApp);

const RoutingV1 = () => (<AppRootV1 />);

const RoutingNext = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/forgotUsername" component={ForgotUsername} />
      <Route path="/signup" component={Signup} />
      <Route path="/signup2" component={SignupStep2} />
      <Route path="/resetPassword" component={ResetPassword} />

      <PrivateRoute path="/help" component={Help} />

      <PrivateRoute
        path="/liveMonitoring"
        render={() => React.createElement(liveMonitoringAppV1)}
      />
      <PrivateRoute
        path="/filesMonitoring"
        render={() => React.createElement(FilesMonitoringAppV1)}
      />
      <PrivateRoute
        path="/filesdetectionMonitoring"
        render={() => React.createElement(FilesDetectionMonitoringAppV1)}
      />
      <PrivateRoute
        path="/projectDataOnly"
        render={() => React.createElement(projectDataOnlyAppV1)}
      />
      <PrivateRoute
        path="/incidentAnalysis"
        render={() => React.createElement(incidentAnalysisAppV1)}
      />
      <PrivateRoute
        path="/incidentLogAnalysis"
        render={() => React.createElement(incidentLogAnalysisAppV1)}
      />
      <PrivateRoute
        path="/useCaseDetails"
        render={() => React.createElement(useCaseAppV1)}
      />
      <PrivateRoute
        path="/executiveDashboard"
        render={() => React.createElement(ExecutiveDashboardAppV1)}
      />

      <PrivateRoute component={RoutingNextV1} />
    </Switch>
  </BrowserRouter>
);

// TODO: v1 <=> next
// const Routing = RoutingV1;
const Routing = RoutingNext;

export default Routing;
