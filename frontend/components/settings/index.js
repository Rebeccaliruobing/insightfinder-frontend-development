import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import {Console, Link} from '../../artui/react';
import ThresholdSettings from './threshold';
import ExternalServices from './extsvc';

import Navbar from './navbar';

export class Settings extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export const settingsRoute = (
  <Route component={Settings} path="settings">
    <IndexRedirect to="threshold" />
    <Route component={ThresholdSettings} path="threshold" />
    <Route component={ExternalServices} path="extsvc" />
  </Route>
);