import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import {Console, Link} from '../../artui/react/index';
import ThresholdSettings from './threshold/index';
import ExtSvc from './extsvc';
import Projects from '../monitoring/projects/index';

import Navbar from './navbar';

export class Settings extends React.Component {
  render() {
    return (
      <Console.Wrapper className="settings-page">
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export const settingsRoute = (
  <Route component={Settings} path="settings">
    <IndexRedirect to="project-list"/>
    <Route component={Projects} path="project-list"/>
    <Route component={ThresholdSettings} path="threshold"/>
    <Route component={ExtSvc} path="extsvc"/>
  </Route>
);