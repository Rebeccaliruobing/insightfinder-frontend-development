import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { App as AppV1 } from '../../../root';

import {
  Cloud,
  InsightReport, HistoricalReport,
  BehaviorChangeDetection, OutlierDetection, RolloutCheck,
  SummaryReport,
} from '../../../components/cloud';
import { Log, IncidentLogAnalysis } from '../../../components/log';
import { Settings, ThresholdSettingsOld, ExtSvc, Projects } from '../../../components/settings';

import {
  FileTabs, FileNewModel, FileDetection, FileUpdateModel,
  FileDisplayModel, FileUpload, UploadModel,
} from '../../../components/filetabs';

const RoutingNextV1 = () => (
  <AppV1>
    <Switch>
      <Route
        path="/cloud/insight-report"
        render={() => (<Cloud><InsightReport /></Cloud>)}
      />
      <Route
        path="/cloud/historical-report"
        render={() => (<Cloud><HistoricalReport /></Cloud>)}
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
      <Route
        path="/log/incident-log-analysis1"
        render={() => (<Log><IncidentLogAnalysis /></Log>)}
      />
      <Redirect from="/log" to="/log/incident-log-analysis" />

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
      <Redirect from="*" to="/metric/summary" />
    </Switch>
  </AppV1>
);

export default RoutingNextV1;
