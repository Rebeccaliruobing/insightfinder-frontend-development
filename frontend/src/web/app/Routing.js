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
        path="/account-info"
        render={() => <AppV1><AccountInfo /></AppV1>}
      />

      <PrivateRoute
        path="/cloud/insight-report"
        render={() => (<AppV1><Cloud><InsightReport /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/monitoring"
        render={() => (<AppV1><Cloud><EventSummary /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/executive-dashboard"
        render={() => (<AppV1><Cloud><ExecutiveDashboard /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/app-forecast"
        render={() => (<AppV1><Cloud><AppForecast /></Cloud></AppV1>)}
      />

      <PrivateRoute
        path="/cloud/historical-report"
        render={() => (<AppV1><Cloud><HistoricalReport /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/incident-analysis"
        render={() => (<AppV1><Cloud><IncidentAnalysis /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/behavior-change-detection"
        render={() => (<AppV1><Cloud><BehaviorChangeDetection /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/outlier-detection"
        render={() => (<AppV1><Cloud><OutlierDetection /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/rollout-check"
        render={() => (<AppV1><Cloud><RolloutCheck /></Cloud></AppV1>)}
      />
      <PrivateRoute
        path="/cloud/summary-report"
        render={() => (<AppV1><Cloud><SummaryReport /></Cloud></AppV1>)}
      />

      <PrivateRoute
        path="/log/incident-log-analysis"
        render={() => (<AppV1><Log><IncidentLogAnalysis /></Log></AppV1>)}
      />
      <Redirect from="/log" to="/log/incident-log-analysis" />

      <PrivateRoute
        path="/settings/data-disqualifiers"
        render={() => (<AppV1><Settings><DataDisqualifiersSettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/alert-sensitivity"
        render={() => (<AppV1><Settings><AlertSensitivitySettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/data-sharing"
        render={() => (<AppV1><Settings><DataSharingSettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/grouping"
        render={() => (<AppV1><Settings><GroupingSettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/threshold"
        render={() => (<AppV1><Settings><ThresholdSettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/log-analysis"
        render={() => (<AppV1><Settings><LogAnalysisSettings /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/project"
        render={() => (<AppV1><Settings><ThresholdSettingsOld /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/extsvc"
        render={() => (<AppV1><Settings><ExtSvc /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/project-list/:tabId"
        render={() => (<AppV1><Settings><Projects /></Settings></AppV1>)}
      />
      <PrivateRoute
        path="/settings/project-list"
        render={() => (<AppV1><Settings><Projects /></Settings></AppV1>)}
      />
      <Redirect from="/settings" to="/settings/project" />
      <PrivateRoute
        path="/usecase/list-all"
        render={() => (<AppV1><UseCase><ListAll /></UseCase></AppV1>)}
      />
      <PrivateRoute
        path="/usecase/list-some"
        render={() => (<AppV1><UseCase><ListAll /></UseCase></AppV1>)}
      />
      <PrivateRoute
        path="/usecase/search"
        render={() => (<AppV1><UseCase><Search /></UseCase></AppV1>)}
      />
      <PrivateRoute
        path="/usecase/explore"
        render={() => (<AppV1><UseCase><Explore /></UseCase></AppV1>)}
      />
      <Redirect from="/usecase" to="/usecase/explore" />

      <PrivateRoute
        path="/filetabs/fileNewModel"
        render={() => (<AppV1><FileTabs><FileNewModel /></FileTabs></AppV1>)}
      />
      <PrivateRoute
        path="/filetabs/filedetection"
        render={() => (<AppV1><FileTabs><FileDetection /></FileTabs></AppV1>)}
      />
      <PrivateRoute
        path="/filetabs/fileupdatemodel"
        render={() => (<AppV1><FileTabs><FileUpdateModel /></FileTabs></AppV1>)}
      />
      <PrivateRoute
        path="/filetabs/filedisplaymodel"
        render={() => (<AppV1><FileTabs><FileDisplayModel /></FileTabs></AppV1>)}
      />
      <PrivateRoute
        path="/filetabs/fileupload"
        render={() => (<AppV1><FileTabs><FileUpload /></FileTabs></AppV1>)}
      />
      <Redirect from="/filetabs" to="/filetabs/fileNewModel" />

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

      <Redirect from="*" to="/cloud/executive-dashboard" />
    </Switch>
  </BrowserRouter>
);

// TODO: v1 <=> next
// const Routing = RoutingV1;
const Routing = RoutingNext;

export default Routing;
