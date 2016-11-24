import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import { Console } from '../../artui/react/index';
import ThresholdSettings from './threshold/index';
import { DataDisqualifiersSettings } from './project';
import ExtSvc from './extsvc/index';

import Navbar from './navbar';

export const Settings = ({ children }) => (
  <Console.Wrapper className="settings-page">
    <Navbar />
    {children}
  </Console.Wrapper>
);

export const settingsRoute = (
  <Route component={Settings} path="settings">
    <IndexRedirect to="threshold" />
    <Route component={DataDisqualifiersSettings} path="data-disqualifiers" />
    <Route component={ThresholdSettings} path="threshold" />
    <Route component={ExtSvc} path="extsvc" />
  </Route>
);
