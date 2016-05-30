import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import {Console, Link} from '../../artui/react';
import ThresholdSettings from './threshold';

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
    <IndexRoute component={ThresholdSettings}/>
  </Route>
);