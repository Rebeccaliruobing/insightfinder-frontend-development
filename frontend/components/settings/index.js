import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import { Console } from '../../artui/react/index';
import ThresholdSettingsOld from './threshold/index';
import { DataDisqualifiersSettings, AlertSensitivitySettings,
  DataSharingSettings, GroupingSettings,
  ThresholdSettings, LogAnalysisSettings,
} from './project';
import ExtSvc from './extsvc/index';
import Projects from './projectlist/index';

import Navbar from './navbar';

export const Settings = ({ children }) => (
  <Console.Wrapper className="settings-page">
    <Navbar />
    {children}
  </Console.Wrapper>
);

export const settingsRoute = (
  <Route component={Settings} path="settings">
    <IndexRedirect to="project" />
    <Route component={DataDisqualifiersSettings} path="data-disqualifiers" />
    <Route component={AlertSensitivitySettings} path="alert-sensitivity" />
    <Route component={DataSharingSettings} path="data-sharing" />
    <Route component={GroupingSettings} path="grouping" />
    <Route component={ThresholdSettings} path="threshold" />
    <Route component={LogAnalysisSettings} path="log-analysis" />
    <Route component={ThresholdSettingsOld} path="project" />
    <Route component={ExtSvc} path="extsvc" />
    <Route component={Projects} path="project-list"/>
    <Route component={Projects} path="project-list/:tabId"/>
  </Route>
);
