import React from 'react';
import {Console, Link} from '../../artui/react';
import {Route, IndexRedirect} from 'react-router';

import Navbar from './navbar';

import LiveMonitoring from './monitoring';
import IncidentAnalysis from './incident-analysis';
import OutlierDetection from './outlier-detection';
import SoftwareRolloutCheck from './software-rollout-check';
import SummaryReport from './summary-report';
import DisplayModel from './display-model';

import Projects from '../monitoring/projects/index';

export class Cloud extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export const cloudRoute = (
    <Route component={Cloud} path="cloud">
      <IndexRedirect to="monitoring" />
      <Route component={LiveMonitoring} path="monitoring" />
      <Route component={IncidentAnalysis} path="incident-analysis" />
      <Route component={OutlierDetection} path="outlier-detection" />
      <Route component={SoftwareRolloutCheck} path="software-rollout-check" />
      <Route component={SummaryReport} path="summary-report" />
      <Route component={DisplayModel} path="display-model" />

      <Route component={Projects} path="project-list" />
    </Route>
);