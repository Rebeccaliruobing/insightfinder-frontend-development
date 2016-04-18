/*
 * Cloud Monitoring
 */

import React from 'react';
import {Link} from 'react-router';
import {Console} from '../../artui/react';

import Navbar from './navbar';

export Projects from './projects';
export Summary from './summary';
export LiveMonitoring from './live';

export class Monitoring extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}