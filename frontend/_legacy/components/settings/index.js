import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import { Console } from '../../artui/react/index';
import ThresholdSettingsOld from './threshold/index';
import ExtSvc from './extsvc/index';
import Projects from './projectlist/index';
import Navbar from './navbar';

export { ThresholdSettingsOld, ExtSvc, Projects };

export const Settings = ({ children }) => (
  <Console.Wrapper className="settings-page has-navbar">
    <Navbar />
    {children}
  </Console.Wrapper>
);

export const settingsRoute = (
  <Route component={Settings} path="settings">
    <IndexRedirect to="project" />
    <Route component={ThresholdSettingsOld} path="project" />
    <Route component={ExtSvc} path="extsvc" />
    <Route component={Projects} path="project-list" />
    <Route component={Projects} path="project-list/:tabId" />
  </Route>
);
