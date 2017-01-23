import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import {Console, Link} from '../../artui/react/index';
import Projects from './projects/index';

// import Navbar from './navbar';

export class NewProject extends React.Component {
  render() {
    return (
      <Console.Wrapper className="projects-page">
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export const newProjectRoute = (
  <Route component={NewProject} path="newproject">
    <IndexRedirect to="project-list/custom"/>
    <Route component={Projects} path="project-list"/>
    <Route component={Projects} path="project-list/:tabId"/>
  </Route>
);