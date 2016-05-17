import React from 'react';
import {Console, Link} from '../../artui/react';

import Navbar from './navbar';

export LiveMonitoring from './monitoring';

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