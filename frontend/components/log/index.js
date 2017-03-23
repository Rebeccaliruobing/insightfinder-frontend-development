import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Console } from '../../artui/react/index';

import IncidentLogAnalysis from './incident-log-analysis';
import Navbar from './navbar';

export { IncidentLogAnalysis };

export const Log = props => (
  <Console.Wrapper className="log-page">
    {props.children}
  </Console.Wrapper>
);

export const logRoute = (
  <Route component={Log} path="log">
    <IndexRedirect to="incident-log-analysis" />
    <Route component={IncidentLogAnalysis} path="incident-log-analysis" />
  </Route>
);
