import React from 'react';
import {Console, Link} from '../../artui/react';
import {Route, IndexRedirect} from 'react-router';

import Navbar from './navbar';

import LiveMonitoring from './monitoring';
import OutlierDetection from './outlier-detection';

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

export const routes = (
    <Route component={Cloud} path="cloud">
      <IndexRedirect to="monitoring" />
      <Route component={LiveMonitoring} path="monitoring" />
      <Route component={OutlierDetection} path="outlier" />
    </Route>
)