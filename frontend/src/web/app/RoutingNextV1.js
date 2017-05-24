import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import AccountInfo from '../../../components/account-info';

import { App as AppV1 } from '../../../root';

import {
  Cloud,
  InsightReport, ExecutiveDashboard, HistoricalReport,
  IncidentAnalysis, BehaviorChangeDetection, OutlierDetection, RolloutCheck,
  SummaryReport, AppForecast,
} from '../../../components/cloud';
import EventSummary from '../../../containers/event-summary';
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
  FileDisplayModel, FileUpload, UploadModel,
} from '../../../components/filetabs';

const RoutingNextV1 = () => (
  <AppV1>
    <Switch>
      <Route
        path="/account-info"
        render={() => <AccountInfo />}
      />

      <Route
        path="/cloud/insight-report"
        render={() => (<Cloud><InsightReport /></Cloud>)}
      />
      <Route
        path="/cloud/monitoring"
        render={() => (<Cloud><EventSummary /></Cloud>)}
      />
      <Route
        path="/cloud/executive-dashboard"
        render={() => (<Cloud><ExecutiveDashboard /></Cloud>)}
      />
      <Route
        path="/cloud/app-forecast"
        render={() => (<Cloud><AppForecast /></Cloud>)}
      />

      <Route
        path="/cloud/historical-report"
        render={() => (<Cloud><HistoricalReport /></Cloud>)}
      />
      <Route
        path="/cloud/incident-analysis"
        render={() => (<Cloud><IncidentAnalysis /></Cloud>)}
      />
      <Route
        path="/cloud/behavior-change-detection"
        render={() => (<Cloud><BehaviorChangeDetection /></Cloud>)}
      />
      <Route
        path="/cloud/outlier-detection"
        render={() => (<Cloud><OutlierDetection /></Cloud>)}
      />
      <Route
        path="/cloud/rollout-check"
        render={() => (<Cloud><RolloutCheck /></Cloud>)}
      />
      <Route
        path="/cloud/summary-report"
        render={() => (<Cloud><SummaryReport /></Cloud>)}
      />
      <Redirect from="/log" to="/log/incident-log-analysis" />

      <Route
        path="/settings/data-disqualifiers"
        render={() => (<Settings><DataDisqualifiersSettings /></Settings>)}
      />
      <Route
        path="/settings/alert-sensitivity"
        render={() => (<Settings><AlertSensitivitySettings /></Settings>)}
      />
      <Route
        path="/settings/data-sharing"
        render={() => (<Settings><DataSharingSettings /></Settings>)}
      />
      <Route
        path="/settings/grouping"
        render={() => (<Settings><GroupingSettings /></Settings>)}
      />
      <Route
        path="/settings/threshold"
        render={() => (<Settings><ThresholdSettings /></Settings>)}
      />
      <Route
        path="/settings/log-analysis"
        render={() => (<Settings><LogAnalysisSettings /></Settings>)}
      />
      <Route
        path="/settings/project"
        render={() => (<Settings><ThresholdSettingsOld /></Settings>)}
      />
      <Route
        path="/settings/extsvc"
        render={() => (<Settings><ExtSvc /></Settings>)}
      />
      <Route
        path="/settings/project-list/:tabId"
        render={() => (<Settings><Projects /></Settings>)}
      />
      <Route
        path="/settings/project-list"
        render={() => (<Settings><Projects /></Settings>)}
      />
      <Redirect from="/settings" to="/settings/project" />
      <Route
        path="/usecase1/list-all"
        render={() => (<UseCase><ListAll /></UseCase>)}
      />
      <Route
        path="/usecase1/list-some"
        render={() => (<UseCase><ListAll /></UseCase>)}
      />
      <Route
        path="/usecase1/search"
        render={() => (<UseCase><Search /></UseCase>)}
      />
      <Route
        path="/usecase1/explore"
        render={() => (<UseCase><Explore /></UseCase>)}
      />
      <Redirect from="/usecase1" to="/usecase1/explore" />

      <Route
        path="/filetabs/fileNewModel"
        render={() => (<FileTabs><FileNewModel /></FileTabs>)}
      />
      <Route
        path="/filetabs/uploadModel"
        render={() => (<FileTabs><UploadModel /></FileTabs>)}
      />
      <Route
        path="/filetabs/filedetection"
        render={() => (<FileTabs><FileDetection /></FileTabs>)}
      />
      <Route
        path="/filetabs/fileupdatemodel"
        render={() => (<FileTabs><FileUpdateModel /></FileTabs>)}
      />
      <Route
        path="/filetabs/filedisplaymodel"
        render={() => (<FileTabs><FileDisplayModel /></FileTabs>)}
      />
      <Route
        path="/filetabs/fileupload"
        render={() => (<FileTabs><FileUpload /></FileTabs>)}
      />
      <Redirect from="/filetabs" to="/filetabs/fileNewModel" />
      <Redirect from="*" to="/cloud/executive-dashboard" />
    </Switch>
  </AppV1>
);

export default RoutingNextV1;
